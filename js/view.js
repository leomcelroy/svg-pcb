import { dispatch } from "./dispatch.js";
import { html } from "lit-html";
import "./codemirror/codemirror.js";
import { files } from "./components-names.js";
import { downloadSVG, downloadText, downloadPNG } from "./events/download.js"
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
import { drawDownloadGerberModal } from "./views/drawDownloadGerberModal.js";
import { drawDownloadKiCadModal } from "./views/drawDownloadKiCadModal.js";

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
				${state.selectedPathIndex >= 0
					? html`
						<div class="path-selected">
							<div
								class="clear-selected-path"
								@click=${clearSelectedPath}>
								unselect path
							</div>
							<select
								.value=${state.cubicHandleManipulation}
								@input=${e => {
									state.cubicHandleManipulation = e.target.value;
									dispatch("RENDER");
								}}>
							  <option value="symmetric">symmetric</option>
							  <option value="colinear">colinear</option>
							  <option value="broken">broken</option>
							</select>
							<div>hold z to toggle junction type</div>
							<div>hold x to delete point</div>
						</div>
						`
					: ""}
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
						${Object.values(state.footprints).map(renderFootprint)}
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
		<div class="drop-modal hidden">
			<div class="drop-info">Upload JS file, KiCAD Component Module, SVG Component, or JSON Component</div>
		</div>
		${drawDownloadGerberModal(state)}
		${drawDownloadKiCadModal(state)}
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
							state.downloadGerberModal = true;
							dispatch("RENDER");
						}}>
						gerber
					</div class="menu-item">
					<div class="menu-item"
						@click=${(e) => {
							state.downloadKiCadModal = true;
							dispatch("RENDER");
						}}>
						kicad
					</div>
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
						<span>snapToPad</span>
						<input
							type="checkbox"
							.checked=${state.snapToPad}
							@change=${(e) => {
								state.snapToPad = e.target.checked;
								dispatch("RENDER");
							}}
							>
						</input>
					</div>
					<div class="check-item">
						<span>snapToPad Radius</span>
						<input
							type="number"
							step="0.005"
							min="0"
							.value=${state.snapToPadRadius}
							@change=${e => {
								state.snapToPadRadius = Number(e.target.value);
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
