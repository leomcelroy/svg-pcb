import { dispatch } from "./dispatch.js";
import { html } from "lit-html";
// import "code-mirror";
import "./codemirror/codemirror.js";
import { files } from "./components-names.js";
import { downloadSVG, downloadText, downloadPNG } from "./events/download.js"
import { downloadGerber } from "./events/downloadGerber.js"
import { drawImportItems } from "./views/drawImportItems.js";
import { drawComponentMenu } from "./views/drawComponentMenu.js";
import { layersColorPicker } from "./views/layersColorPicker.js";
import { renderPreviewFootprint } from "./views/renderPreviewFootprint.js";
import { svgViewer } from "./views/svgViewer.js";
import { renderFootprint } from "./views/renderFootprint.js";
import { clearSelectedPath } from "./clearSelectedPath.js";
import logoURL from '../logo.svg'
import { inputRenderers } from "./views/inputRenderers.js";
import { initCodeMirror } from "./codemirror/codemirror.js";

export function view(state) {
	return html`
		${menu(state)}

		<div class="content">
			<div class="left-side">
				<div class="code-editor"></div>
				${state.error !== "" ? html`<div class="error-log">${state.error}</div>` : "" }
			</div>
			<div class="right-side" @mousedown=${() => dispatch("RUN", { flatten: false })}>
				${svgViewer(state)}
				${state.selectedPath !== null ? html`<div class="path-selected" @click=${clearSelectedPath}>unselect path</div>` : ""}
				<div class="footprint-toolbox">
					${state.inputs.length > 0 ? html`<div class="toolbox-title">Inputs:</div>` : ""}
					<div class="input-panel">
						${state.inputs.map(input => inputRenderers[input[0].type](...input, state))}
					</div>
					<div class="toolbox-title">Components:</div>
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

		${modal_download_gerber(state)}
	`
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
						@click=${(e) => {
							const modal = document.getElementById("modal_download_gerber");
							modal.classList.remove("hidden");
						}}>
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
			<div
				class="menu-item center-button"
				@click=${() => {
						state.panZoomParams.setScaleXY(state.limits);
				}}>
				center-view
			</div>
			<div class="menu-item dropdown-container">
				options
				<div class="dropdown-content">
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
					<div class="check-item"> 
						<span>snapPad</span>
						<input
							type="checkbox"
							.checked=${state.snapPad}
							@change=${(e) => {
								state.snapPad = e.target.checked;
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
					<div class="check-item"> 
						<span>vim mode</span>
						<input
							type="checkbox"
							.checked=${state.vimMode}
							@change=${(e) => {
								state.vimMode = e.target.checked;
								const cmEl = document.querySelector(".code-editor");
								const str = state.codemirror.view.state.doc.toString();
								cmEl.innerHTML = "";
  							state.codemirror = initCodeMirror(cmEl, state.vimMode);
  							state.codemirror.view.dispatch({
								  changes: { from: 0, insert: str }
								});
							}}
							>
						</input>
					</div>
				</div>
			</div>
		</div>
		<a class="github-logo" href="https://github.com/leomcelroy/svg-pcb">
			<i class="fa fa-github" style="font-size:24px"></i>
		</a>
	</div>
`;

function getLayerList(layerMap){
	const list = [];
	layerMap.forEach((val, key) => {
		list.push(key);
	});
	return list;
}

const modal_download_gerber = state => html`
<div id="modal_download_gerber" class="modal hidden">
	<div class="modal-content">
		<div class="modal-header">
			<h3 class="modal-title">Download Gerber Options</h3>
			<span 
				class="close"
				@click=${(e) => {
					const modal = document.getElementById("modal_download_gerber");
					modal.classList.add("hidden");
				}}>&times;</span>
		</div>
		<div class="modal-body">
			<table>
				<thead>
					<tr>
						<th colspan="2">Include Layers</td>
					</tr>
				</thead>
				<tbody>
					${
						getLayerList(state.downloadGerberOptions.layers).map((l) => {
						return html`
						<tr>
							<td><input 
								type="checkbox"
								.checked=${state.downloadGerberOptions.layers.get(l)}
								@change=${(e) => {
									state.downloadGerberOptions.layers.set(l, e.target.checked);
								}}></td>
							<td>${l}</td>
						</tr>
						`
					})}

					<tr>
						<td><input 
							type="checkbox"
							.checked=${state.downloadGerberOptions.includeOutline}
							@change=${(e) => {
								state.downloadGerberOptions.includeOutline = e.target.checked;
							}}></td>
						<td>Inclue outline in all layers</td>
					</tr>
					<tr>
						<td colspan=2>Excellon Drill Units</td>
					</tr>
					<tr>
						<td><input 
							type="radio"
							name="excellonUnits"
							.checked=${state.downloadGerberOptions.excellonMetric}
							@change=${(e) => {
								state.downloadGerberOptions.excellonMetric = e.target.checked;
							}}> mm 
							
						</td>
						<td><input 
							type="radio"
							name="excellonUnits"
							.checked=${!state.downloadGerberOptions.excellonMetric}
							@change=${(e) => {
								state.downloadGerberOptions.excellonMetric = !e.target.checked;
							}}> in
						</td>
					</tr>
					<tr>
						<td><input 
							type="checkbox"
							.checked=${state.downloadGerberOptions.protelFilenames}
							@change=${(e) => {
								state.downloadGerberOptions.protelFilenames = e.target.checked;
							}}>
						</td>
						<td>Use Protel Filenames</td>
					</tr>

				</tbody>
			</table>
		</div>
		<div class="modal-footer">
			<button 
				type="button" 
				class="modal-choice"
				@click=${(e) => {
					const modal = document.getElementById("modal_download_gerber");
					modal.classList.add("hidden");
				}}>Cancel</button>
			<button 
				type="button" 
				class="modal-choice primary"
				@click=${(e) => {
					const modal = document.getElementById("modal_download_gerber");
					modal.classList.add("hidden");
					downloadGerber(state);
				}}>Download</button>
		</div>
	</div>
</div>
`;

