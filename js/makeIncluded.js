import * as geo from "/geogram/index.js";
import { PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import { renderShapes } from "./renderShapes.js";
import { renderPath } from "./renderPath.js";
import { renderPCB } from "./renderPCB.js";
import { global_state } from "./global_state.js";

export const makeIncluded = (flatten) => ({
  // kicadToObj, // FIXME: remove references to
  geo,
  PCB,
  via,
  renderPCB: obj => {
    // console.log(obj.layerColors);
    return renderPCB(flatten)(obj);
  },
  renderShapes,
  renderPath,
  document: null,
  window: null,
  localStorage: null,
  Function: null,
  eval: null,
  pt: ([x, y], staticInfo) => { 
    const start = staticInfo.from || -1;
    const end = staticInfo.to || -1;

    const dupe = global_state.pts.some(pt => pt.start === start);
    if (start === -1 || dupe) return [x, y];

    const snippet = staticInfo.snippet;
    const pt = { 
      pt: [x, y], 
      start: start+1, 
      end: end+1, 
      text: snippet 
    };

    global_state.pts.push(pt);
    return [x, y]; 
  },
  path: (args, staticInfo) => {
    const pts = geo.path2(...args);

    // if selected path then add pts info to selected path

    // console.log(global_state.selectedPath, staticInfo);

    // if (global_state.selectedPath && staticInfo.from === global_state.selectedPath.pathStart) {
    //  staticInfo.pts = pts;
    // }

    return pts;
  },
  input: ([ops], staticInfo) => {
    // { type: slider, min: num, max: num, step: num, value }

    if ( ops.type === "slider") {
      global_state.inputs.push([ops, staticInfo]);
    } else {
      console.log("Unrecognized input type:", ops);
    }

    return ops.value;
  }
  // pipe: (x, ...fns) => fns.reduce((v, f) => f(v), x)
  // "import": null,
})