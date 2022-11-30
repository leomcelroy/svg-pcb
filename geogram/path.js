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

function getWirePt(cmd) {  
  if (typeof cmd[0] !== "string") {
    return cmd;
  } else if (cmd[0] === "chamfer") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (cmd[0] === "fillet") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (cmd[0] === "bezier") {
    throw "Can't begin wire with bezier.";
  } else {
    return null;
  }
}

function mergeHandles(cmds) {
  const mergedCmds = [];
  let i = 0;
  let lastCmdHandles = false;
  cmds.forEach(cmd => {
    if (cmd[0] === "bezier" && lastCmdHandles === true) {
      mergedCmds.at(-1).push(...cmd.slice(1));
    } else {
      mergedCmds.push(cmd);
      lastCmdHandles = false;
    }

    if (cmd[0] === "bezier") lastCmdHandles = true;
  })

  return mergedCmds;
}

export function path(cmds) {
  if (cmds.length === 0) return [ [] ];
  
  cmds = mergeHandles(cmds);

  let prevPt = getWirePt(cmds[0]);
  const pts = [ prevPt ];

  for (let i = 1; i < cmds.length; i++) {
    const cmd = cmds[i];

    let nextPt = null;
    let j = i + 1;
    let nextCmd = cmds[j];
    while (nextCmd && nextCmd[0] !== "bezier") {
      nextPt = getWirePt(nextCmd);
      if (nextPt !== null) break;
      j++;
      nextCmd = cmds[j];
    }

    if (typeof cmd[0] !== "string") {
      if (overlap(cmd, prevPt)) continue;

      pts.push(cmd);

      prevPt = cmd;
    } else if (cmd[0] === "chamfer") {
      const [ _, dist, pt ] = cmd;

      if (prevPt && nextPt) {
        if (overlap(pt, prevPt) || overlap(pt, nextPt)) continue;

        const [ dist0, dist1 ] = (Array.isArray(dist))
          ? dist
          : [dist, dist];

        const prevNorm = normDiff(pt, prevPt);

        const newPt0 = [
          pt[0] + prevNorm[0]*dist0,
          pt[1] + prevNorm[1]*dist0
        ]

        const nextNorm = normDiff(pt, nextPt);

        const newPt1 = [
          pt[0] + nextNorm[0]*dist1,
          pt[1] + nextNorm[1]*dist1
        ]

        pts.push(newPt0);
        pts.push(newPt1);

      } else {
        throw "Chamfering requires previous and next points."
      }

      prevPt = pts.at(-1);
    } else if (cmd[0] === "fillet") {
      let [ _, radius, pt ] = cmd;

      if (radius < 0) radius = 0.00000001;

      if (prevPt && nextPt) {
        if (overlap(pt, prevPt) || overlap(pt, nextPt)) continue;

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
      } else {
        throw "Filleting requires previous and next points."
      }

      prevPt = pts.at(-1);
    } else if (cmd[0] === "bezier") {
      const [ _, ...controlPts ] = cmd;

      if (prevPt && nextPt) {
        let bezierPts = bezier([ prevPt, ...controlPts, nextPt ])
        bezierPts = bezierPts.slice(1, -1);
        if (bezierPts.length > 0) pts.push(...bezierPts);
      } else {
        throw "Beziers requires previous and next points."
      }

      prevPt = pts.at(-1);
    }

  }

  // TODO: remove overlapping

  return [ pts ];
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
