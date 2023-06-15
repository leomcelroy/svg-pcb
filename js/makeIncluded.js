import * as geo from "/geogram/index.js";
import { PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import { createText } from "./createText/createText.js";
import { renderShapes } from "./renderShapes.js";
import { renderShape } from "./renderShape.js";
import { renderPCB } from "./renderPCB.js";
import { checkConnectivity } from "./checkConnectivity.js";
import { makeFootprintGeometry } from "./makeFootprintGeometry.js";
import { global_state } from "./global_state.js";

import * as Nos from "../drawing/noise-rav.js";

import { noise } from "../drawing/noise.js";
import { Turtle } from "../drawing/Turtle.js";
import { TraceSkeleton }  from "../drawing/TraceSkeleton.js";

class IncludedPCB extends PCB {
  constructor(...args) {
    super(...args);

    global_state.idToName = {};
  }

  add(...args) {
    // if passing staticInfo, as is case when in VariableDeclaration
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

function lerp(start, end, t) {
    return (1 - t) * start + t * end;
}

function cubicInterpolation(start, end, t) {
    let t2 = t * t;
    let t3 = t2 * t;

    return (2 * t3 - 3 * t2 + 1) * start + (-2 * t3 + 3 * t2) * end;
}

const rand = seededRandom(4325235);

function randInRange(min, max) {
    return rand() * (max - min) + min;
}

function seededRandom(seed) {
    const a = 1664525;
    const c = 1013904223;
    const m = 2**32; // 2 to the power of 32
    let currentSeed = seed;

    return function() {
        currentSeed = (a * currentSeed + c) % m;
        return currentSeed / m;
    };
}

function randomIntFromRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(rand() * (max - min + 1) + min);
}

const fold = (fn) => (v0, v1) => {
  return v0.map((x, i) => fn(x, v1[i]));
}

const vec = {
  fold,
  add: fold((x, y) => x+y),
  sub: fold((x, y) => x-y),
  // dot
  // cross
  // mag
  // norm
}


export const makeIncluded = (flatten) => ({
  geo,
  PCB: IncludedPCB,
  via,
  art: {
    noise,
    Turtle,
    lerp,
    cubicInterpolation,
    randInRange,
    seededRandom,
    rand,
    randomIntFromRange,
    vec,
    Nos
  },
  setWorkarea(limits) {
    global_state.limits = limits;
  },
  createText,
  renderShapes,
  renderShape,
  checkConnectivity,
  renderPCB: obj => {
    // console.log(obj.layerColors);
    return renderPCB(flatten)(obj);
  },
  footprint: ([ json ], staticInfo ) => {
    const cachedFootprint = global_state.footprints;
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
    }

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
  },
  document: null,
  window: null,
  localStorage: null,
  Function: null,
  eval: null,
  // pipe: (x, ...fns) => fns.reduce((v, f) => f(v), x)
  // "import": null,
})