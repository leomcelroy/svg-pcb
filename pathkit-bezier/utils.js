export function slerp(t, p0, p1, angle) {
  const factor1 = Math.sin(angle*(1-t))/Math.sin(angle);
  const factor2 = Math.sin(angle*t)/Math.sin(angle);
  return [p0[0]*factor1 + p1[0]*factor2, p0[1]*factor1 + p1[1]*factor2]
}

export function addVecs(a, b) {
  return [ a[0] + b[0], a[1] + b[1] ];
}

export function arcToCubic(start, end, center) {
  const [ x1, y1 ] = start;
  const [ x4, y4 ] = end;
  const [ xc, yc ] = center;

  const ax = x1 - xc;
  const ay = y1 - yc;
  const bx = x4 - xc;
  const by = y4 - yc;
  const q1 = ax * ax + ay * ay;
  const q2 = q1 + ax * bx + ay * by;
  const k2 = (4/3) * (Math.sqrt(2 * q1 * q2) - q2) / (ax * by - ay * bx);

  const x2 = xc + ax - k2 * ay;
  const y2 = yc + ay + k2 * ax;
  const x3 = xc + bx + k2 * by;
  const y3 = yc + by - k2 * bx;

  return [ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ], [ x4, y4 ] ];
}