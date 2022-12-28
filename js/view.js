import { dispatch } from "./dispatch.js";
import { html, svg } from "lit-html";
// import "code-mirror";
import "./codemirror/codemirror.js";
import { files } from "./components-names.js";
import { downloadSVG, downloadText, downloadGerber, downloadPNG } from "./events/download.js"
import { drawImportItems } from "./views/drawImportItems.js";
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
			<div class="right-side">
				${svgViewer(state)}
				${state.selectedPath !== null ? html`<div class="path-selected" @click=${clearSelectedPath}>unselect path</div>` : ""}
				<div class="footprint-toolbox">${state.footprints.map(renderFootprint)}</div>
				${state.previewFootprint ? renderPreviewFootprint(...state.previewFootprint) : ""}
				${layerColorPicker(state)}
			</div>
			<div id="vertical-bar"></div>
		</div>
	`
}

const layerColorPicker = (state) => html`
	<div class="layers-color-picker">
		<b>Layers:</b>
		${state.layers.map(l => { 

			const getOpacity = n => (parseInt(n, 16)/255).toFixed(2);

			// verify color
			// verify name

			const name = l.length === 3 ? l[1][0].value.slice(1, -1) : l[0].value.match(/\".*?\"/)[0].slice(1, -1)
			const color = l.length === 3 ? l[2][0].value.slice(1, -3) : "";
			const opacity = l.length === 3 ? getOpacity(l[2][0].value.slice(8, -1)) : "";

			const onOpacityChange = (e) => {

				let hex = Math.floor((Number(e.target.value)*255)).toString(16);
				const { from, to } = l[2][0];

				while (hex.length < 2) {
		        hex = "0" + hex;
		    }

				state.codemirror.view.dispatch({
		      changes: {
		        from: to-3, 
		        to: to-1, 
		        insert: hex
		      }
		    });

				// could just update the paths in global state
		    dispatch("RUN", { flatten: false });
			}

			const onColorChange = (e) => {

				const hex = e.target.value;
				const { from, to } = l[2][0];

				state.codemirror.view.dispatch({
		      changes: {
		        from: from+1, 
		        to: from+8, 
		        insert: hex
		      }
		    });

				// could just update the paths in global state
		    dispatch("RUN", { flatten: false });
			}

			const onCommentInput = (e) => {

				if (l[0].name === "Property") {
					const { from } = l[0];
					state.codemirror.view.dispatch({
			      changes: {
			        from: from, 
			        insert: "//"
			      }
			    });

					// could just update the paths in global state
			    dispatch("RUN", { flatten: false });
				}

				if (l[0].name === "LineComment") {
					const { from } = l[0];
					state.codemirror.view.dispatch({
			      changes: {
			        from: from, 
			        to: from + 2,
			        insert: ""
			      }
			    });

					// could just update the paths in global state
			    dispatch("RUN", { flatten: false });
				}

				// state.codemirror.view.dispatch({
		    //   changes: {
		    //     from: from+1, 
		    //     to: from+8, 
		    //     insert: hex
		    //   }
		    // });

		    
			}



			const colorInput = l.length === 3 ?
				html`
						<span class="layer-color">
							<input @input=${onColorChange} class="color-input" type="color" style="opacity: ${opacity};" value=${color}/>
							<span class="opacity-input">
								${opacity}
								<input @input=${onOpacityChange} type="range" min="0" max="1" step="0.01" value=${opacity}/>
							</span>
						</span>
				` : "";

			return html`
				<div class="layer-item">
					<span class="layer-name">
						<input @input=${onCommentInput} type="checkbox" .checked=${l.length === 3}/>
						<span>${name}</span>
					</span>
					${colorInput}
				</div>
			`
		})}
	</div>

`


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
			 	import
			 	<div class="dropdown-content">
			 		${drawImportItems(files)}
			 	</div>
			 </div>
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

