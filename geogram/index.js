import { transform } from "./transform.js";
import { offset } from "./offset.js";
import { union } from "./union.js";
import { intersect } from "./intersect.js";
import { difference } from "./difference.js";
import { xor } from "./xor.js";
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
import { ClipperLib } from "./libs/clipper_unminified.js";


const overlap = (p0, p1) => 0.00000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);
const isClosed = shape => {
  if (shape.length === 0) return true;
  const start = shape[0][0];
  const end = shape.at(-1).at(-1);
  const closed = overlap(start, end);
  return closed;
}

function boolean(subjectPaths, clipPaths, type) {

  const toClipperFormat = pl => pl.map( 
    ({ x, y }) => ({ X:x, Y:y }) 
  )

  const fromClipperFormat = pl => pl.map( 
    ({ X, Y }) => ({ x:X, y:Y }) 
  )

  const subjectClosed = true;
  const clipClosed = true;

  const tempSubjectPaths = subjectPaths.map(toClipperFormat);
  clipPaths = clipPaths.map(toClipperFormat);

  const result = new ClipperLib.Paths();
  const clipper = new ClipperLib.Clipper();

  clipper.AddPaths(tempSubjectPaths, ClipperLib.PolyType.ptSubject, subjectClosed);
  clipper.AddPaths(clipPaths, ClipperLib.PolyType.ptClip, clipClosed);

  const clipTypes = {
    "intersection": ClipperLib.ClipType.ctIntersection,
    "union": ClipperLib.ClipType.ctUnion,
    "difference": ClipperLib.ClipType.ctDifference,
    "xor": ClipperLib.ClipType.ctXor,
  }
  clipper.Execute(clipTypes[type], result);

  const final = result.map(fromClipperFormat);

  while (subjectPaths.length > final.length) subjectPaths.pop();

  final.forEach((pl, i) =>  {
    subjectPaths[i] = pl;

    subjectPaths[i].push({
      x: pl[0].x,
      y: pl[0].y,
    })
    
  });

  return subjectPaths;
}

function offset2(paths, delta, ops = {}) {
  /*
    {
      joinType
      endType
      miterLimit
      arcTolerance
    }
  */

  const endTypes = {
    openSquare: 0,
    openRound: 1,
    openButt: 2,
    closedLine: 3,
    closedPolygon: 4
  }

  const joinTypes = {
    square: 0,
    round: 1,
    miter: 2
  }

  const et = ops.endType;
  if (!(et in endTypes)) et = "closedPolygon";

  const jt = ops.joinType || "round";
  if (!(jt in joinTypes)) jt = "round";

  const miterLimit = ops.miterLimit || 2;
  const arcTolerance = ops.arcTolerance || 0.1;

  const endType = endTypes[et];
  const joinType = joinTypes[jt];

  const toClipperFormat = pl => pl.map( 
    ({ x, y }) => ({ X:x, Y:y }) 
  )

  const fromClipperFormat = pl => pl.map( 
    ({ X, Y }) => ({ x:X, y:Y }) 
  )

  const subjectClosed = isClosed(paths);
  const clipPaths = paths.map(toClipperFormat);
  const co = new ClipperLib.ClipperOffset(miterLimit, arcTolerance);
  
  co.AddPaths(clipPaths, joinType, endType);
  const result = new ClipperLib.Paths();
  co.Execute(result, delta);

  const final = result.map(fromClipperFormat);

  while (paths.length > final.length) paths.pop();

  final.forEach((pl, i) =>  {
    paths[i] = pl;

    paths[i].push({
      x: pl[0].x,
      y: pl[0].y,
    })
    
  });

  return paths;
}


function getAngle(shape) {
  if (shape.length === 0) throw new Error(`Shape must have at least one pt.`);

  const pl = shape.at(-1);
  if (pl.length < 2) return 0;

  const lastPoint = pl.at(-1);
  const secondLastPoint = pl.at(-2);

  const x = lastPoint.x - secondLastPoint.x;
  const y = lastPoint.y - secondLastPoint.y;

  return Math.atan2(y, x) * 180 / Math.PI;
}

const vec = (shape, [dx, dy] ) => {
  if (shape.length === 0) shape.push([ {x:0, y:0} ]);
  const { x, y } = shape.at(-1).at(-1);
  shape.at(-1).push({ x: x+dx, y: y+dy });
  return shape;
}

const close = (shape, ) => {
  if (shape.length === 0) throw new Error(`Shape must have at least one pt.`);

  const { x, y } = shape[0][0];
  shape.at(-1).push({ x, y });
  return shape;
}

