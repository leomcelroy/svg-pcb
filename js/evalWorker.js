import { PCB } from "./pcb.js";
import { via } from "./pcb_helpers.js";
import * as geo from "/geogram/index.js";
import { global_state } from "./global_state.js";
import { renderShapes } from "./renderShapes.js";
import { renderPath } from "./renderPath.js";
import { renderPCB } from "./renderPCB.js";
import { ensureSyntaxTree } from "@codemirror/language";

const getProgramString = () => global_state.codemirror.view.state.doc.toString();

const makeIncluded = (flatten) => ({
  // kicadToObj, // FIXME: remove references to
  geo,
  PCB,
  via,
  renderPCB: renderPCB(flatten),
  renderShapes,
  renderPath,
  pt: (x, y, start = -1, end = -1) => { 

    const dupe = global_state.pts.some(pt => pt.start === start);
    if (start === -1 || dupe) return [x, y];

    const string = ""; // getProgramString();
    const snippet = string.slice(start, end);
    const pt = { pt: [x, y], start, end, text: snippet };
    global_state.pts.push(pt);
    return [x, y]; 
  },
  path: (...args) => {
    // const start = args.at(-2);
    // const end = args.at(-1);
    return geo.path(args)[0];
  },
  // pipe: (x, ...fns) => fns.reduce((v, f) => f(v), x)
  // "import": null,
})

addEventListener('message', e => {
  const { flatten, string } = e.data;
  const included = makeIncluded(flatten);
  const f = new Function(...Object.keys(included), string)
  f(...Object.values(included));

  console.log(global_state);

  postMessage("done");
});

