export const translate = (shape, toPoint, fromPoint = [ 0, 0 ] ) => {

  const [ x0, y0 ] = fromPoint;
  const [ x1, y1 ] = toPoint;
  const x = x1 - x0;
  const y = y1 - y0;

  const fn = point => [
    point[0] + x,
    point[1] + y
  ]
  
  return applyFn(shape, fn);
}

const applyFn = (shape, fn) => {
  shape.forEach((pl, i) => {
    shape[i] = pl.map(fn);
  })

  return shape;
}
