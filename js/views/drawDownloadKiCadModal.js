import { html } from "lit-html";
import { downloadKiCad } from "../events/downloadKiCad.js";
import { dispatch } from "../dispatch.js";

export const drawDownloadKiCadModal = state => {
    if (!state.downloadKiCadModal) return "";

    return html`
    <div id="modal_download_kicad" class="modal">
    	<div class="modal-content">
    		<div class="modal-header">
    			<div class="col-75 align-left">
    				<i class="icon fa fa-arrow-circle-down"></i>
    				<h3 class="modal-title">Download KiCad Options</h3>
    			</div>
    			<div class="col-25 align-right">
    				<span 
    					class="close"
    					@click=${(e) => {
    						state.downloadKiCadModal = false;
    						dispatch("RENDER");
    					}}><i class="fa fa-times"></i></span>
    			</div>
    		</div>
    		<div class="modal-body">
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
    			</div> <!-- /.col-50 -->
    			<div class="col-50">
					<h4><label for="footprintLibraryName">Footprint Library Name</label></h4>
					<div class="modal-line">
						<input id="footprintLibraryName" 
							type="text" 
							.value=${state.downloadKiCadOptions.footprintLibraryName === "" ? "SvgPcb" : state.downloadKiCadOptions.footprintLibraryName}
							@input=${(e) => {
								state.downloadKiCadOptions.footprintLibraryName = e.target.value;
							}}>
					</div>
    			</div> <!-- /.col-50 -->
    		</div> <!-- /.modal-body -->
    		<div class="modal-footer">
    			<button 
    				type="button" 
    				class="btn"
    				@click=${(e) => {
    					state.downloadKiCadModal = false;
    					dispatch("RENDER");
    				}}>Cancel</button>
    			<button 
    				type="button" 
    				class="btn btn-primary"
    				@click=${(e) => {
    					state.downloadKiCadModal = false;
    					downloadKiCad(state);
    					dispatch("RENDER");
    				}}>Download</button>
    		</div>
    	</div>
    </div>
    `;
}