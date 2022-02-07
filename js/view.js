import { html, svg } from "lit-html";
  import {unsafeHTML} from 'https://unpkg.com/lit-html@latest/directives/unsafe-html.js?module';
import { Turtle } from "../libs/gram-js.js";
import "code-mirror";
import { files } from "./neil-components-names.js";
import { downloadSVG, downloadText, downloadGerber, downloadUrumbu } from "./events/download.js"
import { drawGrid } from "./drawGrid.js";

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
						<button
							@click=${() => downloadUrumbu(state)}>
							urumbu
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
		<div style="display: flex; height: 100%; min-height: 100%; max-height: 100%;">
			<code-mirror id="code-editor" style="overflow: scroll;"></code-mirror>
			<div class="right-side">
				${svgViewer(state)}
				<div class="footprint-toolbox">${state.footprints.map(renderFootprint)}</div>
				${state.previewFootprint ? renderPreviewFootprint(...state.previewFootprint) : ""}
			</div>
		</div>
		<div id="vertical-bar"></div>
	`
}

const renderFootprint = ([name, footprint, svgView], i) => {
			// <svg width="30" height="30">
			// 	<circle cx="15" cy="15" r="10" stroke="grey" stroke-width="4" fill="yellow" />
			// </svg>

			// <div class="footprint-item-icon" data-index=${i} ></div>

	return html`
		<style>
			.path-footprint {
				fill: black;
			}

			.footprint-svg:hover .path-footprint {
				fill: orange;
			}
		</style>
		<div class="footprint-item">
			<svg 
				data-index=${i}
				class="footprint-svg footprint-${i}" 
				width="50px"
				height="50px">
				<path
						class="path-footprint"
						data-index=${i} 
						d="${svgView.getPathData()}"
						fill-rule="nonzero"
						/>
			</svg>
			<span style="padding-left: 5px;">${name}</span>
		</div>
	`
}

const renderPreviewFootprint = ([name, footprint, svgView], pos) => {
	// <svg width="30" height="30">
	// 	<circle cx="15" cy="15" r="10" stroke="grey" stroke-width="4" fill="yellow" />
	// </svg>

	// <div class="footprint-item-icon" data-index=${i} ></div>

	const [ x, y ] = pos;
	return html`
		<style>
			.path-footprint-dragged {
				fill: black;
			}
		</style>

		<svg 
			style="position: absolute; left: ${x}; top: ${y}; transform: translate(-50%, -50%);"
			width="50px"
			height="50px">
			<path
					class="path-footprint-dragged" 
					d="${svgView.getPathData()}"
					fill-rule="nonzero"
					/>
		</svg>

	`
}

const drawPath = ({ d, color, groupId = ""}) => {

	const renderDataString = s => svg`
		<path
				d="${s}"
				fill-rule="nonzero"
				fill=${color}/>
	`


	if (["padLabels", "componentLabels"].includes(groupId)) {
		return svg`<g id=${groupId}>${renderDataString(d)}</g>`
	}
	
	const pathDataStrings = d.split(/(?=M)/g);

	return svg`
		<g id=${groupId}>
			${pathDataStrings.map(renderDataString)}
		</g>
	`
}

const svgViewer = (state) => {
	const shapes = state.shapes.map(p => drawPath(p))
	
	const corners = state.panZoomParams?.corners();

	return svg`
		<svg id="viewer" style="width: 100%; height: 100%; transform: scale(1, -1);">
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
