

export function path(cmds) {

  const result = {
    path: [],
    filletsAndChamfers: [],
    nextHandle: null
  }

  for (let i = 0; i < cmds.length; i++) { 
    const cmd = cmds[i];
    const type = getCmdType(cmd);
    if (type in cmdTypes) cmdTypes[type](cmd, result, i);
    else console.log("unknown command in path:", cmd);
  }
  
  return result;
}

const cmdTypes = {
  point(cmd, { path }) {
    path.push(cmd);
  },
  fillet: filletOrChamfer,
  chamfer: filletOrChamfer,
  cubic(cmd, result) {
    const [ _, handle0, pt, handle1 ] = cmd;  
    const h0 = 
      result.nextHandle === null && path.length > 0 
        ? getPathPt(result.path.at(-1)) 
      : result.nextHandle === null && path.length === 0
        ? [0, 0]
        : result.nextHandle;

    result.path.push([ h0, handle0, pt ]);
    result.nextHandle = handle1;
  },
  relative: relativeOrTurnForward,
  turnForward: relativeOrTurnForward
}

function filletOrChamfer(cmd, result, index) {
  const [ type, radius, filletCmd ] = cmd;

  // acceptedFilletTypes = "point", "relative", "turnForward"

  const pt = getCmdPt(filletCmd, path);
  const info = {
    radius, 
    index: i,
    type
  }

  result.path.push(pt);
  result.filletsAndChamfers.push(info);
  result.nextHandle = null;
}

function relativeOrTurnForward(cmd, result) {
  const pt = getCmdPt(cmd, result.path);  
  result.path.push(pt);
  result.nextHandle = null;
}

function getCmdType(cmd) {  
  return typeof cmd[0] !== "string" ? "point" : cmd[0];
}

function getPathPt(pathItem) {
  if (pathItem.length === 2) return pathItem;
  else if (pathItem.length === 3) return pathItem.at(-1);
}

function getCmdPt(cmd, path) { 
  const type = getCmdType(cmd);

  let lastPt, secondLastPt;
  if (path.length === 0) {
    lastPt = [0, 0];
    secondLastPt = [0, 0];
  } else if (path.length === 1) {
    lastPt = getPathPt(path.at(-1));
    secondLastPt = [...lastPt];
  } else {
    lastPt = getPathPt(path.at(-1));
    secondLastPt = getPathPt(path.at(-2));
  }

  if (type === "point") {
    return cmd;
  } else if (type === "chamfer") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (type === "fillet") {
    const [ _, radius, pt ] = cmd;
    return pt;
  } else if (type === "cubic") {
    const [ _, handle0, pt, handle1 ] = cmd;
    return pt;
  } else if (type === "relative") {
    const [ _, dx, dy ] = cmd;
    return [ lastPt[0] + dx, lastPt[1] + dy];
  } else if (type === "turnForward") {
    const [ _, angle, distance ] = cmd;
    const rad = angle/180 * Math.PI;
    const targetAngle = getAngle(lastPt, secondLastPt) + rad;

    return [ 
      lastPt[0] + Math.cos(targetAngle)*distance, 
      lastPt[1] + Math.sin(targetAngle)*distance
    ];
  } else if (type === "arc") {
    console.log("TODO");
    return [0, 0];
  } else {
    console.log("unrecognized type in path command:", type)
    return null;
  }
}

function getAngle(lastPoint, secondLastPoint) {
  const x = lastPoint[0] - secondLastPoint[0];
  const y = lastPoint[1] - secondLastPoint[1];

  // in rads
  return Math.atan2(y, x);
}




