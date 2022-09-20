export const translate = (shape, toPoint, fromPoint = { x: 0, y: 0 } ) => {
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