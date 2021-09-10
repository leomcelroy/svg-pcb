import { view } from "./view.js";
import { render } from "https://cdn.skypack.dev/lit-html";

import { addEvents } from "./events.js";
import { test } from "./test.js";

import { PCB as real_PCB } from "./pcb.js";
import { kicadToObj } from "./ki_cad_parser.js"
import { Turtle } from "./Turtle.js";

import { parse2 } from "./parser.js";
import esprima from 'https://cdn.skypack.dev/esprima';
import acorn from 'https://cdn.skypack.dev/acorn';
import { generate } from 'https://cdn.skypack.dev/astring';
import { walk } from 'https://cdn.skypack.dev/esprima-walk';


const STATE = {
	codemirror: undefined,
	storedPCB: undefined,
	transforming: false,
	selectBox: {},
	shapes: [],
	limits: {
		x: [0, 1],
		y: [0, 1]
	},
	mm_per_unit: 25.4
}

class PCB extends real_PCB {
	constructor() {
		super();
		STATE.storedPCB = this;
	}
}

const included = {
	kicadToObj,
	PCB,
	Turtle
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

	    if (code) {

	    } else if (file) {
          let file_url = file;
          if (!file.startsWith("http")) file_url = `examples/${file}`;

          urlToCode(file_url, state);
	    } else {
		    state.codemirror.view.dispatch({
			  changes: {from: 0, insert: test}
			});
			dispatch("RUN");
	    }
	},
	RUN(args, state) {
		const string = state.codemirror.view.state.doc.toString();
		// const result = JSON.parse(string); // if json

		const f = new Function(...Object.keys(included), string)
		const result = f(...Object.values(included));

		let { shapes, limits, mm_per_unit } = typeof result === "string" ? JSON.parse(result) : result;

		state.shapes = shapes;
		state.limits = limits;
		state.mm_per_unit = mm_per_unit;
		// console.log(state.storedPCB);
		dispatch("RENDER");
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
	TRANSLATE({ x, y, index }, state) {
		// // console.log(x, y, index);
		// const string = state.codemirror.view.state.doc.toString();
		// const asts = parse2(string);
		// const { index: startI, ast } = asts[index];
		// // find translate
		// const translateTerm = ast.filter(line => line[0].value === "translate")[0];
		// const firstBrack = translateTerm[2][0].index + startI + 1;
		// const secondBrack = translateTerm[2][2].index + startI;
		// const from = translateTerm[2][0].index + startI;
		// const comp = state.storedPCB.components[index];
		// const round = num => Math.round(num*10000)/10000;
		// const insert = `${round(x + comp.posX)}, ${round(y + comp.posY)}`;
		// const to = from + insert.length;
		// state.codemirror.view.dispatch({
		// 	changes: { from: firstBrack, to: secondBrack, insert }
		// });

		const string = state.codemirror.view.state.doc.toString();
		const stringToParse = `()=>{${string}}`; // remember to subtract 5 from indices
		const esprimaAST = esprima.parseScript(stringToParse, { range: true });
		const mainBody = esprimaAST.body[0].expression.body.body;
		let adds = [];
		walk(esprimaAST, node => {
			try {
		  		if (node.callee.type === "MemberExpression" && node.callee.property.name === "add") adds.push(node.arguments[1]);
			} catch (err) { }
		})
		// sort by first range
		const sortedAdds = adds.sort((a, b) => a.range[0] - b.range[0])
		const round = num => Math.round(num*1000)/1000;
		const comp = state.storedPCB.components[index];
		try {
			sortedAdds[index].properties.forEach( prop => {
				if (prop.key.name !== "translate") return;
				prop.value.elements = [
					{type: 'Literal', value: round(x + comp.posX), raw: `${round(x + comp.posX)}`},
					{type: 'Literal', value: round(y + comp.posY), raw: `${round(y + comp.posY)}`}
				]

				// const [ xNode, yNode ] = prop.value.elements;
				// walk(xNode, node => {
				// 	if (node.type === "Literal") {
				// 		node.value = round(x + node.value);
				// 		node.raw = `${round(x + node.value)}`;
				// 	}
				// })

				// walk(yNode, node => {
				// 	if (node.type === "Literal") {
				// 		node.value = round(y + node.value);
				// 		node.raw = `${round(y + node.value)}`;
				// 	}
				// })
			})
		} catch (err) {}


		// modify values here
		// find adjustable parameter
		// should be first number in expression
		// replace value with new value

		// generate
		const insert = generate(sortedAdds[index]);

		// reinsert
		state.codemirror.view.dispatch({
			changes: { from: sortedAdds[index].range[0] - 5, to: sortedAdds[index].range[1] - 5, insert }
		});

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
