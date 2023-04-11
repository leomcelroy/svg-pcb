import * as geo from "/geogram/index.js";
import { PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import { renderShapes } from "./renderShapes.js";
import { renderPath } from "./renderPath.js";
import { renderPCB } from "./renderPCB.js";
import { makeFootprintGeometry } from "./makeFootprintGeometry.js";
import { global_state } from "./global_state.js";


class IncludedPCB extends PCB {
  constructor(...args) {
    super(...args);

    global_state.idToName = {};
  }

  add(...args) {
    if (Array.isArray(args[0])) {
      const [[footprint, ops], staticInfo] = args;
      const comp = super.add(footprint, ops);
      const { variableName } = staticInfo;
      if (variableName !== "") {
        global_state.idToName[comp.id] = variableName;
      } 

      return comp;
    } else {
      return super.add(...args);
    }

  }
}

export const makeIncluded = (flatten) => ({
  // kicadToObj, // FIXME: remove references to
  geo,
  PCB: IncludedPCB,
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
  footprint: ([ json ], staticInfo ) => {
    const cachedFootprint = global_state.footprints;
    // console.log(staticInfo);

    const key = staticInfo.variableName;
    const { snippet } = staticInfo
    const cached = key in cachedFootprint;
    if (cached && cachedFootprint[key].snippet === snippet) {
    } else {
      cachedFootprint[key] = {
        snippet,
        name: key,
        svgView: makeFootprintGeometry(json)
      };

      console.log(cachedFootprint);
      // console.log("saved footprint in", key);
    }

    // here I could optimize by
    // - generating geometry from pathD string
    // - generating mask geometry
    // - generating footprint preview geometry
    // and caching all of the above

    return json;
  },
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

    const index = global_state.selectablePaths.length;
    global_state.selectablePaths.push([staticInfo.from, args]);

    if (global_state.selectedPathIndex < 0) return pts;

    if (global_state.selectedPathIndex === index) {
      global_state.selectedPath = {
        from: staticInfo.from,
        to: staticInfo.to,
        args: args
      }
    }

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