import { view } from "./view.js";
import { render } from "lit-html";

import { addEvents } from "./events.js";

import { PCB as real_PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import { kicadToObj } from "./ki_cad_parser.js"
import { Turtle } from "./Turtle.js";


const STATE = {
	codemirror: undefined,
	storedPCB: undefined,
	transforming: false,
	transformUpdate: () => {},
	selectBox: {},
	shapes: [],
	limits: {
		x: [0, 1],
		y: [0, 1]
	},
	mm_per_unit: 25.4,
	grid: true,
	gridSize: 0.05,
	viewHandles: true,
	panZoomParams: undefined,
}

class PCB extends real_PCB {
	constructor() {
		super();
		STATE.storedPCB = this;
	}
}

// {
//   board: board,
//   layerColors: { // have default colors for default layers
//     "F.Cu": "red",
//     "Vias": "rbg(32, 32, 32)",
//   },
//   limits: {
//     x: [0, 1],
//     y: [0, 1]
//   },
//   mm_per_unit: 25.4
// }

const default_renderPCB_params = {
	pcb: null,
	layerColors: { "F.Cu": "copper" },
	limits: {
	    x: [0, 1],
	    y: [0, 1]
	},
	mm_per_unit: 25.4,
}

function renderPCB({ pcb, layerColors, limits, mm_per_unit }) {
	if (pcb === undefined) console.log("renderPCB must include pcb param");

	if (layerColors === undefined) layerColors = default_renderPCB_params.layerColors;
	if (limits === undefined) limits = default_renderPCB_params.limits;
	if (mm_per_unit === undefined) mm_per_unit = default_renderPCB_params.mm_per_unit;

	const shapes = [];
	for (const layer in layerColors) {
		shapes.push({ 
			d: pcb.getLayer(layer), 
			color: layerColors[layer],
			groupId: layer
		});
	}

	STATE.shapes = shapes; // TODO ??? what should the shape format be { d: path data string, color: hex or valid svg color, classes: []}
	STATE.limits = limits;
	STATE.mm_per_unit = mm_per_unit;

	dispatch("RENDER");
}

const default_renderShapes_params = {
	shapes: [],
	limits: {
	    x: [0, 1],
	    y: [0, 1]
	},
	mm_per_unit: 25.4,
}

function renderShapes({ shapes, limits, mm_per_unit }) {
	if (shapes === undefined) shapes = default_renderShapes_params.shapes;
	if (limits === undefined) limits = default_renderShapes_params.limits;
	if (mm_per_unit === undefined) mm_per_unit = default_renderShapes_params.mm_per_unit;

	STATE.shapes = shapes;
	STATE.limits = limits;
	STATE.mm_per_unit = mm_per_unit;

	dispatch("RENDER");
}

const included = {
	kicadToObj,
	PCB,
	via,
	Turtle,
	renderPCB,
	renderShapes
}

async function urlToCode(file_url, state) {
	const file = await fetch(file_url,  {mode: 'cors'});
	const txt = await file.text();

    state.codemirror.view.dispatch({
	  changes: {from: 0, insert: txt}
	});

    // fold imports
	const anotherComp = l => l.includes("return kicadToObj(");

	const doc = state.codemirror.view.state.doc;
	const lines = doc.toString().split("\n");
	let i = 0;
	let count = 0;
	while (true) {
		const line = lines[i];
		if (!line) break;
		count += line.length;
		if (i > lines.length) break;
		if (lines[i] === "`)})()" && !anotherComp(lines[i+1])) break;
		i++;
	};

	state.codemirror.foldRange(0, count+i);

    dispatch("RUN");
    document.querySelector(".center-button").click();
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
	    const handlesOff = new URLSearchParams(search).get("handles") === "false";
	    const gridOff = new URLSearchParams(search).get("grid") === "false";

	    if (handlesOff) state.viewHandles = false;
	    if (gridOff) state.grid = false;

	    if (code) {

	    } else if (file) {
          let file_url = file;
          if (!file.startsWith("http")) file_url = `examples/${file}`;

          urlToCode(file_url, state);
	    } else {
	    	const saved = window.localStorage.getItem("svg-pcb")
		    state.codemirror.view.dispatch({
			  changes: {from: 0, insert: saved ?? ""}
			});

			dispatch("RUN");
			document.querySelector(".center-button").click();
	    }

	    dispatch("RENDER");
	},
	RUN({ save = false }, state) {
		const string = state.codemirror.view.state.doc.toString();

		const f = new Function(...Object.keys(included), string)
		f(...Object.values(included));

		if (save) {
			window.localStorage.setItem("svg-pcb", string)
		}
	},
	UPLOAD_COMP({ text, name }, state) {
		text = text.replaceAll("$", "");
		text = `const ${name} = (() => { return kicadToObj(\n\`${text}\`)})()\n`
		state.codemirror.view.dispatch({
		  changes: {from: 0, insert: text}
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
		text = `const ${name} = ${text}\n`
		state.codemirror.view.dispatch({
		  changes: {from: 0, insert: text}
		});

		dispatch("RENDER");
	},
	TRANSLATE({ x, y, index }, state) {
		state.transformUpdate(x, y);
		dispatch("RUN");
	},
	RENDER() {
		render(view(STATE), document.getElementById("root"));
	}
}

export function dispatch(action, args = {}) {
	const trigger = ACTIONS[action];
	if (trigger) trigger(args, STATE);
	else console.log("Action not recongnized:", action);
}
