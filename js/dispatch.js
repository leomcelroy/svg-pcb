import { view } from "./view.js";
import { render } from "lit-html";
import { PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import { kicadToObj } from "./ki_cad_parser.js"
import { astAnalysis } from "./astAnalysis.js";
import { getFileSection } from "./getFileSection.js"
import * as geo from "/geogram/index.js";
import { global_state } from "./global_state.js";
import { renderShapes } from "./renderShapes.js";
import { renderPath } from "./renderPath.js";
import { renderPCB } from "./renderPCB.js";
import { defaultText } from "./defaultText.js";
import { ensureSyntaxTree } from "@codemirror/language";
import { logError } from "./logError.js";
import { getPoints } from "./getPoints.js";
import { createWorker } from "./createWorker.js";

const getProgramString = () => global_state.codemirror.view.state.doc.toString();

const makeIncluded = (flatten) => ({
	// kicadToObj, // FIXME: remove references to
	geo,
	PCB,
	via,
	renderPCB: obj => {
		// console.log(obj.layerColors);
		return renderPCB(flatten)(obj);
	},
	renderShapes,
	renderPath,
	document: null,
	window: null,
	localStorage: null,
	Function: null,
	eval: null,
	pt: ([x, y], staticInfo) => { 
		const start = staticInfo.from || -1;
		const end = staticInfo.to || -1;

		const dupe = global_state.pts.some(pt => pt.start === start);
		if (start === -1 || dupe) return [x, y];

		const snippet = staticInfo.snippet;
		const pt = { 
			pt: [x, y], 
			start: start+1, 
			end: end+1, 
			text: snippet 
		};

		global_state.pts.push(pt);
		return [x, y]; 
	},
	path: (args, staticInfo) => {
		// const start = args.at(-2);
		// const end = args.at(-1);
		const pts = geo.path2(...args);

		// if (global_state.selectedPath && staticInfo.from === global_state.selectedPath.pathStart) {
		// 	staticInfo.pts = pts;
		// }

		return pts;
	},
	input: ([ops], staticInfo) => {
		// { type: slider, min: num, max: num, step: num, value }

		if ( ops.type === "slider") {
			global_state.inputs.push([ops, staticInfo]);
		} else {
			console.log("Unrecognized input type:", ops);
		}

		return ops.value;
	}
	// pipe: (x, ...fns) => fns.reduce((v, f) => f(v), x)
	// "import": null,
})

const r = () => {
	render(view(global_state), document.getElementById("root"));
	requestAnimationFrame(r);
}

function modifyAST(string, changes) {
	let result = [];
	let min = 0;
	changes.sort((a, b) => a.from - b.from);
	
	changes.forEach(change => {
		const { from, to, insert } = change;

		result.push(string.substr(min, from-min));
		result.push(insert);
		min = (to !== undefined ? to : from);
	});

	result.push(string.substr(min));

	if (result.length > 0) string = result.join("");

	return string;
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
			const { pts, paths, footprints, layers, inputs } = astAnalysis(string, ast);
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


			string = modifyAST(string, changes);

		  const included = makeIncluded(flatten);
			const f = new Function(...Object.keys(included), string)
			f(...Object.values(included));

		} catch (err) {
			console.error("prog erred", err);
			logError(err);
		}

		dispatch("RENDER");

		// checkWorker();
		// worker.run({ flatten, string });
		// if (lastCheck) clearTimeout(lastCheck);
		// lastCheck = setTimeout(checkWorker, 5000)

	},
	NEW_FILE(args, state) {
	  dispatch("UPLOAD_JS", { text: defaultText });
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
