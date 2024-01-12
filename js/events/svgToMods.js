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
  //MODS_URL: "https://localhost:8081", // ?program=...
});

export const SvgToModsMachines = Object.freeze({
  NOMAD: { name: "Carbide Nomad", addr: "programs/machines/Carbide%20Nomad/PCB" },
  GCODE: { name: "ISO GCode", addr: "programs/machines/G-code/mill%202D%20PCB" },
  OTHERMILL: { name: "Bantam Tools Othermill", addr: "programs/machines/Othermill-Bantam%20Tools/PCB" },
  ROLAND_MDX: { name: "Roland MDX", addr:"programs/machines/Roland/MDX%20mill/PCB" },
  ROLAND_SRM20: { name: "Roland SRM-20", addr: "programs/machines/Roland/SRM-20%20mill/mill%202D%20PCB" },
  SHOPBOT: { name: "ShopBot", addr: "programs/machines/ShopBot/mill%202D%20PCB" }
});

export class SvgToModsController {
  constructor(){}
  spawnMods(machine){
    
    // Step 1: open another tab with mods in it
    const url = SvgToModsProps.MODS_URL + "?program=" + machine.addr;
    window.open(url, '_blank');

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
  controller.spawnMods(state.svgToModsOptions.selectedMachine);
}