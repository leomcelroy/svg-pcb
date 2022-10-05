const overlap = (p1, p2) => length(p1, p2) < 0.000001;
const length = ([x1, y1], [x2, y2]) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);
const magDiff = (p0, p1) => Math.sqrt(
  (p1[0] - p0[0])**2 +
  (p1[1] - p0[1])**2
)
const normDiff = (p0, p1) => {
  const m = magDiff(p0, p1);

  return [ (p1[0] - p0[0])/m, (p1[1] - p0[1])/m ];
}

const norm = vec => {
  const mag = Math.sqrt(vec[0]**2 + vec[1]**2);

  return [ vec[0]/mag, vec[1]/mag ];
}

const slerp = (t, p0, p1, angle) => {
  const factor1 = Math.sin(angle*(1-t))/Math.sin(angle);
  const factor2 = Math.sin(angle*t)/Math.sin(angle);
  return [p0[0]*factor1 + p1[0]*factor2, p0[1]*factor1 + p1[1]*factor2]
}

export function fillet(shape, index, radius) {

  let [ _, radius, pt ] = cmd;

  if (radius < 0) radius = 0.00000001;

  if (prevPt && nextPt) return;
  if (overlap(pt, prevPt) || overlap(pt, nextPt)) return;

  const prevNorm = normDiff(pt, prevPt);
  const nextNorm = normDiff(pt, nextPt);

  const angle = Math.acos(
    (prevNorm[0] * nextNorm[0]) +
    (prevNorm[1] * nextNorm[1])
  )

  let dist = radius/Math.tan(angle/2);

  const maxStartDist = length(prevPt, pt);
  const maxEndDist = length(nextPt, pt);

  dist = Math.min(maxStartDist, maxEndDist, dist);
  radius = Math.min(dist*Math.tan(angle/2), radius);

  const start = [
    pt[0] + prevNorm[0]*dist,
    pt[1] + prevNorm[1]*dist
  ]

  const end = [
    pt[0] + nextNorm[0]*dist,
    pt[1] + nextNorm[1]*dist,
  ]

  const newPts = [];
  // newPts.push(start);

  const midNorm = norm([
    (prevNorm[0] + nextNorm[0]),
    (prevNorm[1] + nextNorm[1])
  ]);

  const midDist = Math.sqrt(dist**2 + radius**2);

  const midPt = [
    pt[0] + midNorm[0]*midDist,
    pt[1] + midNorm[1]*midDist
  ];

  const aStart = Math.atan2(
    start[0] - midPt[0],
    start[1] - midPt[1],
  )

  const arcAngle = Math.PI - angle;

  const startMid = [
    start[0] - midPt[0],
    start[1] - midPt[1]
  ]

  const endMid = [
    end[0] - midPt[0],
    end[1] - midPt[1]
  ]

  for (let i = 1/20; i < 1; i += 1/20) {
    const [ x, y ] = slerp(i, startMid, endMid, arcAngle)

    let pt = [
      midPt[0] + x,
      midPt[1] + y
    ]

    newPts.push(pt);
  }


  // newPts.push(end);
  pts.push(...newPts);
}
