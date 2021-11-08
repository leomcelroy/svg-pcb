import { html, svg } from "lit-html";
import { Turtle } from "gram-js";
import "code-mirror";
import { files } from "./neil-components-names.js";
import { downloadSVG, downloadText, downloadGerber } from "./events/download.js"

const drawImportItems = (files) => files.map(x => x.slice(10)).map( x => html`
	<div class="import-item" @mousedown=${async (e) => {
		const res = await fetch(`neil-components/${x}`);
		const text = await res.text();
		dispatch("ADD_IMPORT", { text, name: e.target.innerText.split("/")[1].split(".")[0] });
	}}>${x}</div>
`)

export function view(state) {
	return html`
		<div class="top-menu">
			<div class="left">
				<button
					@click=${() => dispatch("RUN", { save: true })}>
					run (shift + enter)
				</button>
				<div class="seperator"></div>
				<div class="dropdown-container">
				 	import
				 	<div class="dropdown-content">
				 		${drawImportItems(files)}
				 	</div>
				 </div>
				 <div class="seperator"></div>
				 <div class="dropdown-container">
					download
					<div class="dropdown-content dropdown-content">
						<button
							@click=${() => downloadSVG(state)}>
							svg
						</button>
						<button
							@click=${() => downloadText("anon.js", state.codemirror.view.state.doc.toString())}>
							js
						</button>
						<button
							@click=${() => downloadGerber(state)}>
							gerber
						</button>
					</div>
				</div>
				<div class="seperator"></div>
				<div class="dropdown-container">
					drawing
					<div class="dropdown-content dropdown-content">
						<button
							class="center-button"
							@click=${() => {
    							state.panZoomParams.setScaleXY(state.limits);
							}}>
							center
						</button>
						<div>
							<span>handles</span>
							<input
								type="checkbox"
								checked=${state.viewHandles}
								@change=${(e) => {
									state.viewHandles = e.target.checked;
									dispatch("RENDER");
								}}
								class="handles-checkbox">
							</input>
						</div>
						<div>
							<span>grid</span>
							<input
								type="checkbox"
								checked=${state.grid}
								@change=${(e) => {
									state.grid = e.target.checked;
									dispatch("RENDER");
								}}
								>
							</input>
						</div>
						<div>
							<span>grid size:</span>
							<input
								type="number"
								step="0.005"
								min="0"
								value=${state.gridSize}
								@change=${e => {
									state.gridSize = Number(e.target.value);
									dispatch("RENDER");
								}}>
							</input>
						</div>
					</div>
				</div>
			</div>
		</div>
		<code-mirror id="code-editor"></code-mirror>
		${svgViewer(state)}
		<div id="vertical-bar"></div>
	`
}

function RGBAToHexA(r,g,b,a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = a.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b + a;
}

function RGBAToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

const RGBTo255 = arr => arr.map((n,i) => i < 3 ? Math.round(n*255) : n);
// `rgba(${RGBTo255(arr).join(",")})`
// "rgba(255, 255, 255, 1)"

const RGBATo255 = arr => arr.map((n,i) => Math.round(n*255));

const mapColors = arr => arr.length === 4
	? RGBAToHexA(...RGBATo255(arr))
	: "rgba(255, 255, 255, 1)"

const mapColorsHex = color => {
	const arr = RGBTo255(color);
	return RGBAToHex(...arr);
}

const drawPath = (d, color) => typeof color === "string" 
	? svg`
		<path
			d="${d}"
			fill-rule="nonzero"
			fill=${color}/>
		`
	: color.length === 4 ? svg`
		<path
			d="${d}"
			fill-rule="nonzero"
			style="fill-opacity:${color[3]}"
			fill=${mapColorsHex(color)}/>
		`
	: svg`
		<path
			d="${d}"
			fill-rule="nonzero"
			style="fill-opacity:1"
			fill="#000000"/>
		`

const ptsToD = pts => pts.reduce((acc, cur, i) => `${acc} ${i === 0 ? "M" : "L"} ${cur.join(",")}`, "");


