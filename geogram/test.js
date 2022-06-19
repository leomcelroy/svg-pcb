import { addPanZoom } from "./addPanZoom.js";
import {
  turnForward,
  vec,
  close,
  translate,
  rotate,
  scale,
  originate,
  goTo,
  reverse,
  thicken,
  copyPaste,
  offset,
  outline,
  expand,
  intersect,
  difference,
  union,
  xor,
  bezier,
  getAngle,
  extrema,
  getPoint,
  centroid,
  width,
  height,
  getPathData,
  pathD,
  arc,
  rectangle,
  circle,
  path,
  Gram
} from "./index.js";

const svg = document.querySelector("svg");
const { setScaleXY } = addPanZoom(svg);


const draw = (...args) => {
  let d = "";
  args.forEach(shape => d += getPathData(shape))
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "black");
  path.setAttribute("fill", "none");
  path.setAttribute("vector-effect", "non-scaling-stroke");
  path.setAttribute("stroke-width", "3");
  path.setAttribute("d", d);

  const target = document.querySelector(".target");
  target.appendChild(path);

  // const path = `
  //   <path 
  //     fill="none" 
  //     vector-effect="non-scaling-stroke"
  //     stroke-width="3" 
  //     stroke="black" d="${d}"/>
  // `
  // target.innerHTML = path;
}

const clearSVG = () => {
  const target = document.querySelector(".target");
  target.innerHTML = "";
}

const t = path([
  [20, 30],
  [300, 430]
])

setScaleXY({
  x: [0, 500],
  y: [-200, 0]
})
