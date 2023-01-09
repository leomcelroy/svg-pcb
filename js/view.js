import { dispatch } from "./dispatch.js";
import { html, svg } from "lit-html";
// import "code-mirror";
import "./codemirror/codemirror.js";
import { files } from "./components-names.js";
import { downloadSVG, downloadText, downloadGerber, downloadPNG } from "./events/download.js"
import { drawImportItems } from "./views/drawImportItems.js";
import { drawComponentMenu } from "./views/drawComponentMenu.js";
import { layersColorPicker } from "./views/layersColorPicker.js";
import { renderPreviewFootprint } from "./views/renderPreviewFootprint.js";
import { svgViewer } from "./views/svgViewer.js";
import { renderFootprint } from "./views/renderFootprint.js";
import { clearSelectedPath } from "./clearSelectedPath.js";
import logoURL from '../logo.svg'

export function view(state) {
	return html`
		${menu(state)}

		<div class="content">
			<div class="left-side">
				<codemirror-2 class="code-editor"></codemirror-2>
				${state.error !== "" ? html`<div class="error-log">${state.error}</div>` : "" }
			</div>
			<div class="right-side" @mousedown=${() => dispatch("RUN", { flatten: false })}>
				${svgViewer(state)}
				${state.selectedPath !== null ? html`<div class="path-selected" @click=${clearSelectedPath}>unselect path</div>` : ""}
				<div class="footprint-toolbox">
					<div class="input-panel">
						${state.inputs.map(input => inputRenderers[input.type](input))}
					</div>
					<b>Components:</b>
					<div class="import-button-container">
						<div class="import-button" @mousedown=${() => {
		          state.componentMenu = true;
		          dispatch("RENDER");
		        }}>import</div>
		      </div>
					<div class="component-list">
						${state.footprints.map(renderFootprint)}
					</div>
					${layersColorPicker(state)}
					<div class="nub" @click=${() => {
						document.querySelector(".footprint-toolbox").classList.toggle("footprint-toolbox-closed");
					}}></div>
				</div>
				${state.previewFootprint ? renderPreviewFootprint(...state.previewFootprint) : ""}
			</div>
			<div id="vertical-bar"></div>
			${drawComponentMenu(files)}
		</div>
	`
}

const inputRenderers = {
	"slider": ops => html`
		<div class="range-input">
			<span>${ops.name}:</span>
			<input 
				type="range" 
				min=${ops.min}
				max=${ops.max}
				step=${ops.step}
				value=${ops.value}
				@input=${e => {
					// modify code
					console.log(Number(e.target.value))
				}}>
			</input>
			<span>${ops.value}</span>
		</div>`
}


const menu = state => html`
	<div class="top-menu">
		<div class="left">
			<img src=${logoURL} class="logo" alt="fab-circuit-logo" />
			<div
				class="menu-item"
				@click=${() => dispatch("RUN")}>
				run (shift + enter)
			</div>
			<div class="menu-item" @click=${() => dispatch("NEW_FILE")}>new</div>
			 <div class="menu-item dropdown-container">
				download
				<div class="dropdown-content">
					<div class="menu-item"
						@click=${() => { dispatch("RUN", { flatten: true }); downloadSVG(state); }}>
						svg
					</div class="menu-item">
					<div class="menu-item"
						@click=${() => { dispatch("RUN", { flatten: true }); downloadPNG(state); }}>
						png
					</div class="menu-item">
					<div class="menu-item"
						@click=${() => downloadText(`${state.name === "" ? "anon" : state.name}.js`, state.codemirror.view.state.doc.toString())}>
						js
					</div class="menu-item">
					<div class="menu-item"
						@click=${() => downloadGerber(state)}>
						gerber (WIP)
					</div class="menu-item">
					<input 
						class="input-item"
						style="margin: 3px;"
						.value=${state.name} 
						placeholder="name-here"
						@input=${(e) => {state.name = e.target.value}}/>
				</div>
			</div>
			<div class="menu-item dropdown-container">
				drawing
				<div class="dropdown-content">
					<div
						class="menu-item center-button"
						@click=${() => {
								state.panZoomParams.setScaleXY(state.limits);
						}}>
						center
					</div>
					<div class="check-item"> 
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
					<div class="check-item"> 
						<span>grid</span>
						<input
							type="checkbox"
							.checked=${state.grid}
							@change=${(e) => {
								state.grid = e.target.checked;
								dispatch("RENDER");
							}}
							>
						</input>
					</div>
					<div class="check-item"> 
						<span>adaptiveGrid</span>
						<input
							type="checkbox"
							.checked=${state.adaptiveGrid}
							@change=${(e) => {
								state.adaptiveGrid = e.target.checked;
								dispatch("RENDER");
							}}
							>
						</input>
					</div>
					<div class="input-item">
						<span>grid size:</span>
						<input
							type="number"
							step="0.005"
							min="0"
							.value=${state.gridSize}
							@change=${e => {
								state.gridSize = Number(e.target.value);
								dispatch("RENDER");
							}}>
						</input>
					</div>
				</div>
			</div>
		</div>
		<a class="github-logo" href="https://github.com/leomcelroy/svg-pcb">
			<i class="fa fa-github" style="font-size:24px"></i>
		</a>
	</div>
`