const centroid = shape => { // BUG: vec messes up centroid calculation
   const pts = shape.flat();
   if (pts.length === 1) return pts[0];
   else if (pts.length === 2) return { 
      x: (pts[0].x + pts[1].x)/2, 
      y: (pts[0].y + pts[1].y)/2
   }
   // if this is line then I should return midpoint;
   var first = pts[0], last = pts[pts.length-1];
   if (first.x != last.x || first.y != last.y) pts.push(first);
   var twicearea=0,
   x=0, y=0,
   nPts = pts.length,
   p1, p2, f;
   for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
      p1 = pts[i]; p2 = pts[j];
      f = p1.x*p2.y - p2.x*p1.y;
      twicearea += f;          
      x += ( p1.x + p2.x ) * f;
      y += ( p1.y + p2.y ) * f;
   }
   f = twicearea * 3;
   return { x:x/f, y:y/f };
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
  return translate([0, 0], cc);
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
  const overlap = (p0, p1) => 0.00000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);
  const start = shape[0][0];
  const end = shape.at(-1).at(-1);
  console.log("thicken", start, end, overlap(start, end));
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
    const { x, y } = pl[0];
    pathD += `M ${x},${y}`
    pl.slice(1).forEach(pt => {
      const { x, y } = pt;
      pathD += `L ${x},${y}`
    })
  })

  return pathD;
}

function pathD(shape, string) {
  // console.log(Bezier);
  const polylines = flattenPath(string, {maxError: 0.001}).map(x => x.points);
  polylines.forEach(pl => {
    shape.push(pl.map((point, i) => ({ x: point[0], y: point[1] }) ));
  })

  return shape
}

const rectangle = (w, h) => {
  const p0 = { x: -w/2, y: h/2 };
  const p1 = { x: w/2, y: h/2 };
  const p2 = { x: w/2, y: -h/2 };
  const p3 = { x: -w/2, y: -h/2 };

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
    pts.push({ x, y });
  }

  const { x, y } = pts[0];
  pts.push({ x, y });

  return [ pts ];
}

class Gram {
  constructor(shape) {
    this.shape = shape;
  }

  turnForward() { 
    turnForward(this.shape, ...arguments); 
    return this;
  };

  vec() { 
    vec(this.shape, ...arguments); 
    return this;
  };

  close() { 
    close(this.shape, ...arguments); 
    return this;
  };

  translate() { 
    translate(this.shape, ...arguments); 
    return this;
  };

  rotate() { 
    rotate(this.shape, ...arguments); 
    return this;
  };

  scale() { 
    scale(this.shape, ...arguments); 
    return this;
  };

  originate() { 
    originate(this.shape, ...arguments); 
    return this;
  };

  goTo() { 
    goTo(this.shape, ...arguments); 
    return this;
  };

  reverse() { 
    reverse(this.shape, ...arguments); 
    return this;
  };

  thicken() { 
    thicken(this.shape, ...arguments); 
    return this;
  };

  copyPaste() { 
    copyPaste(this.shape, ...arguments); 
    return this;
  };

  offset() { 
    offset(this.shape, ...arguments); 
    return this;
  };

  outline() { 
    outline(this.shape, ...arguments); 
    return this;
  };

  expand() { 
    expand(this.shape, ...arguments); 
    return this;
  };

  intersect() { 
    intersect(this.shape, ...arguments); 
    return this;
  };

  difference() { 
    difference(this.shape, ...arguments); 
    return this;
  };

  union() { 
    union(this.shape, ...arguments); 
    return this;
  };

  xor() { 
    xor(this.shape, ...arguments); 
    return this;
  };

  pathD() { 
    pathD(this.shape, ...arguments); 
    return this;
  };

  arc() { 
    arc(this.shape, ...arguments); 
    return this;
  };

  bezier() { 
    bezier(this.shape, ...arguments); 
    return this;
  };

  getAngle() { 
    return getAngle(this.shape, ...arguments); 
  };

  getPathData() { 
    return getPathData(this.shape, ...arguments); 
  };

  extrema() { 
    extrema(this.shape, ...arguments); 
    return this;
  };

  getPoint() { 
    getPoint(this.shape, ...arguments); 
    return this;
  };

  get lt() { 
    point(this.shape, "lt"); 
    return this;
  };

  get lc() { 
    point(this.shape, "lc"); 
    return this;
  };

  get lb() { 
    point(this.shape, "lb"); 
    return this;
  };

  get ct() { 
    point(this.shape, "ct"); 
    return this;
  };

  get cc() { 
    point(this.shape, "cc"); 
    return this;
  };

  get cb() { 
    point(this.shape, "cb"); 
    return this;
  };

  get rt() { 
    point(this.shape, "rt"); 
    return this;
  };

  get rc() { 
    point(this.shape, "rc"); 
    return this;
  };

  get rb() { 
    point(this.shape, "rb"); 
    return this;
  };

  get centroid() { 
    return centroid(this.shape, ...arguments); 
  };

  get width() { 
    return width(this.shape, ...arguments); 
  };

  get height() { 
    return height(this.shape, ...arguments); 
  };

};


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
  offset2,
  boolean,
  Gram
}
