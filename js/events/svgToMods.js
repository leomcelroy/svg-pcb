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

export const SvgFeatures = Object.freeze({
  SHAPES: "Shapes",
  PATHS: "Paths",
  BACKGROUND: "Background"
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
    

    // Step 2: opening a specific mods program
    /*
    This would be done using sessionStorage.
    Mods module would register 
    */

    // Step 3: modify milling program by adding a new svgToMods module

    // Step 4: figure out how to send svg to the new mods module
  }
}

export function svgToMods(state, exportFeatures = SvgFeatures.PATHS) {
  const layers = state.pcb.layers;
  const pcb = state.pcb;

  //const controller = new SvgToModsController();
  //controller.spawnMods(state.svgToModsOptions.selectedMachine);
  const machine = state.svgToModsOptions.selectedMachine;
  const url = SvgToModsProps.MODS_URL + "?program=" + machine.addr;
  
  //state.svgToModsOptions.modsWindowProxy = window.open(url, '_blank');
  state.svgToModsOptions.modsWindowProxy = window.open(url);
  state.svgToModsOptions.SVGString = getSVGString(state, exportFeatures);

  // Show dialog with a message.
  // We want the user to load a custom SVG module in Mods for now.
  // When it is done, user has to click OK and we send data over.

  // if (confirm("Load updated SVG module in Mods and click OK")) {
  //   let svgData = '<svg xmlns="http://www.w3.org/2000/svg" width="50mm" height="50mm" version="1.1"><rect width="50mm" height="50mm" fill="black"/><rect x="5mm" y="5mm" width="40mm" height="40mm" fill="white"/></svg>';
  //   winProxy.postMessage("heye", url);
  // } 
}

function getSVGString(state, exportFeatures) {
  const serializer = new XMLSerializer();
  const svg = document.querySelector("svg").cloneNode(true);

  let features = svg.querySelector(".paths");

  if (exportFeatures === SvgFeatures.PATHS) {
    features = svg.querySelector(".paths");
  } else if (exportFeatures === SvgFeatures.SHAPES) {
    features = svg.querySelector(".shapes");
  } else if (exportFeatures == SvgFeatures.BACKGROUND) {
    features = svg.querySelector(".background");
  }

  svg.innerHTML = "";
  svg.append(features);

  const width = (state.limits.x[1] - state.limits.x[0]);
  const height = (state.limits.y[1] - state.limits.y[0]);

  svg.setAttribute("transform", `scale(1, -1) translate(0, ${-(state.limits.y[0]+state.limits.y[1])})`);
  svg.setAttribute("style", "");
  svg.setAttribute("width", `${width*state.mm_per_unit}mm`);
  svg.setAttribute("height", `${height*state.mm_per_unit}mm`);
  svg.setAttribute("viewBox", `${state.limits.x[0]} ${state.limits.y[0]} ${width} ${height}`);
  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  const source = serializer.serializeToString(svg);
  //const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  
  return source;
}