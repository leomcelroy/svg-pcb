const lerp = (t, p1, p2) => [
  (1 - t) * p1[0] + t * p2[0],
  (1 - t) * p1[1] + t * p2[1],
]

const reduce = (t, p1, p2, ...ps) => ps.length > 0
    ? [lerp(t, p1, p2), ...reduce(t, p2, ...ps)]
    : [lerp(t, p1, p2)];

const deCasteljau = (t, ps) => ps.length > 1
    ? deCasteljau(t, reduce(t, ...ps))
    : ps[0];

export function cubicsToPts(ps, resolution) {
  // if it's just a line skip the interpolation 
  if (overlap(ps[0], ps[1]) && overlap(ps[2], ps[3])) return [ ps[0], ps[3] ];

  const pts = [];
  for (let t = 0; t <= 1*resolution; t += 1 ) {
    const pt = deCasteljau(t/resolution, ps);
    pts.push(pt);
  }

  return pts;
}