import { view } from "./view.js";
import { render } from "lit-html";
import { kicadToObj } from "./ki_cad_parser.js"
import { astAnalysis } from "./astAnalysis.js";
import { modifyAST } from "./modifyAST.js";
import { getFileSection } from "./getFileSection.js"
import { makeIncluded } from "./makeIncluded.js";
import { global_state } from "./global_state.js";
import { defaultText, basicSetup } from "./defaultText.js";
import { ensureSyntaxTree } from "@codemirror/language";
import { logError } from "./logError.js";
import * as esprima from 'esprima';

const getProgramString = () => global_state.codemirror.view.state.doc.toString();

const r = () => {
	render(view(global_state), document.getElementById("root"));
	requestAnimationFrame(r);
}

const ACTIONS = {
	RUN({ dragging = false, flatten = false } = {}, state) {
		state.paths = [];
		state.selectablePaths = [];
		state.inputs = [];
		state.pts = [];
		state.error = "";

		const doc = state.codemirror.view.state.doc;
	  let string = doc.toString();

	  const ast = ensureSyntaxTree(state.codemirror.view.state, doc.length, 10000);

		try {

			const { inserts, inputs, layers } = astAnalysis(string, ast);

			state.layers = layers;

			const currentFootprints = [];
			const changes = [];

			inserts.forEach(x => {
				changes.push({ from: x.from+1, insert: `[` });
				changes.push({ from: x.to-1, insert: `]` });

				const changeFuncs = {
					"pt": () => {
						let snippet = "";
						const src = x.snippet.slice(1, -1);
						for ( let i = 0; i< src.length; i++) {
							const ch = src[i];

							if (["\"", "'", "`"].includes(ch)) snippet += `\\${ch}`;
							else snippet += ch;
						}

						changes.push({ from: x.to-1, insert: `,{from:${x.from}, to:${x.to}, snippet:\`${snippet}\`}` });
					},
					"input": () => {
						const tree = esprima.parse(x.snippet, { range: true, comment: true }).body[0];
						const entries = tree.expression.properties;
						const value = entries.find(entry => {
							return entry.key.name === "value"
						});

						const valueRangeFrom = value.value.range[0] + x.from;
						const valueRangeTo = value.value.range[1] + x.from;

						changes.push({ from: x.to-1, insert: `,{from:${valueRangeFrom}, to:${valueRangeTo}}` });
					},
					footprint: () => {
						currentFootprints.push(x.variableName);
						changes.push({ from: x.to-1, insert: `,{from:${x.from}, to:${x.to}, variableName:\`${x.variableName}\`, snippet:\`${x.snippet}\`}` });
					},
					component: () => {
						let insertString = `,{from:${x.from}, to:${x.to}, variableName:\`${x.variableName}\`}`;

						changes.push({ from: x.to-1, insert: insertString});
					},
					path: () => {
						changes.push({ from: x.to-1, insert: `,{from:${x.from}, to:${x.to}}` });

					}
				}

				if (x.functionName in changeFuncs) changeFuncs[x.functionName]();
				else console.log("Unknown insertion requested.");
			});

			string = modifyAST(string, changes);

			for (const key in global_state.footprints) {
				if (!currentFootprints.includes(key)) delete global_state.footprints[key];
			}
			
		  const included = makeIncluded(flatten);
		  
			const f = new Function(...Object.keys(included), string)
			f(...Object.values(included));

		} catch (err) {
			// console.error("prog erred", err);
			logError(err);
		}

		dispatch("RENDER");
	},
	NEW_FILE(args, state) {
	  dispatch("UPLOAD_JS", { text: basicSetup });
	},
	UPLOAD_COMP({ text, name }, state) {
		text = text.replaceAll("$", "");
		text = JSON.stringify(kicadToObj(text));
		text = `const ${"temp_name"} = footprint(${text});\n`

		const string = state.codemirror.view.state.doc.toString();
		const startIndex = getFileSection("DECLARE_COMPONENTS", string) ?? 0;
		state.codemirror.view.dispatch({
		  changes: {from: startIndex, insert: text}
		});

		state.codemirror.foldRange(0, text.length);
		dispatch("RENDER");
	},
	UPLOAD_COMP_OBJ({ obj }, state) {
		let text = JSON.stringify(obj);
		text = `const temp_name = footprint(${text});\n`

		const string = state.codemirror.view.state.doc.toString();
		const startIndex = getFileSection("DECLARE_COMPONENTS", string) ?? 0;
		state.codemirror.view.dispatch({
		  changes: {from: startIndex, insert: text}
		});

		state.codemirror.foldRange(0, text.length);
		dispatch("RENDER");
	},
	UPLOAD_JS({ text }, state) {
		const end = state.codemirror.view.state.doc.toString().length;
		state.codemirror.view.dispatch({
		  changes: {from: 0, to: end, insert: text}
		});

		state.selectedPathIndex = -1;
    state.selectedPath = null; // { from, to, args }

		dispatch("RUN");
		document.querySelector(".center-button").click()

		const programString = global_state
	    .codemirror
	    .view
	    .state
	    .doc
	    .toString();

	  const version = programString.match(/@version\s*:\s*(v[\S]+)/);
	  if (version) {
	    const uploadedVersion = version[1];
	    const currentProgramVersion = global_state.version;
	    // if mismatch then do something
	    if (uploadedVersion !== currentProgramVersion) logError(`Version mismatch:\nFile expects version ${uploadedVersion}.\nEditor is version ${currentProgramVersion}`);
	  }

	},
	ADD_IMPORT({ text, name }, state) {
		const alreadyImported = Object.keys(state.footprints);
		if (alreadyImported.includes(name)) return;

		const string = state.codemirror.view.state.doc.toString();
		const startIndex = getFileSection("DECLARE_COMPONENTS", string) ?? 0;

		text = `const ${name} = footprint(${text});\n`
		state.codemirror.view.dispatch({
		  changes: {from: startIndex, insert: text}
		});

		dispatch("RUN");
	},
	TRANSLATE({ x, y, index }, state) {
		state.transformUpdate(x, y);
		dispatch("RUN", { dragging: true });
	},
	RENDER() {
		render(view(global_state), document.getElementById("root"));
	}
}

export function dispatch(action, args = {}) {
	const trigger = ACTIONS[action];
	if (trigger) {
		const result = trigger(args, global_state);
		return result;
	}
	else console.log("Action not recongnized:", action);
}
