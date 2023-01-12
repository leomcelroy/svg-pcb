import { getPoint } from "./getPoint.js";

export const rotate = (shape, angle, point) => {
  if (!point) point = getPoint(shape, "cc");

  const fn = p => {

    let delta = angle / 180 * Math.PI;

    let hereX = p[0] - point[0];
    let hereY = p[1] - point[1];

    let newPoint = [
      hereX * Math.cos(delta) - hereY * Math.sin(delta) + point[0],
      hereY * Math.cos(delta) + hereX * Math.sin(delta) + point[1]
    ];

    return newPoint;
  }


  return applyFn(shape, fn);
}


const applyFn = (shape, fn) => {
  shape.forEach((pl, i) => {
    shape[i] = pl.map(fn);
  })

  return shape;
}
