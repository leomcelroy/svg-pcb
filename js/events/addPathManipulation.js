import { dispatch } from "../dispatch.js";
import { snapToGrid } from "../snapToGrid.js";
import { snapToPad } from "../snapToPad.js";
import * as esprima from 'esprima';

const sigFigs = num => num.includes(".")
  ? num.split(".")[1].length
  : num.length;

const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

export function addPathManipulation(state, svgListener) {

  // --- POINT MANIPULATION ---

  // addPointManipulation()
  svgListener("mousedown", ".path-pt", e => {
    const index = Number(e.target.dataset.index);
    const { from, to, args } = state.selectedPath;
    const code = state.codemirror.view.state.doc.toString();
    const snippet = code.slice(from, to);
    console.log(snippet);
    const ast = esprima.parse(`hack${snippet}`, { range: true, comment: true }).body[0];
    const parsedArg = ast.expression.arguments[index];
    parsedArg.range = [
      parsedArg.range[0] - 4 + from,
      parsedArg.range[1] - 4 + from,
    ]

    console.log(parsedArg, code.slice(...parsedArg.range));

    state.transforming = true;
  })

  svgListener("mouseup", "", e => {
    state.transforming = false;
  })


  // addCubicManipulation()
  // addFilletManipulation()

  // --- POINT CONVERSION ---


  // --- PATH SELECTION ---
  svgListener("mousedown", ".selectable-path", e => {
    const start = [...e.target.classList].find(x => x.match(/pathStart-\d+/)).split("-")[1];
    
    state.selectedPath = {
      from: Number(start)
    }

    // TODO: scroll to this button in code, highlight perhaps
  })

  // --- POINT ADDING ---
  addPointAdding(state, svgListener);
}

function addPointAdding(state, svgListener) {
  let clickedPoint = null;

  const svg = document.querySelector("svg");
  const svgPoint = svg.panZoomParams.svgPoint;

  svgListener("mousedown", "", e => {
    if (e.target.classList.contains("selectable-path")) return;
    if (e.target.classList.contains("path-pt")) return;
    const isPt = e.composedPath().some(el => el.classList?.contains("draggable-pt"));
    if (isPt || state.selectedPath === null) return;

    clickedPoint = {x: e.offsetX, y: e.offsetY };
    
    dispatch("RUN"); // set proper indices
  })

  svgListener("mousemove", "", e => {
    const currentPoint = { x: e.offsetX, y: e.offsetY };
    const targetPoint = svgPoint(currentPoint);
    const pt = snapToPad(targetPoint);

    if (!pt.snapped) {
      pt.x = snapToGrid(pt.x);
      pt.y = snapToGrid(pt.y);
    }

    state.preview = [ pt.x, pt.y ];

    dispatch("RENDER");
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

    const pt = snapToPad(targetPoint);


    if (!pt.snapped) {
      pt.x = snapToGrid(pt.x);
      pt.y = snapToGrid(pt.y);
    }

    const doc = state.codemirror.view.state.doc;
    const string = doc.toString();

    let start = state.selectedPath.to-2;
    const chs = [" ", "\t", "\n"];
    let ch = " ";
    while (start > 0) {
      ch = string[start];
      if (!chs.includes(ch)) break;
      start--;
    }

    const textStart = `${(ch === "," || ch === "(") ? "" : ","}\n  `;

    const text = pt.snapped
      ? `${textStart}${pt.padRef},`
      : `${textStart}[${pt.x}, ${pt.y}],`;

    state.codemirror.view.dispatch({
      changes: {
        from: start+1, 
        insert: text
      }
    });

    dispatch("RUN");
  })
}

function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}








