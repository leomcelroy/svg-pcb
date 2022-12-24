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
  // Gram,
  offset2,
  boolean
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

let t = path([
  [20, 30],
  // ["fillet", 1, [100, 32]],
  ["fillet", 10, [200, 32]],
  // ["fillet", 10000, [100, 248]],
  // ["bezier", [21, 30], [10, 200], [65, 78]],
  // ["chamfer", 78, [300, 200]],
  // [100, 120],
  // ["bezier", [21, 30], [10, 200]],
  // [100, 230],
  // ["bezier", [121, 30], [110, 200]],
  // ["arc", [32, 43]],
  [200, 230]
])
// arc(t, 56, 89)
// arc(t, -56, 23)
// turnForward(t, 245, 87)
// vec(t, [0, -87])
// turnForward(t, 90, 87)
// arc(t, 90, 23)
// arc(t, -45, 70)
// thicken(t, 6)

const c = circle(50)
translate(c, [100, 0])
// boolean(t, c, "difference")
t.push(...c)
// thicken(t, 2)
// scale(t, 0.003)
offset2(t, 4, { endType: "openRound", joinType: "square" });
draw(t);

setScaleXY({
  x: [0, 500],
  y: [-300, 0]
})
