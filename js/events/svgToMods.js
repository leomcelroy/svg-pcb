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
  MODS_URL: "https://modsproject.org"
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

export function svgToMods(state, machine, win) {
  //const machine = state.svgToModsOptions.selectedMachine;
  const url = SvgToModsProps.MODS_URL + "?program=" + machine.addr;

  let interval;

  function handleMessageFromMods(e) {
    clearInterval(interval);
    win.removeEventListener('message', handleMessageFromMods);
  }

  win.addEventListener('message', handleMessageFromMods);

  const prox = win.open(url);
  const svgString = getSVGString(state);

  interval = setInterval(() => {
    prox.postMessage(svgString, "*");    
  }, 1000);
}

function getSVGString(state) {
  const serializer = new XMLSerializer();
  const svg = document.querySelector("svg").cloneNode(true);

  const p = svg.querySelector(".paths");
  const s = svg.querySelector(".shapes");
  const b = svg.querySelector(".background");

  svg.innerHTML = "";
  svg.append(b);
  svg.append(s);
  svg.append(p);

  const width = (state.limits.x[1] - state.limits.x[0]);
  const height = (state.limits.y[1] - state.limits.y[0]);

  console.log(width, height);

  svg.setAttribute("transform", `scale(1, -1) translate(0, ${-(state.limits.y[0]+state.limits.y[1])})`);
  svg.setAttribute("style", "background: #000000");
  svg.setAttribute("width", `${width*MM_PER_INCH}mm`);
  svg.setAttribute("height", `${height*MM_PER_INCH}mm`);
  svg.setAttribute("viewBox", `${state.limits.x[0]} ${state.limits.y[0]} ${width} ${height}`);
  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  const source = serializer.serializeToString(svg);
  
  return source;
}