const drawGrid = (corners, gridSize) => {

	const middX = [
		[corners.lt.x, (corners.lt.y + corners.lb.y)/2],
		[corners.rt.x, (corners.rt.y + corners.rb.y)/2],
	]

	const middY = [
		[(corners.lt.x + corners.rt.x)/2, corners.lt.y],
		[(corners.lb.x + corners.rb.x)/2, corners.lb.y],
	]

	const originX = [
		[corners.lt.x, 0],
		[corners.rt.x, 0],
	]

	const originY = [
		[0, corners.lt.y],
		[0, corners.lb.y],
	]

	const xLimits = [corners.lt.x, corners.rt.x];
	const xRange = Math.abs(xLimits[1] - xLimits[0]);
	const yLimits = [corners.lb.y, corners.lt.y];
	const yRange = Math.abs(yLimits[1] - yLimits[0]);

	function getBaseLog(x, y) {
	  return Math.log(y) / Math.log(x);
	}

	const order = Math.round(getBaseLog(5, Math.max(xRange, yRange)));
	// const stepSize = (5**(order-1))/5;
	const stepSize = gridSize;

	const getMarkVals = (limits, stepSize) => {
		let marks = [];
		let current = stepSize*Math.ceil(limits[0]/stepSize) - stepSize;
		while (current < limits[1] + stepSize) {
			current = current + stepSize;
			marks.push(current);
		}

		return marks
	}

	const valToLineH = val => [
		[corners.lt.x, val],
		[corners.rt.x, val]
	];

	const valToLineV = val => [
		[val, corners.lt.y],
		[val, corners.lb.y],
	];

	const lineToMark = width => line => svg`<path stroke="black" vector-effect="non-scaling-stroke" stroke-width="${width}" d="${ptsToD(line)}"/>`

	const hMarks = getMarkVals(yLimits, stepSize).map(valToLineH).map(lineToMark(0.2))
	const vMarks = getMarkVals(xLimits, stepSize).map(valToLineV).map(lineToMark(0.2))

	// console.log(getMarkVals(yLimits, stepSize));

	return svg`
		<g class="grid no-download">
			${lineToMark(.6)(originX)}
			${lineToMark(.6)(originY)}
			${hMarks}
			${vMarks}
		</g>
	`
}

const svgViewer = (state) => {
	const shapes = state.shapes.map(p => Array.isArray(p.d)
		? p.d.map(d => drawPath(d, p.color))
		: drawPath(p.d, p.color)
	).flat();

	const corners = state.panZoomParams?.corners();


	return svg`
		<svg id="viewer" style="transform: scale(1, -1);">
			<g class="transform-group">
			      ${ state.selectBox.start && state.selectBox.end ? svg`
			      	<path
				        class="selectBox"
				        d="
				          M ${state.selectBox.start.x} ${state.selectBox.start.y}
				          L ${state.selectBox.end.x} ${state.selectBox.start.y}
				          L ${state.selectBox.end.x} ${state.selectBox.end.y}
				          L ${state.selectBox.start.x} ${state.selectBox.end.y}
				        "
			      	/>` : ""
			      }
			    <g class="shapes">${shapes}</g>
				${state.panZoomParams && state.gridSize > 0 && state.grid ? drawGrid(state.panZoomParams.corners(), state.gridSize) : ""}
				<rect
					class="limits no-download"
					width="${state.limits.x[1] - state.limits.x[0]}"
					height="${state.limits.y[1] - state.limits.y[0]}"
					stroke="black" fill="transparent" stroke-width="1"
					vector-effect="non-scaling-stroke"
					transform="translate(${state.limits.x[0]}, ${state.limits.y[0]})"/>
				${state.storedPCB && state.viewHandles ? drawHandles(state.storedPCB) : ""}
			</g>

		</svg>
	`
}

// <circle class="no-download" cx="0" cy="0" r="0.1" vector-effect="non-scaling-stroke"/>


const translateHandleSize = 0.02;
const drawHandles = (pcb) => pcb.components.map((comp, i) => svg`
	<g class="no-download translate-handle">
		<path
	        d="${new Turtle()
	        	.arc(361, translateHandleSize)
	        	.translate([comp.posX, comp.posY-translateHandleSize])
	        	.offset(0.003)
	        	.getPathData()}"
	  	/>
	  	<circle
	  		class="translate-handle-trigger" 
			data-index=${i}
	  		stroke="none"
	  		fill="#00000000"
		 	cx="${comp.posX}"
		 	cy="${comp.posY}"
		 	r="${translateHandleSize}"
		 	/>
	</g>
`)
