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
	pt: (x, y, start = -1, end = -1) => { 

		const dupe = global_state.pts.some(pt => pt.start === start);
		if (start === -1 || dupe) return [x, y];

		const string = getProgramString();
		const snippet = string.slice(start, end);
		const pt = { pt: [x, y], start, end, text: snippet };
		global_state.pts.push(pt);
		return [x, y]; 
	},
	path: (...args) => {
		// const start = args.at(-2);
		// const end = args.at(-1);
		return geo.path2(...args);
	},
	// pipe: (x, ...fns) => fns.reduce((v, f) => f(v), x)
	// "import": null,
})

const r = () => {
	render(view(global_state), document.getElementById("root"));
	requestAnimationFrame(r);
}

function modifyAST(string, els) {
	const newProg = [];
	let min = 0;

	els.sort((a, b) => a[0] - b[0]).forEach((r, i) => {
		const [l, u] = r;
		newProg.push(string.substr(min, l-min));
		const ogPt = string.substr(l, u-l);
		const firstParen = ogPt.indexOf("(");
		const newPt = `${ogPt.slice(0, -1)}, ${l+firstParen+1}, ${u-1})`
		newProg.push(newPt);
		min = u;
		if (i === els.length - 1) newProg.push(string.substr(u));
	})

	if (newProg.length > 0) string = newProg.join("");

	return string;
}

let worker = createWorker();
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
		state.pts = [];
		state.error = "";

		const doc = state.codemirror.view.state.doc;
	  let string = doc.toString();

	  const ast = ensureSyntaxTree(state.codemirror.view.state, doc.length, 10000);

		try {
			const { pts, paths, footprints } = astAnalysis(string, ast);
			state.footprints = footprints;
			string = modifyAST(string, pts);

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
