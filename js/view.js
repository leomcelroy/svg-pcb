import { html, svg } from "https://cdn.skypack.dev/lit-html";
import "https://leomcelroy.com/widgets/code-mirror.js";
import { files } from "./neil-components-names.js";

export function view(state) {
	return html`
		<div class="top-menu">
			<div class="left">
				 <div class="dropdown-container">
				 	import
				 	<div class="dropdown-content">
				 		${ files.map(x => x.slice(10)).map( x => html`
								<div class="import-item" @mousedown=${async (e) => {
						 			const res = await fetch(`/neil-components/${x}`);
						 			const text = await res.text();
						 			dispatch("ADD_IMPORT", { text, name: e.target.innerText.split("/")[1].split(".")[0] });
						 		}}>${x}</div>
				 			`)
				 		}
				 		
				 	</div>
				 </div>
			</div>
			<div class="right">
				<button class="download-button">download</button>
				<button class="center-button">center</button>
			</div>
		</div>
		<code-mirror id="code-editor"></code-mirror>
		${svgViewer(state)}
		<div id="vertical-bar"></div>
	`
}

// neil-components/connectors/ESC.json

const mapColors = arr => arr.length === 4
	? `rgba(${arr.map((n,i) => i < 3 ? Math.round(n*255) : n).join(",")})`
	: arr.length === 3 ? `hsl(${arr[0]}, ${arr[1]}%, ${arr[2]}%)`
	: "rgba(255, 255, 255, 1)"

const drawPath = (d, color) => svg`
	<path 
		d="${d}" 
		fill-rule="nonzero"
		fill="${mapColors(color)}"/>
`

const svgViewer = (state) => {
	const shapes = state.shapes.map(p => Array.isArray(p.d) 
		? p.d.map(d => drawPath(d, p.color)) 
		: drawPath(p.d, p.color)
	).flat();

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
				${shapes}
				<rect 
					class="limits no-download" 
					width="${state.limits.x[1] - state.limits.x[0]}"
					height="${state.limits.y[1] - state.limits.y[0]}"
					stroke="black" fill="transparent" stroke-width="1"
					vector-effect="non-scaling-stroke"
					transform="translate(${state.limits.x[0]}, ${state.limits.y[0]})"/>
				<circle class="no-download" cx="0" cy="0" r="0.1" vector-effect="non-scaling-stroke"/>
				${state.storedPCB ? drawHandles(state.storedPCB) : ""}
			</g>
		
		</svg>
	`
}


const drawHandles = (pcb) => pcb.components.map((comp, i) => svg`
	<circle 
		class="no-download translate-handle" 
		cx="${comp.posX}" 
		cy="${comp.posY}" 
		data-index=${i}
		r="0.02" 
		vector-effect="non-scaling-stroke"
		/>
`)
























