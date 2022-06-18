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

let s = [
  [ 
    { x: 0, y: 0 },
    { x: 100, y: 100 },
    { x: 40, y: 200 }  
  ],
]

let s1 = [
  [ 
    { x: 0, y: 0 },
    { x: 100, y: 100 },
    { x: 40, y: 200 }  
  ],
]

translate(s1, [100, 300])
close(s1);
thicken(s1, 10)
copyPaste(s1, 3, s => translate(s, [100, 22]))



// const mat = {
//   dx: 100,
//   dy: 200,
//   sx: 1,
//   sy: 1,
//   rotate: 0,
//   skew: 0,
// }

// transform(testShape, mat);


turnForward(s, 90, 40);
vec(s, [100, 100]);
close(s);
translate(s, [ 200, 100 ]);
rotate(s, 90);
const cc = getPoint(s, "cc")
scale(s, [-1.4, 3], cc);
offset(s, 20)
union(s, s1);
// draw(s);

const arcing = [[{x: 0, y: 0 }]];
arc(arcing, 180, 100)
arc(arcing, 90, 100)
turnForward(arcing, 90, 100)
turnForward(arcing, -90, 100)
thicken(arcing, 10)
translate(arcing, [ 150, 0 ])
console.log("arcing", arcing);
draw(arcing);

const c = [[{x: 3, y: 0}]];
bezier(c, [100, 200], [100, 40], [234, 105], [134, -305]);
translate(c, [400, 100]);
thicken(c, 10)
// draw(c)

setScaleXY({
  x: [0, 500],
  y: [-200, 0]
})
