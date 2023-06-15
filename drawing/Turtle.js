import { flattenSVG } from "flatten-svg";

export class Turtle {
  constructor(start = { 0: 0, 1: 1, x: 0, y: 0 }) {
    this.drawing = true;
    this.location = start;
    this.angle = 0;
    this.path = [
      [start]
    ];
    
    this.size = 1;
    this.color = "black";
  }

  up() {
    this.drawing = false;
    this.path.push([{...this.location}])
    return this;
  }

  down() {
    this.drawing = true;
    return this;
  }

  goTo(x, y) {

    const lastPath = this.path.at(-1);
    if (this.drawing) {
      lastPath.push({0: x, 1: y, x, y});
    } else {
      if (lastPath.length === 1) lastPath[0] = { 0:x, 1:y, x, y};
    }

    this.location = { 0:x, 1:y, x, y };
    
    return this;
  }

  forward(distance) {
    const last = this.location;
    const a = this.angle/180 * Math.PI;
    const x = last.x + distance * Math.cos(a);
    const y = last.y + distance * Math.sin(a);

    this.goTo(x, y);

    return this;
  }

  arc(angle, radius) {
    const theta = Math.abs(angle);
    
    const length = radius*theta/180*Math.PI;

    const ogAngle = this.angle;
    const thetaStep = 1;
    const steps = theta/thetaStep;
    const distanceStep = length/steps;

    for (let i = 0; i < steps; i++) {
      if (angle >= 0) this.right(thetaStep);
      else this.left(thetaStep);

      this.forward(distanceStep);
    }

    this.setAngle(ogAngle + angle);

    return this;
  }

  setAngle(theta) {
    this.angle = theta;

    return this;
  }

  right(theta) {
    this.angle -= theta;

    return this;
  }

  left(theta) {
    this.angle += theta;

    return this;
  }

  translate(x, y, origin) {
    iteratePath(this, pt => {
      const newPt = translate(pt, x, y, origin);
      pt.x = newPt.x;
      pt.y = newPt.y;
    })
  }

  rotate(angle, origin) {
    if (!origin) origin = getCenter(this.path.flat());

    iteratePath(this, pt => {
      const newPt = rotate(pt, angle, origin);
      pt.x = newPt.x;
      pt.y = newPt.y;
    })
  }

  scale(factor, origin) {
    if (!origin) origin = getCenter(this.path.flat());

    iteratePath(this, pt => {
      const newPt = scale(pt, factor, origin);
      pt.x = newPt.x;
      pt.y = newPt.y;
    })
  }

  fromSVG(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.querySelector("svg");
    const pls = flattenSVG(svg, { maxError: 0.001 });

    pls.forEach(pl => {
      this.up();
      pl.points.forEach((pt, i) => {
        this.goTo(pt.x, pt.y);
        if (i === 0) this.down();
      })
    })

    return this;
  }

  extrema() {
    return extrema(this.path.flat());
  }

  get width() {
    const { xMin, xMax } = this.extrema();

    return xMax - xMin;
  }

  get height() {
    const { yMin, yMax } = this.extrema();

    return yMax - yMin;
  }

  get start() {
    
    const pt = this.path.at(0).at(0);

    return [ pt.x, pt.y ];
  }

  get end() {
    const pt = this.path.at(-1).at(-1);

    return [ pt.x, pt.y ];
  }

  applyPts(fn) {
    return applyPts(this, fn);
  }
}

function iteratePath(turtle, fn) {
  const path = turtle.path;

  path.flat().forEach(fn);
}

function convertPt(pt) {
  if (Array.isArray(pt)) {
    return { x: pt[0], y: pt[1] }
  } else {
    return pt;
  }
}

function translate(pt, x, y, origin = { x: 0, y: 0 }) {
  origin = convertPt(origin);

  return {
    x: pt.x + x - origin.x,
    y: pt.y + y - origin.y
  };
}


function rotate(pt, angle, origin) {
  pt = convertPt(pt);
  origin = convertPt(origin);

  let delta = (angle / 180) * Math.PI;

  let hereX = pt.x - origin.x;
  let hereY = pt.y - origin.y;

  let newPoint = {
    x: hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin.x,
    y: hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin.y,
  };

  return newPoint;
}

function scale(pt, factor, origin) {
  pt = convertPt(pt);
  origin = convertPt(origin);

  if (typeof factor === "number") factor = [ factor, factor ];
  const [ xFactor, yFactor ] = factor;
  const  { x, y } = origin;
  const newPoint = {
    x: (pt.x - x) * xFactor + x, 
    y: (pt.y - y) * yFactor + y
  };

  return newPoint;
}

function getCenter(pts) {
  const { xMax, xMin, yMax, yMin } = extrema(pts);

  let x = (xMax + xMin) / 2;
  let y = (yMax + yMin) / 2;

  return { x, y };
}

function extrema(pts) {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  pts.forEach((p) => {
    const  { x, y } = p;

    if (xMin > x) xMin = x;
    if (xMax < x) xMax = x;
    if (yMin > y) yMin = y;
    if (yMax < y) yMax = y;
  });

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
}




function applyPts(turtle, fn) {
  for (let i = 0; i < turtle.path.length; i++) {
    const pl = turtle.path[i];
    for (let j = 0; j < pl.length; j++) {
      const pt = pl[j];
      pl[j] = fn(pt);
    }
  }

  return turtle;
}

