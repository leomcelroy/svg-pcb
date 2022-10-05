import { getPoint } from "./getPoint.js";

export const scale = (shape, scaleXY, point) => {
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