import { transform } from "./transform.js";
import { offset } from "./offset.js";
import { offset2 } from "./offset2.js";
import { boolean } from "./boolean.js";
import { flattenPath } from "./libs/path-to-points.js";
import { bezier } from "./bezier.js";
import { arc } from "./arc.js";
import { translate } from "./translate.js";
import { rotate } from "./rotate.js";
import { scale } from "./scale.js";
import { getPoint } from "./getPoint.js";
import { extrema } from "./extrema.js";
import { turnForward } from "./turnForward.js";
import { path } from "./path.js";
import { path as path2 } from "./path2.js";

const overlap = (p0, p1) => 0.00000001 > Math.abs(p0[0] - p1[0]) + Math.abs(p0[1] - p1[1]);
const isClosed = shape => {
  if (shape.length === 0) return true;
  const start = shape[0][0];
  const end = shape.at(-1).at(-1);
  const closed = overlap(start, end);
  return closed;
}

function union() {
  const [ shape, ...shapes] = arguments;
  return shapes.reduce( (acc, cur) => boolean(acc, cur, "union"), shape);
}

function intersect() {
  const [ shape, ...shapes] = arguments;
  return shapes.reduce( (acc, cur) => boolean(acc, cur, "intersect"), shape);
}

function difference() {
  const [ shape, ...shapes] = arguments;
  return shapes.reduce( (acc, cur) => boolean(acc, cur, "difference"), shape);
}

function xor() {
  const [ shape, ...shapes] = arguments;
  return shapes.reduce( (acc, cur) => boolean(acc, cur, "xor"), shape);
}


function getAngle(shape) {
  if (shape.length === 0) throw new Error(`Shape must have at least one pt.`);

  const pl = shape.at(-1);
  if (pl.length < 2) return 0;

  const lastPoint = pl.at(-1);
  const secondLastPoint = pl.at(-2);

  const x = lastPoint[0] - secondLastPoint[0];
  const y = lastPoint[1] - secondLastPoint[1];

  return Math.atan2(y, x) * 180 / Math.PI;
}

const vec = (shape, [dx, dy] ) => {
  if (shape.length === 0) shape.push([ [ 0, 0 ] ]);
  const [ x, y ] = shape.at(-1).at(-1);
  shape.at(-1).push([ x+dx, y+dy ]);
  return shape;
}

const close = (shape, ) => {
  if (shape.length === 0) throw new Error(`Shape must have at least one pt.`);

  const [ x, y ] = shape[0][0];
  shape.at(-1).push([ x, y ]);
  return shape;
}

const centroid = shape => { // BUG: vec messes up centroid calculation
   const pts = shape.flat();
   if (pts.length === 1) return pts[0];
   else if (pts.length === 2) return { 
      x: (pts[0][0] + pts[1][0])/2, 
      y: (pts[0][1] + pts[1][1])/2
   }
   // if this is line then I should return midpoint;
   var first = pts[0], last = pts[pts.length-1];
   if (first[0] != last[0] || first[1] != last[1]) pts.push(first);
   var twicearea=0,
   x=0, y=0,
   nPts = pts.length,
   p1, p2, f;
   for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
      p1 = pts[i]; p2 = pts[j];
      f = p1[0]*p2[1] - p2[0]*p1[1];
      twicearea += f;          
      x += ( p1[0] + p2[0] ) * f;
      y += ( p1[1] + p2[1] ) * f;
   }
   f = twicearea * 3;
   return [ x/f, y/f ];
}

const copy = (shape) => JSON.parse(JSON.stringify(shape));

const width = (shape) => {
  const { xMin, xMax } = extrema(shape);
  return xMax - xMin;
}

const height = (shape) => {
  const { yMin, yMax } = extrema(shape);
  return yMax - yMin;
}

const originate = (shape) => {
  const cc = getPoint(shape, "cc");
  return translate(shape, [0, 0], cc);
}

const goTo = (shape, pt) => {
  shape.at(-1).push(pt);
  return shape;
}

const reverse = shape => {
  return shape.map( pl => pl.reverse() ).reverse();
}

const outline = (shape) => offset(shape, 0, { endType: "etClosedPolygon" });
const expand = (shape, distance) => offset(shape, distance, { endType: "etClosedPolygon" });
const thicken = (shape, distance) => {
  const overlap = (p0, p1) => 0.00000001 > Math.abs(p0[0] - p1[0]) + Math.abs(p0[1] - p1[1]);
  const start = shape[0][0];
  const end = shape.at(-1).at(-1);
  // should do this for each path
  const endType = overlap(start, end) ? "etClosedLine" : "etOpenButt";
  return offset(shape, distance/2, { endType, jointType: "jtMiter" });
}

const copyPaste = (shape, n, fn) => {
  const og = copy(shape);
  for ( let i = 0; i < n; i++) {
    shape.push(...fn(og));
  }

  return shape;
}

const getPathData = shape => {
  let pathD = "";
  shape.forEach(pl => {
    const [ x, y ] = pl[0];
    pathD += `M ${x},${y}`
    pl.slice(1).forEach(pt => {
      const [ x, y ] = pt;
      pathD += `L ${x},${y}`
    })
  })

  return pathD;
}

function pathD(shape, string) {
  // console.log(Bezier);
  const polylines = flattenPath(string, {maxError: 0.001}).map(x => x.points);
  polylines.forEach(pl => shape.push(pl));

  return shape
}

const rectangle = (w, h) => {
  const p0 = [ -w/2, h/2 ];
  const p1 = [ w/2, h/2 ];
  const p2 = [ w/2, -h/2 ];
  const p3 = [ -w/2, -h/2 ];

  return [
    [ p0, p1, p2, p3, p0 ]
  ]
}

const circle = r => {
  const n = 360/2;
  const pts = [];

  const getX = (theta, r) => r*Math.cos(theta);
  const getY = (theta, r) => r*Math.sin(theta);

  for ( let i = 0; i < n; i++) {
    const theta = Math.PI*2/n*i;
    const x = getX(theta, r);
    const y = getY(theta, r);
    pts.push( [ x, y ] );
  }

  const [ x, y ] = pts[0];
  pts.push([ x, y ]);

  return [ pts ];
}

// shape is filled path?
// shape is multiple paths

const convertPtType = (shape) => {
  return shape.map(pl => pl.map( ([ x, y ]) => ({ x, y })) );
}

export {
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
  offset2,
  outline,
  expand,
  intersect,
  difference,
  union,
  xor,
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
  bezier,
  path,
  path2,
  boolean,
  convertPtType
}
