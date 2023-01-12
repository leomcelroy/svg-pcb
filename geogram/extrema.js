
export const extrema = shape => {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  shape.flat().forEach(p => {
    const [ x, y ] = p;
    
    if (xMin > x) xMin = x;
    if (xMax < x) xMax = x;
    if (yMin > y) yMin = y;
    if (yMax < y) yMax = y;
  });

  return {
    xMin,
    xMax,
    yMin,
    yMax
  };
}