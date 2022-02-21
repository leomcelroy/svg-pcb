import { dispatch } from "./dispatch.js";
import { html, svg } from "lit-html";
import { Turtle } from "../libs/gram-js.js";
import "code-mirror";
import { files } from "./components-names.js";
import { downloadSVG, downloadText, downloadGerber } from "./events/download.js"
import { drawImportItems } from "./views/drawImportItems.js";
import { renderPreviewFootprint } from "./views/renderPreviewFootprint.js";
import { svgViewer } from "./views/svgViewer.js";
import { renderFootprint } from "./views/renderFootprint.js";

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

