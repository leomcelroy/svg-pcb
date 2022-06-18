import { transform } from "./transform.js";
import { offset } from "./offset.js";
import { union } from "./union.js";
import { intersect } from "./intersect.js";
import { difference } from "./difference.js";
import { xor } from "./xor.js";
import { flattenPath } from "./libs/path-to-points.js";



// helpers below

const isEmpty = shape => {
  if (shape.length === 0) throw new Error(`Shape must have at least one pt.`);
}

function getLastPl(shape) {
  isEmpty(shape);
  return shape.at(-1);
}

function getLastPt(shape) {
  isEmpty(shape);
  return shape.at(-1).at(-1);
}

function getPt(shape, i) {
  isEmpty(shape);
  return shape.flat().at(i);
}

function getAngle(shape) {
  const pl = getLastPl(shape);
  if (pl.length < 2) return 0;

  const lastPoint = pl.at(-1);
  const secondLastPoint = pl.at(-2);

  const x = lastPoint.x - secondLastPoint.x;
  const y = lastPoint.y - secondLastPoint.y;

  return Math.atan2(y, x) * 180 / Math.PI;
}

const degreesToRad = deg => (deg / 180) * Math.PI;

const addPt = (shape, pt) => {
  shape.at(-1).push(pt);
  return shape;
}

const applyFn = (shape, fn) => {
  shape.forEach((pl, i) => {
    shape[i] = pl.map(fn);
  })

  return shape;
}

const pointConversion = (point) => {
  if (Array.isArray(point)) return { x: point[0], y: point[1] };
  else return point;
}

// helpers above

const turnForward = (shape, theta, distance) => {
  // guard statement
  // if distance is zero then we just get stacked points so let's just not
  if (distance === 0) return shape;

  const lastPoint = getLastPt(shape);
  const angle = getAngle(shape)+theta;
  const xCos = Math.cos(degreesToRad(angle));
  const ySin = Math.sin(degreesToRad(angle));
  const x = lastPoint.x + distance * xCos;
  const y = lastPoint.y + distance * ySin;

  shape.at(-1).push({ x, y });

  return shape;
}

const vec = (shape, [dx, dy] ) => {
  const { x, y } = getLastPt(shape);
  shape.at(-1).push({ x: x+dx, y: y+dy });
  return shape;
}

const close = (shape, ) => {
  isEmpty(shape);
  const { x, y } = shape[0][0];
  shape.at(-1).push({ x, y });
  return shape;
}

