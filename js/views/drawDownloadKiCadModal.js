import { html } from "lit-html";
import { KiCadPadPrimitiveShape, KiCadPadShapeType, downloadKiCad } from "../events/downloadKiCad.js";
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

					<h4>Footprint Pad Type</h4>

					<div class="modal-line">
						<input id="kicadFootprintPadTypePolygon"
							type="radio" 
							name="kicadFootprintPadType"
							.value=${KiCadPadShapeType.POLYGON}
							.checked=${state.downloadKiCadOptions.padShapeType === KiCadPadShapeType.POLYGON}
    						@change=${(e) => {
								state.downloadKiCadOptions.padShapeType = e.target.checked 
									? KiCadPadShapeType.POLYGON
									: KiCadPadShapeType.PRIMITIVE
    						}}>
						<label for="kicadFootprintPadTypePolygon">Polygon</label>

						&nbsp;

						<input id="kicadFootprintPadTypePrimitive"
							type="radio" 
							name="kicadFootprintPadType"
							.value=${KiCadPadShapeType.PRIMITIVE}
							.checked=${state.downloadKiCadOptions.padShapeType === KiCadPadShapeType.PRIMITIVE}
    						@change=${(e) => {
								state.downloadKiCadOptions.padShapeType = e.target.checked 
									? KiCadPadShapeType.PRIMITIVE
									: KiCadPadShapeType.POLYGON
    						}}>
						<label for="kicadFootprintPadTypePrimitive">Primitive</label>
					</div>

					<h4>Footprint Primitive Pad Shape</h4>

					<div class="modal-line">
						<input id="kicadFootprintPadPrimitiveShapeRectangle"
							type="radio" 
							name="kicadFootprintPadPrimitiveShape"
							.value=${KiCadPadPrimitiveShape.RECTANGLE}
							.checked=${state.downloadKiCadOptions.padPrimitiveShape === KiCadPadPrimitiveShape.RECTANGLE}
    						@change=${(e) => {
								state.downloadKiCadOptions.padPrimitiveShape = e.target.checked 
									? KiCadPadPrimitiveShape.RECTANGLE
									: KiCadPadPrimitiveShape.CIRCLE
    						}}>
						<label for="kicadFootprintPadPrimitiveShapeRectangle">Rectangle</label>

						&nbsp;

						<input id="kicadFootprintPadPrimitiveShapeCircle"
							type="radio" 
							name="kicadFootprintPadPrimitiveShape"
							.value=${KiCadPadPrimitiveShape.CIRCLE}
							.checked=${state.downloadKiCadOptions.padPrimitiveShape === KiCadPadPrimitiveShape.CIRCLE}
    						@change=${(e) => {
								state.downloadKiCadOptions.padPrimitiveShape = e.target.checked 
									? KiCadPadPrimitiveShape.CIRCLE
									: KiCadPadPrimitiveShape.RECTANGLE
    						}}>
						<label for="kicadFootprintPadPrimitiveShapeCircle">Circle</label>
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