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
import { createWorker } from "./createWorker.js";

const getProgramString = () => global_state.codemirror.view.state.doc.toString();

const r = () => {
	render(view(global_state), document.getElementById("root"));
	requestAnimationFrame(r);
}

// let worker = createWorker();
const checkWorker = () => {
	if (!worker.running) return null;
	console.log("Terminating worker.");
	worker.terminate();
	worker = createWorker();
}

let lastCheck = null;

const ACTIONS = {
	RUN({ dragging = false, flatten = false } = {}, state) {
		state.paths = [];
		state.inputs = [];
		state.pts = [];
		state.error = "";

		const doc = state.codemirror.view.state.doc;
	  let string = doc.toString();

	  const ast = ensureSyntaxTree(state.codemirror.view.state, doc.length, 10000);

		try {

			const { pts, paths, footprints, layers, inputs, componentDeclarations } = astAnalysis(string, ast);

			state.footprints = footprints;
			state.layers = layers;

			const changes = [];

			pts.forEach(x => {
				changes.push({ from: x.from+1, insert: `[` });
				changes.push({ from: x.to-1, insert: `]` });

				let snippet = "";
				const src = x.snippet.slice(1, -1);
				for ( let i = 0; i< src.length; i++) {
					const ch = src[i];

					if (["\"", "'", "`"].includes(ch)) snippet += `\\${ch}`;
					else snippet += ch;
				}

				changes.push({ from: x.to-1, insert: `,{from:${x.from}, to:${x.to}, snippet:"${snippet}"}` });
			});

			inputs.forEach(x => {
				changes.push({ from: x.start+1, insert: "[" });
				changes.push({ from: x.end-1, insert: "]" });
				changes.push({ from: x.end-1, insert: `,{from:${x.from}, to:${x.to}}` });
			});

			paths.forEach(x => {
				changes.push({ from: x.from+1, insert: "[" });
				changes.push({ from: x.to-1, insert: "]" });
				changes.push({ from: x.to-1, insert: `,{from:${x.from}, to:${x.to}}` });
			});


			componentDeclarations.forEach(x => {
				changes.push({ from: x.indexCurly+1, insert: `refDes:"${x.variableName}",` });
			})

			string = modifyAST(string, changes);
			// console.timeEnd("modify")

		  const included = makeIncluded(flatten);
		  // console.time("RUN")
		  
			const f = new Function(...Object.keys(included), string)
			f(...Object.values(included));
			// console.timeEnd("RUN")
		} catch (err) {
			// console.error("prog erred", err);
			logError(err);
		}

		dispatch("RENDER");

		// checkWorker();
		// worker.run({ flatten, string });
		// if (lastCheck) clearTimeout(lastCheck);
		// lastCheck = setTimeout(checkWorker, 5000)

	},
	NEW_FILE(args, state) {
	  dispatch("UPLOAD_JS", { text: basicSetup });
	},
	UPLOAD_COMP({ text, name }, state) {
		text = text.replaceAll("$", "");
		text = JSON.stringify(kicadToObj(text));
		text = `const ${"temp_name"} = ${text}\n`

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
		text = `const temp_name = ${text}\n`

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

		dispatch("RUN");
		document.querySelector(".center-button").click()
	},
	ADD_IMPORT({ text, name }, state) {
		const alreadyImported = state.footprints.map(x => x[0]);
		if (alreadyImported.includes(name)) return;

		const string = state.codemirror.view.state.doc.toString();
		const startIndex = getFileSection("DECLARE_COMPONENTS", string) ?? 0;

		text = `const ${name} = ${text}\n`
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
		// console.time(action);
		const result = trigger(args, global_state);
		// console.timeEnd(action);
		return result;
	}
	else console.log("Action not recongnized:", action);
}
