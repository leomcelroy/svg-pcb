import { translate } from "./translate.js";
import { rotate } from "./rotate.js";
import { turnForward } from "./turnForward.js";

function getAngle(shape) {
  const pl = shape.at(-1);
  if (pl.length < 2) return 0;

  const lastPoint = pl.at(-1);
  const secondLastPoint = pl.at(-2);

  const x = lastPoint.x - secondLastPoint.x;
  const y = lastPoint.y - secondLastPoint.y;

  return Math.atan2(y, x) * 180 / Math.PI;
}

export const arc = (shape, angle, radius) => {
  if (shape.length === 0) shape.push([{ x: 0, y:0 }]);

  // --- ATTEMPT 1 ---

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

  // --- ATTEMPT 2 ---

  // const theta = Math.abs(angle);
  
  // const length = radius*theta/180*Math.PI;

  // const ogAngle = getAngle(shape);
  // // console.log("ogAngle", )
  // const thetaStep = 1;
  // const steps = theta/thetaStep;
  // const distanceStep = length/steps;

  // for (let i = 0; i < steps; i++) {
  //   turnForward(shape, thetaStep, distanceStep);
  // }

  // const curAngle = getAngle(shape);
  // turnForward(shape, (angle+ogAngle)-curAngle, radius/10000);
  // console.log(ogAngle, angle, curAngle);

  // return shape;

  // --- ATTEMPT 3 ---

  const n = 32;
  const pts = [ [] ];
  const a = angle/180*Math.PI;
  const lp = shape.at(-1).at(-1);
  const la = getAngle(shape);

  const getX = (theta, r) => r*Math.cos(theta);
  const getY = (theta, r) => r*Math.sin(theta);

  for ( let i = 0; i <= n; i++) {
    const theta = a/n*i;
    const x = getX(theta, radius);
    const y = getY(theta, radius);
    pts[0].push({ x, y });
  }

  translate(pts, lp, pts[0][0])
  rotate(pts, la-90, pts[0][0])

  pts[0].slice(1).forEach(pt => shape.at(-1).push(pt));
  const curAngle = getAngle(shape);
  turnForward(shape, (angle+la)-curAngle, radius/1_000_000_000_000);

  console.log("arc pts", pts);

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