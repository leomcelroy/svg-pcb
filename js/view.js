import { dispatch } from "./dispatch.js";
import { html, svg } from "lit-html";
// import "code-mirror";
import "./codemirror/codemirror.js";
import { files } from "./components-names.js";
import { downloadSVG, downloadText, downloadGerber } from "./events/download.js"
import { drawImportItems } from "./views/drawImportItems.js";
import { renderPreviewFootprint } from "./views/renderPreviewFootprint.js";
import { svgViewer } from "./views/svgViewer.js";
import { renderFootprint } from "./views/renderFootprint.js";
import { clearSelectedPath } from "./clearSelectedPath.js";

export function view(state) {
	return html`
		${menu(state)}

		<div class="content">
			<div class="left-side">
				<codemirror-2 class="code-editor"></codemirror-2>
				${state.error !== "" ? html`<div class="error-log">${state.error}</div>` : "" }
			</div>
			<div class="right-side">
				${svgViewer(state)}
				${state.selectedPath !== null ? html`<div class="path-selected" @click=${clearSelectedPath}>Clear Selected Path</div>` : ""}
				<div class="footprint-toolbox">${state.footprints.map(renderFootprint)}</div>
				${state.previewFootprint ? renderPreviewFootprint(...state.previewFootprint) : ""}
			</div>

		</div>
		<div id="vertical-bar"></div>
	`
}

const menu = state => html`
	<div class="top-menu">
		<div class="left">
			<div
				class="menu-item"
				@click=${() => dispatch("RUN")}>
				run (shift + enter)
			</div>
			<div class="menu-item" @click=${() => dispatch("NEW_FILE")}>new</div>
			<div class="menu-item dropdown-container">
			 	import
			 	<div class="dropdown-content">
			 		${drawImportItems(files)}
			 	</div>
			 </div>
			 <div class="menu-item dropdown-container">
				download
				<div class="dropdown-content">
					<button
						@click=${() => downloadSVG(state)}>
						svg
					</button>
					<button
						@click=${() => downloadText(`${state.name === "" ? "anon" : state.name}.js`, state.codemirror.view.state.doc.toString())}>
						js
					</button>
					<button
						@click=${() => downloadGerber(state)}>
						gerber
					</button>
					<input 
						.value=${state.name} 
						placeholder="name-here"
						@input=${(e) => {state.name = e.target.value}}/>
				</div>
			</div>
			<div class="menu-item dropdown-container">
				drawing
				<div class="dropdown-content">
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
							.checked=${state.grid}
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
					<div>
						<span>wire drawing</span>
						<input
							type="checkbox"
							.checked=${state.wireDrawing}
							@change=${(e) => {
								state.wireDrawing = e.target.checked;
								dispatch("RENDER");
							}}
							>
						</input>
					</div>
				</div>
			</div>
		</div>
	</div>
`

