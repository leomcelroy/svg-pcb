import { getPoint } from "./getPoint.js";

export const rotate = (shape, angle, point) => {
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

const pointConversion = (point) => {
  if (Array.isArray(point)) return { x: point[0], y: point[1] };
  else return point;
}

const applyFn = (shape, fn) => {
  shape.forEach((pl, i) => {
    shape[i] = pl.map(fn);
  })

  return shape;
}
