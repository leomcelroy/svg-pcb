//import JSZip from "jszip";
//import { saveAs } from "file-saver";
import { MM_PER_INCH } from "../constants.js";

// This should be a global function
export function inchesToMM(inches){
  return inches * MM_PER_INCH;
}

// Just a way to emulate ENUMS in JavaScript. 
// This structure becomes immutable.
// The cool thing about this is that instead of integers
// one can use actual names what can be useful when debugging.
export const SomeEnum = Object.freeze({
  PROP_A: 'PROPA',
  PROP_B: 'PROPB'
});

export const SvgToModsProps = Object.freeze({
  MODS_URL: "https://modsproject.org/"
});

export const SvgToModsMachines = Object.freeze({
  NOMAD: "Carbide Nomad",
  GCODE: "ISO GCode",
  OTHERMILL: "Bantam Tools Othermill",
  ROLAND_MDX: "Roland MDX",
  ROLAND_SRM20: "ROland SRM-20",
  SHOPBOT: "ShopBot"
});

export class SvgToModsController {
  constructor(){}
  spawnMods(){
    
    // Step 1: open another tab with mods in it
    window.open(SvgToModsProps.MODS_URL, '_blank');

    // Step 2: opening a specific mods program
    /*
    This would be done using sessionStorage.
    Mods module would register 
    */

    // Step 3: modify milling program by adding a new svgToMods module

    // Step 4: figure out how to send svg to the new mods module
  }
}

export function svgToMods(state) {
  const layers = state.pcb.layers;
  const pcb = state.pcb;

  const controller = new SvgToModsController();
  controller.spawnMods();
}