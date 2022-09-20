import { view } from "./view.js";
import { render } from "lit-html";

import { addEvents } from "./events.js";

import { PCB as real_PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import { kicadToObj } from "./ki_cad_parser.js"
import { getSemanticInfo } from "./getSemanticInfo.js";
import { getFileSection } from "./getFileSection.js"
import * as geo from "/geogram/index.js";

import { global_state } from "./global_state.js";

import { renderShapes } from "./renderShapes.js";
import { renderPath } from "./renderPath.js";
import { renderPCB } from "./renderPCB.js";

import { urlToCode } from "./urlToCode.js";
import { defaultText } from "./defaultText.js";

class PCB extends real_PCB {
	constructor() {
		super();
		global_state.storedPCB = this;
	}
}


const included = {
	// kicadToObj, // FIXME: remove references to
	geo,
	PCB,
	via,
	renderPCB,
	renderShapes,
	renderPath,
	document: null,
	window: null,
	localStorage: null,
	Function: null,
	eval: null,
	pt: (x, y) => { 
		global_state.pts.push([x, y]);
		return [x, y]; 
	}
	// "import": null,
}



const r = () => {
	render(view(global_state), document.getElementById("root"));
	requestAnimationFrame(r);
}

const ACTIONS = {
	INIT(args, state) {
		dispatch("RENDER");
		state.codemirror = document.querySelector("#code-editor");
		addEvents(state);

		const url = new URL(window.location.href);

	    const search = window.location.search;
	    const code = new URLSearchParams(search).get("code");
	    const file = new URLSearchParams(search).get("file");
	    const handlesOff = new URLSearchParams(search).get("bezier") === "false";
	    const gridOff = new URLSearchParams(search).get("grid") === "false";

	    if (handlesOff) state.viewHandles = false;
	    if (gridOff) state.grid = false;

	    if (code) {

	    } else if (file) {
          let file_url = file;
          if (!file.startsWith("http")) file_url = `examples/${file}`;

          urlToCode(file_url, state);
	    } else { // should check before running this
	    	const saved = window.localStorage.getItem("svg-pcb")
			    state.codemirror.view.dispatch({
				  changes: {from: 0, insert: saved ?? ""}
				});

				dispatch("RUN");
				document.querySelector(".center-button").click();
	    }

	    dispatch("RENDER");
	},
	RUN({ dragging = false } = {}, state) {
		state.paths = [];
		const string = state.codemirror.view.state.doc.toString();

		if (!dragging) {
			let footprints = [];
			let wires = [];
			let layers = [];
			try {
				const semantics = getSemanticInfo(string);
				footprints = semantics.footprints;
				wires = semantics.wires ?? [];
				layers = semantics.layers ?? [];
			} catch (err) {
				console.error(err);
			}

			state.footprints = footprints;
			state.wires = wires;
			state.layers = layers;
		}

		const f = new Function(...Object.keys(included), string)
		f(...Object.values(included));
		dispatch("RENDER");
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


function checkBlacklist(string) {
	// poor attempt at sanitizing

	const BLACK_LISTED_WORDS = []; // import, document, window, localStorage
	BLACK_LISTED_WORDS.forEach(word => {
		if (string.includes(word))
			throw `"${word}" is not permitted due to security concerns.`;
	});
}

