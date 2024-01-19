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
import { svgToMods, SvgToModsMachines, SvgFeatures, SvgToModsProps } from "../events/svgToMods.js";
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
                    <h4>Pick your machine</h4>
                    <div class="modal-error" id="svgToMods_noMachineError" style="display:none">
                        You must select a machine!
                    </div>
                    ${
                        Object.keys(SvgToModsMachines).map(key => {
                        return html`
                        <div class="modal-line">
                            <input 
                                type="radio"
                                id="input-${key}"
                                name="svgToModsMachine"
                                @change=${(e) => {
                                    state.svgToModsOptions.selectedMachine = SvgToModsMachines[key];
                                }}>
                            <label for="input-${key}">${ SvgToModsMachines[key].name }</label>
                        </div>
                        `
                    })}
                </div> <!-- /.col-50 -->
                <div class="col-50">
                    <img src="images/neil.gif" style="width:100%" title="Pixel Neil by Miriam Choi" alt="Pixel Neil by Miriam Choi">
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
                        if (state.svgToModsOptions.selectedMachine === undefined) {
                            document.getElementById("svgToMods_noMachineError").style.display = "inline-block";
                            return;
                        }

                        state.svgToModsModal = false;
                        svgToMods(state, state.svgToModsOptions.selectedMachine, window);
                        dispatch("RENDER");
                    }}>Push to Mods</button>
            </div>
        </div>
    </div>
    `;
}