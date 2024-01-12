/*
This feature sends board svg from SvgPcb to Mods via WebSockets.

There could be two ways or two directions to do it.

1. From SvgPcb to Mods
---
It would fire up Mods and send the SVG file to it with one click.
No need to sync between SvgPcb and Mods manually. No need to enter
web sockets addresses ports etc.

2. 
---
Pull from Mods, where a Mods module would have fields for IP address
and port + a button that pulls the active board design from SvgPcb.


*/

import { html } from "lit-html";
import { svgToMods } from "../events/svgToMods.js";
import { dispatch } from "../dispatch.js";

export const drawSvgToModsModal = state => {
    if (!state.svgToModsModal) return "";

    return html`
    <div id="modal_svg_to_mods" class="modal">
    	<div class="modal-content">
    		<div class="modal-header">
    			<div class="col-75 align-left">
    				<i class="icon fa fa-arrow-circle-down"></i>
    				<h3 class="modal-title">SVG to Mods Options</h3>
    			</div>
    			<div class="col-25 align-right">
    				<span 
    					class="close"
    					@click=${(e) => {
    						const modal = document.getElementById("modal_svg_to_mods");
    						state.svgToModsModal = false;
    						dispatch("RENDER");
    					}}><i class="fa fa-times"></i></span>
    			</div>
    		</div>
    		<div class="modal-body">
    			<div class="col-50">
    				<h4>Some options maybe</h4>
    				<p>...</p>
    			</div> <!-- /.col-50 -->
    		</div> <!-- /.modal-body -->
    		<div class="modal-footer">
    			<button 
    				type="button" 
    				class="btn"
    				@click=${(e) => {
    					state.svgToModsModal = false;
    					dispatch("RENDER");
    				}}>Cancel</button>
    			<button 
    				type="button" 
    				class="btn btn-primary"
    				@click=${(e) => {
    					state.svgToModsModal = false;
                        svgToMods(state);
    					dispatch("RENDER");
    				}}>Push to Mods</button>
    		</div>
    	</div>
    </div>
    `;
}