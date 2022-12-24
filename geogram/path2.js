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

  return [vec[0]/mag, vec[1]/mag];
}

const slerp = (t, p0, p1, angle) => {
  const factor1 = Math.sin(angle*(1-t))/Math.sin(angle);
  const factor2 = Math.sin(angle*t)/Math.sin(angle);
  return [p0[0]*factor1 + p1[0]*factor2, p0[1]*factor1 + p1[1]*factor2]
}

function getCmdPt(cmd) {  
  if (typeof cmd[0] !== "string") {
    return cmd;
  } else if (cmd[0] === "chamfer") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (cmd[0] === "fillet") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (cmd[0] === "cubic") {
    const [ _, handle0, pt, handle1 ] = cmd;
    return pt;
  } else {
    return null;
  }
}

function getLastHandle(cmd) {  
  if (typeof cmd[0] !== "string") {
    return cmd;
  } else if (cmd[0] === "chamfer") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (cmd[0] === "fillet") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (cmd[0] === "cubic") {
    const [ _, handle0, pt, handle1 ] = cmd;
    return handle1;
  } else {
    return null;
  }
}

function arcToCubic(start, end, center) {
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

function getStartEndCenter(prevPt, pt, nextPt, radius) {
  if (radius < 0) radius = 0.00000001;


  if (overlap(pt, prevPt) || overlap(pt, nextPt) || radius === 0) return null;


  // need to find norm of bezier
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

  const midNorm = norm([
    (prevNorm[0] + nextNorm[0]),
    (prevNorm[1] + nextNorm[1])
  ]);

  const midDist = Math.sqrt(dist**2 + radius**2);

  const midPt = [
    pt[0] + midNorm[0]*midDist,
    pt[1] + midNorm[1]*midDist
  ];

  return [start, end, midPt];
    
}

function pathToCubics(cmds) {
  if (cmds.length === 0) return [ [] ];
  
  let cubics = [];

  let prevPt = getCmdPt(cmds[0]);
  let prevHandle = getLastHandle(cmds[0]);

  for (let i = 1; i < cmds.length; i++) { 
    const cmd = cmds[i];
    if (typeof cmd[0] !== "string") {
      cubics.push([prevPt, prevHandle, cmd, cmd]);
      prevPt = cmd;
      prevHandle = cmd;
    } else if (cmd[0] === "chamfer") {
      const [ _, radius, pt ] = cmd;
      const nextPt = i === cmds.length - 1 ? pt : getCmdPt(cmds[i+1]);
      
      const _pts = getStartEndCenter(prevPt, pt, nextPt, radius);
      if (_pts === null) {
        cubics.push([prevPt, prevHandle, pt, pt]);
        prevPt = pt;
        prevHandle = pt;
      } else {
        const [ start, end, center ] = _pts;
        if (i === 1) cubics.push([prevPt, prevHandle, start, start]);
        cubics.push([start, start, end, end]);
        prevPt = end;
        prevHandle = end;
      }
    } else if (cmd[0] === "fillet") {
      const [ _, radius, pt ] = cmd;
      const nextPt = i === cmds.length - 1 ? pt : getCmdPt(cmds[i+1]);
      const _pts = getStartEndCenter(prevPt, pt, nextPt, radius);
      if (_pts === null) {
        cubics.push([prevPt, prevHandle, pt, pt]);
        prevPt = pt;
        prevHandle = pt;
      } else {
        const [ start, end, center ] = _pts;
        if (i === 1) cubics.push([prevPt, prevHandle, start, start]);
        const cubic = arcToCubic(start, end, center);
        cubics.push(cubic);
        prevPt = cubic[3];
        prevHandle = cubic[3];
      }
    } else if (cmd[0] === "cubic") {
      const [ _, handle0, pt, handle1 ] = cmd;      
      cubics.push([prevPt, prevHandle, handle0, pt]);
      prevPt = pt;
      prevHandle = handle1;
    } else {
      throw new Error(`Unknown command used in path(...)`);
    }
   
  }
  

  return cubics;
}

export function path(...cmds) {
  const cubics = pathToCubics(cmds);
  const pts = [];

  cubics.forEach( (cubic, i) => {
    // if (i === 0) pts.push(cubic[0]);
    // pts.push(...bezier(cubic).slice(1));
    pts.push(...bezier(cubic));
  })

  return pts;
}


// bezier

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

function bezier(ps) {
  const pts = [];
  for (let t = 0; t <= 1; t += 1/64 ) {
    const pt = deCasteljau(t, ps);
    pts.push(pt);
  }

  return pts;
}
