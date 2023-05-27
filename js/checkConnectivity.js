

export function checkConnectivity(pcb) {
  // fails if one pad is not overlapped
  // fails if distinct groups overlap
  // fails if connected to something not in group

  // fails if all groups are fully connected and not connected to anything else

  const comps = {};

  pcb.components.forEach(comp => {
    comps[comp.id] = JSON.parse(JSON.stringify(comp.pads));
  })

  const frontCopper = pcb.getLayer("F.Cu", true);

  const shapes = getShapes(frontCopper[0]);

  const islands = {};

  shapes.forEach((shape, i) => {
    for (const id in comps) {
      const comp = comps[id];
      for (const padName in comp) {
        const pos = comp[padName];
        const dist = distanceFromPoly(pos, shape);
        if (dist > 0) continue;
        if (islands[i]) islands[i].push([id, padName]);
        else islands[i] = [ [id, padName] ];
      }
    }
  })

  // compare islands to board.netList
  console.log(islands);
}

// function pointInPolygon(point, polygon) {
//     var count = 0;
//     for (var i = 0; i < polygon.length; i++) {
//         var p1 = polygon[i];
//         var p2 = polygon[(i + 1) % polygon.length];

//         if (((p1[1] <= point[1] && point[1] < p2[1]) || (p2[1] <= point[1] && point[1] < p1[1])) &&
//             point[0] < ((p2[0] - p1[0]) * (point[1] - p1[1]) / (p2[1] - p1[1]) + p1[0]))
//             count++;
//     }
//     return count % 2 === 1;
// }

// function distToLine(point, p1, p2) {
//     var dx = p2[0] - p1[0];
//     var dy = p2[1] - p1[1];
//     var numerator = Math.abs(dy * point[0] - dx * point[1] + p2[0] * p1[1] - p2[1] * p1[0]);
//     var denominator = Math.sqrt(dy * dy + dx * dx);
//     return numerator / denominator;
// }

// function distToPoly(point, polygon) {
//     var minDist = Infinity;
//     for (var i = 0; i < polygon.length; i++) {
//         var dist = distToLine(point, polygon[i], polygon[(i + 1) % polygon.length]);
//         minDist = Math.min(minDist, dist);
//     }

//     if (pointInPolygon(point, polygon))
//         minDist = -minDist;

//     return minDist;
// }

const minus = (p0, p1) => [p0[0] - p1[0] , p0[1] - p1[1]];
const plus = (a, b) => [p0[0] + p1[0] , p0[1] + p1[1]];
const mul = (p0, p1) => [p0[0] * p1[0] , p0[1] * p1[1]];
const clamp = (num, min, max) => Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
const length = p => Math.sqrt(p[0]**2 + p[1]**2);
const dot = (p0, p1) => (p0[0]*p1[0]) + (p0[1]*p1[1]);
const scalarMul = (p, c) => [p[0]*c, p[1]*c];

function distanceSeg(point, a, b) {
  const pa = minus(point, a);
  const ba = minus(b, a);
  const h = clamp(dot(pa, ba)/dot(ba, ba), 0, 1);
  const l = minus(pa, scalarMul(ba, h));

  return length(l);
}

function overlap(p0, p1) {
  return 0.000001 > Math.abs(p0[0] - p1[0]) + Math.abs(p0[1] - p1[1]);
}

function isClosed(points) {
  return overlap(points[0], points[points.length - 1]);
}

function distanceFromPoly(p, points) {

  let d = 999999999999;
  let numPoints = points.length;
  let intersections = 0;
  let iUp = 0;
  let iDown = 0;

  for ( let i = 0, j = 1; j < numPoints; j++, i++) {
    let temp = distanceSeg(p, points[i], points[j]);
    d = Math.min(d, temp);

    let seg = [points[i], points[j]];

    if (doLinesIntersect(seg , [ p, [p[0], -999999999999] ] ) ) {
      intersections++;
    }

  }

  if (!isClosed(points)) intersections = 0;

  return intersections % 2 === 0 ? d : -d;
}

let EPSILON = 0.001;

function crossProduct(a, b) {
    return a[0] * b[1] - b[0] * a[1];
}

function doBoundingBoxesIntersect(a, b) {
    return a.xMin <= b.xMax && 
         a.xMax >= b.xMin && 
         a.yMin <= b.yMax && 
         a.yMax >= b.yMin;
}

function isPointOnLine(line, point) {
    // Move the image, so that a.first is on (0|0)
    let aTmp = [ [0, 0], [ line[1][0] - line[0][0], line[1][1] - line[0][1]] ];
    let bTmp = [ point[0] - line[0][0] , point[1] - line[0][1] ];
    let r = crossProduct(aTmp[1], bTmp);
    return Math.abs(r) < EPSILON;
}

function isPointRightOfLine(line, point) {
    // Move the image, so that a.first is on (0|0)
    let aTmp = [ [0, 0], [ line[1][0] - line[0][0], line[1][1] - line[0][1]] ];
    let bTmp = [ point[0] - line[0][0] , point[1] - line[0][1] ];
    let r = crossProduct(aTmp[1], bTmp);
    return r < 0;
}

function lineSegmentTouchesOrCrossesLine(a, b) {
    return isPointOnLine(a, b[0])
            || isPointOnLine(a, b[1])
            || (isPointRightOfLine(a, b[0]) ^ isPointRightOfLine(a, b[1]));
}

function lineSegmentCrossesLine(a, b) {
    return (isPointRightOfLine(a, b[0]) ^ isPointRightOfLine(a, b[1]));
}

function getBoundingBox(line) {
  let xMin = Math.min(line[0][0], line[1][0]);
  let xMax = Math.max(line[0][0], line[1][0]);
  let yMin = Math.min(line[0][1], line[1][1]);
  let yMax = Math.max(line[0][1], line[1][1]);

  return { xMin, xMax, yMin, yMax };
}

export function doLinesIntersect(a, b) {
    let box1 = getBoundingBox(a);
    let box2 = getBoundingBox(b);
    return doBoundingBoxesIntersect(box1, box2)
            && lineSegmentCrossesLine(a, b)
            && lineSegmentCrossesLine(b, a);
}


function getShapes(d) {
  return d
    .replace(/\s/g, "")
    .split("M")
      .filter(x => x.length > 0)
      .map(poly => {
        return poly.split("L").map(pt => pt.split(",").map(Number))
      })
}