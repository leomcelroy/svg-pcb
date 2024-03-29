import { html } from "lit-html";
import { downloadGerber, GerberDrillFormat } from "../events/downloadGerber.js";
import { dispatch } from "../dispatch.js";

function getLayerList(state){
	// Populate map of layers based on current layers in the design.
	const layers = state.pcb.layers; 
	state.downloadGerberOptions.layers.clear();
	for (const [key, value] of Object.entries(layers)) {
		state.downloadGerberOptions.layers.set(key, value);
	}

	// Return a list of keys (layer names).
	const list = [];
	state.downloadGerberOptions.layers.forEach((val, key) => {
		if (key == "padLabels" || key == "componentLabels") return;
		list.push(key);
	});
	return list;
}

function setDownloadGerberLayerVisibility(state){
	// Set layer visiblity based on what layers exist
	state.downloadGerberOptions.layers.set("F.Cu", state.pcb.layers["F.Cu"] === undefined ? false : true);
	state.downloadGerberOptions.layers.set("B.Cu", state.pcb.layers["B.Cu"] === undefined ? false : true);
	state.downloadGerberOptions.layers.set("F.Mask", state.pcb.layers["F.Cu"] === undefined ? false : true);
	state.downloadGerberOptions.layers.set("B.Mask", state.pcb.layers["B.Cu"] === undefined ? false : true);
	state.downloadGerberOptions.layers.set("Outline", state.pcb.layers["interior"] === undefined ? false : true);
	state.downloadGerberOptions.layers.set("Drills", true);
}

export const drawDownloadGerberModal = state => {
    if (!state.downloadGerberModal) return "";

    setDownloadGerberLayerVisibility(state);

    return html`
    <div id="modal_download_gerber" class="modal">
    	<div class="modal-content">
    		<div class="modal-header">
    			<div class="col-75 align-left">
    				<i class="icon fa fa-arrow-circle-down"></i>
    				<h3 class="modal-title">Download Gerber Options</h3>
    			</div>
    			<div class="col-25 align-right">
    				<span 
    					class="close"
    					@click=${(e) => {
    						const modal = document.getElementById("modal_download_gerber");
    						state.downloadGerberModal = false;
    						dispatch("RENDER");
    					}}><i class="fa fa-times"></i></span>
    			</div>
    		</div>
    		<div class="modal-body">
    			<div class="col-50">
    				<h4>Include Layers</h4>
    				${
    					getLayerList(state).map((l) => {
    					return html`
    					<div class="modal-line">
    						<input 
    							type="checkbox"
    							id="input-${l}"
    							.checked=${state.downloadGerberOptions.layers.get(l)}
    							@change=${(e) => {
    								state.downloadGerberOptions.layers.set(l, e.target.checked);
    							}}> 
    						<label for="input-${l}">${l}</label>
    					</div>
    					`
    				})}
    			</div> <!-- /.col-50 -->
    			<div class="col-50">
    				<h4><label for="projectName">Project Name</label></h4>
    				<div class="modal-line">
    					<input id="projectName" 
    						type="text" 
    						.value=${state.name === "" ? "Untitled" : state.name}
    						@input=${(e) => {
    							state.name = e.target.value;
    						}}>
    				</div>

    				<h4>Drill Format</h4>
    				<div class="modal-line">
    					<input 
    						type="radio"
    						id="input-drillFormatExcellon"
    						name="drillFormat"
    						.checked=${state.downloadGerberOptions.drillFormat == GerberDrillFormat.EXCELLON}
    						@change=${(e) => {
    							state.downloadGerberOptions.drillFormat = GerberDrillFormat.EXCELLON;
    							document.getElementById("input-excellonMM").disabled = false;
    							document.getElementById("input-excellonIN").disabled = false;
    						}}>
    					<label for="input-drillFormatExcellon">Excellon</label>
    					&nbsp;
    					<input 
    						type="radio"
    						id="input-drillFormatGerber"
    						name="drillFormat"
    						.checked=${state.downloadGerberOptions.drillFormat == GerberDrillFormat.GERBER}
    						@change=${(e) => {
    							state.downloadGerberOptions.drillFormat = GerberDrillFormat.GERBER;
    							document.getElementById("input-excellonMM").disabled = true;
    							document.getElementById("input-excellonIN").disabled = true;
    						}}>
    					<label for="input-drillFromatGerber">Gerber</label>
    				</div> <!-- /.modal-line -->

    				<h4>Excellon Drill Units</h4>
    				<div class="modal-line">	
    					<input 
    						type="radio"
    						id="input-excellonMM"
    						name="excellonUnits"
    						.checked=${state.downloadGerberOptions.excellonMetric}
    						@change=${(e) => {
    							state.downloadGerberOptions.excellonMetric = e.target.checked;
    						}}>
    					<label for="input-excellonMM">mm</label>
    					&nbsp;
    					<input 
    						type="radio"
    						id="input-excellonIN"
    						name="excellonUnits"
    						.checked=${!state.downloadGerberOptions.excellonMetric}
    						@change=${(e) => {
    							state.downloadGerberOptions.excellonMetric = !e.target.checked;
    						}}>
    					<label for="input-excellonIN">in</label>
    				</div> <!-- /.modal-line -->

    				<h4>Additional Options</h4>
    				<div class="modal-line">
    					<input 
    						type="checkbox"
    						id="input-outlineAllLayers"
    						.checked=${state.downloadGerberOptions.includeOutline}
    						@change=${(e) => {
    							state.downloadGerberOptions.includeOutline = e.target.checked;
    						}}> 
    					<label for="input-outlineAllLayers">Include outline in all layers</label>
    				</div>
    				<div class="modal-line">
    					<input 
    						type="checkbox"
    						id="input-protelFilenames"
    						.checked=${state.downloadGerberOptions.protelFilenames}
    						@change=${(e) => {
    							state.downloadGerberOptions.protelFilenames = e.target.checked;
    						}}> 
    					<label for="input-protelFilenames">Use Protel Filenames</label>
    				</div>
    			</div> <!-- /.col-50 -->
    		</div> <!-- /.modal-body -->
    		<div class="modal-footer">
    			<button 
    				type="button" 
    				class="btn"
    				@click=${(e) => {
    					state.downloadGerberModal = false;
    					dispatch("RENDER");
    				}}>Cancel</button>
    			<button 
    				type="button" 
    				class="btn btn-primary"
    				@click=${(e) => {
    					state.downloadGerberModal = false;
    					downloadGerber(state);
    					dispatch("RENDER");
    				}}>Download</button>
    		</div>
    	</div>
    </div>
    `;
}