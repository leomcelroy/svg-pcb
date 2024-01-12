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

export class SvgToModsController {
  constructor(){}
  spawnMods(){
    // Step 1: open another tab with mods in it
    window.open(SvgToModsProps.MODS_URL, '_blank');
  }
}

export function svgToMods(state) {
  const layers = state.pcb.layers;
  const pcb = state.pcb;

  const controller = new SvgToModsController();
  controller.spawnMods();
}