const lerp = (t, p1, p2) => [
  (1 - t) * p1.x + t * p2.x,
  (1 - t) * p1.y + t * p2.y,
];

// Example: reduce(0.5, ...[0.0, 1.0, 2.0, 3.0]) == [0.5, 1.5, 2.5]
const reduce = (t, p1, p2, ...ps) => ps.length > 0
    ? [lerp(t, p1, p2), ...reduce(t, p2, ...ps)]
    : [lerp(t, p1, p2)];

// Example: deCasteljau(0.5, [0.0, 1.0, 2.0, 3.0]) == 1.5
const deCasteljau = (t, ps) => ps.length > 1
    ? deCasteljau(t, reduce(t, ...ps))
    : ps[0];

const pointConversion = (point) => {
  if (Array.isArray(point)) return { x: point[0], y: point[1] };
  else return point;
}

export function bezier(shape, ...ps) {
  ps = ps.map(pointConversion);
  if (shape.length < 0) shape = [[ [ 0, 0 ] ]];
  const prevPt = shape.at(-1).at(-1);
  ps = [ prevPt, ...ps ];

  const pts = [];
  for (let t = 0; t <= 1; t += 1/32 ) {
    const pt = deCasteljau(t, ps);
    pts.push(pt);
  }

  pts.forEach(pt => shape.at(-1).push(pt));
  
  return shape;
}