const translate = (shape, toPoint, fromPoint = { x: 0, y: 0 } ) => {
  toPoint = pointConversion(toPoint);
  fromPoint = pointConversion(fromPoint);

  const {x: x0, y: y0 } = fromPoint;
  const {x: x1, y: y1 } = toPoint;
  const x = x1 - x0;
  const y = y1 - y0;

  const fn = point => ({
    x: point.x + x,
    y: point.y + y
  })
  
  return applyFn(shape, fn);
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

const rotate = (shape, angle, point) => {
  if (!point) point = getPoint(shape, "cc");
  point = pointConversion(point);
  
  const fn = p => {

    let delta = angle / 180 * Math.PI;

    let hereX = p.x - point.x;
    let hereY = p.y - point.y;

    let newPoint = {
      x: hereX * Math.cos(delta) - hereY * Math.sin(delta) + point.x,
      y: hereY * Math.cos(delta) + hereX * Math.sin(delta) + point.y
    };

    return newPoint;
  }


  return applyFn(shape, fn);
}

const scale = (shape, scaleXY, point) => {
  if (!point) point = getPoint(shape, "cc");
  const { x, y } = pointConversion(point);

  if (typeof scaleXY === "number") scaleXY = [ scaleXY, scaleXY ];

  const [ xScale, yScale ] = scaleXY;

  const fn = p => {

    const newPoint = {
      x: ((p.x-x) * xScale) + x,
      y: ((p.y-y) * yScale) + y
    };

    return newPoint;
  };

  return applyFn(shape, fn);
}

const copy = (shape, ) => JSON.parse(JSON.stringify(shape));

const extrema = (shape) => () => {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  shape.flat().forEach(p => {
    if (xMin > p.x) xMin = p.x;
    if (xMax < p.x) xMax = p.x;
    if (yMin > p.y) yMin = p.y;
    if (yMax < p.y) yMax = p.y;
  });

  return {
    xMin,
    xMax,
    yMin,
    yMax
  };
}

const width = (shape, ) => {
  const { xMin, xMax } = extrema(shape)();

  return xMax - xMin;
}

const height = (shape, ) => {
  const { yMin, yMax } = extrema(shape)();

  return yMax - yMin;
}

const getPoint = (shape, target) => {
  isEmpty(shape);
  if (target === "start") return shape[0][0];
  else if (target === "end") return shape.at(-1).at(-1);

  let {
    xMax,
    xMin,
    yMax,
    yMin
  } = extrema(shape)();

  let middX = (xMax + xMin) / 2;
  let middY = (yMax + yMin) / 2;

  if (target === "cc") return { x: middX, y: middY };
  else if (target === "lb") return { x: xMin, y: yMin };
  else if (target === "rt") return { x: xMax, y: yMax };
  else if (target === "lc") return {
    x: xMin,
    y: middY
  };
  else if (target === "lt") return {
    x: xMin,
    y: yMax
  };
  else if (target === "cb") return {
    x: middX,
    y: yMin
  };
  else if (target === "ct") return {
    x: middX,
    y: yMax
  };
  else if (target === "rb") return {
    x: xMax,
    y: yMin
  };
  else if (target === "rc") return {
    x: xMax,
    y: middY
  };

  // interesting that "origin" is the url
  else throw "\"" + target + "\"" + ` is not an origin point. "right" or "left" come first then "bottom" or "top"`
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
  console.log(start, end);
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

const slerp = (t, p0, p1, angle) => {
  const factor1 = Math.sin(angle*(1-t))/Math.sin(angle);
  const factor2 = Math.sin(angle*t)/Math.sin(angle);
  return {
    x: p0.x*factor1 + p1.x*factor2, 
    y: p0.y*factor1 + p1.y*factor2
  }
}

const chord = (r, theta) => 2 * r * Math.sin(theta*Math.PI/360)
const arcPtHelper = (curAngle, curPoint, distance) => {
  const xCos = Math.cos(curAngle*Math.PI/180);
  const ySin = Math.sin(curAngle*Math.PI/180);
  const x = curPoint.x + distance * xCos;
  const y = curPoint.y + distance * ySin;

  return { x, y };
}

const arc = (shape, angle, radius) => {
  isEmpty(shape);
  // if (angle < 0) radius = -radius;
  // const endPoint = shape.at(-1).at(-1);
  // const ogAngle = getAngle(shape);
  // const res = Math.abs(Math.floor(angle/2));
  // for (let i = 0; i < res; i++) {
  //   const ang = (180 - (360-angle/res*(i+1))/2 + ogAngle);
  //   const pt = arcPtHelper(ang, endPoint, chord(radius, angle/res*(i+1)));
  //   goTo(shape, pt);
  // }

  // const curAngle = getAngle(shape);

  // // last line has to match intended angle
  // turnForward(shape, (angle+ogAngle)-curAngle, radius/10000);
  // // console.log(ogAngle, angle, getAngle(shape));

  // return shape;

  const theta = Math.abs(angle);
  
  const length = radius*theta/180*Math.PI;

  const ogAngle = getAngle(shape);
  // console.log("ogAngle", )
  const thetaStep = 1;
  const steps = theta/thetaStep;
  const distanceStep = length/steps;

  for (let i = 0; i < steps; i++) {
    turnForward(shape, thetaStep, distanceStep);
  }

  // const curAngle = getAngle(shape);
  // turnForward(shape, (angle+ogAngle)-curAngle, radius/10000);
  // console.log(ogAngle, angle, curAngle);

  return shape;
} 

const getPathData = shape => {
  let pathD = "";
  shape.forEach(pl => {
    const { x, y } = pl[0];
    pathD += `M ${x},${-y}`
    pl.slice(1).forEach(pt => {
      const { x, y } = pt;
      pathD += `L ${x},${-y}`
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

const gramify = shape => ({
  turnForward: (a, d) => turnForward(shape, a, d),
  translate: (p0, p1) => translate(shape, p0, p1),
  shape: () => shape,
})

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
  pathD
}