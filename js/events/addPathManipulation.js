// import esprima from '/libs/esprima.js';
import * as esprima from 'esprima';
// import acorn from 'acorn';
import { dispatch } from "../dispatch.js";
import { getFileSection } from "../getFileSection.js";
import { ensureSyntaxTree } from "@codemirror/language";
import { getPoints } from "../getPoints.js";
import { global_state } from "../global_state.js";

const sigFigs = num => num.includes(".")
  ? num.split(".")[1].length
  : num.length;

const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

export function addPathManipulation(state, svgListener) {
  // window.addEventListener("mousedown", () => updateSelectedPath(state));
  // window.addEventListener("keydown", (evt) => {
  //   const key = event.keyCode || event.charCode;
  //   if (key == 8) {
  //     //backspace pressed
  //     updateSelectedPath(state);
  //   }
  // });
  let clickedPoint = null;

  setInterval(() => updateSelectedPath(state), 300);

  const svg = document.querySelector("svg");
  const toGrid = (n) => state.gridSize === 0 || !state.grid ? n : round(step(n, state.gridSize), 3);
  const svgPoint = svg.panZoomParams.svgPoint;

  svgListener("mousedown", "", e => {
    const isPt = e.composedPath().some(el => el.classList?.contains("draggable-pt"));
    if (isPt || state.selectedPath === null) return;

    
    clickedPoint = {x: e.offsetX, y: e.offsetY };
    
  })

  svgListener("mouseup", "", e => {
    const currentPoint = { x: e.offsetX, y: e.offsetY };
    if (clickedPoint === null 
        || clickedPoint.x !== currentPoint.x 
        || clickedPoint.y !== currentPoint.y ) {
      clickedPoint = null;
      return null;
    }

    const targetPoint = svgPoint(clickedPoint);

    const pt = {
      x: toGrid(targetPoint.x),
      y: toGrid(targetPoint.y)
    }

    const doc = state.codemirror.view.state.doc;
    const string = doc.toString();

    let start = state.selectedPath.pathEnd-2;
    const chs = [" ", "\t", "\n"];
    let ch = " ";
    while (start > 0) {
      ch = string[start];
      if (!chs.includes(ch)) break;
      start--;
    }

    const text = `${(ch === "," || ch === "(") ? "" : ","}\n  pt(${pt.x}, ${pt.y}),`

    state.codemirror.view.dispatch({
      changes: {
        from: start+1, 
        // to: startIndex, 
        insert: text
      }
    });
    

    dispatch("RUN");
  })
}

function updateSelectedPath(state) {
  const doc = state.codemirror.view.state.doc;
  let string = doc.toString();
  const ast = ensureSyntaxTree(state.codemirror.view.state, doc.length, 10000);

  const { pts, paths } = getPoints(state, ast);
  
  let selectedPath = null;
  paths.forEach(path => {
    const [pathStart, pathEnd] = path;
    const selections = global_state.codemirror.view.state.selection.ranges;
    
    const tempSelectedPath = selections.some(selection => {
      const { from, to } = selection;
      // if selection greater than pathStart and less than path end
      return from > pathStart && to < pathEnd;
    })

    if (tempSelectedPath) {
      selectedPath = {
        pathStart,
        pathEnd,
        str: string.substr(pathStart, pathEnd - pathStart),
      };
    }
  })


  global_state.selectedPath = selectedPath;
  dispatch("RENDER");
}

















