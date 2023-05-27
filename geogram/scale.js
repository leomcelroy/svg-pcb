import { getPoint } from "./getPoint.js";

export const scale = (shape, scaleXY, point) => {
  if (shape.length === 0) return shape;
  if (!point) point = getPoint(shape, "cc");
  const [ x, y ] = point;

  if (typeof scaleXY === "number") scaleXY = [ scaleXY, scaleXY ];

  const [ xScale, yScale ] = scaleXY;

  const fn = p => {

    const newPoint = [
      ((p[0]-x) * xScale) + x,
      ((p[1]-y) * yScale) + y
    ];

    return newPoint;
  };

  return applyFn(shape, fn);
}

const applyFn = (shape, fn) => {
  shape.forEach((pl, i) => {
    shape[i] = pl.map(fn);
  })

  return shape;
}