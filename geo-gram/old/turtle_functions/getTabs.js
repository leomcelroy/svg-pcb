const minus = (p0, p1) => ({ x: p0.x - p1.x , y: p0.y - p1.y });
const plus = (p0, p1) => ({ x: p0.x + p1.x , y: p0.y + p1.y});
const mul = (p0, p1) => ({ x: p0.x * p1.x , y: p0.y * p1.y});
const clamp = (num, min, max) => Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
const length = p => Math.sqrt(p.x**2 + p.y**2);
const dot = (p0, p1) => (p0.x*p1.x) + (p0.y*p1.y);
const scalarMul = (p, c) => ({ x: p.x*c, y: p.y*c });

function distanceSeg(point, a, b) {
	const pa = minus(point, a);
	const ba = minus(b, a);
	const h = clamp(dot(pa, ba)/dot(ba, ba), 0, 1);
	const l = minus(pa, scalarMul(ba, h));

	return length(l);
}

let EPSILON = 0.001;

function crossProduct(a, b) {
    return a.x * b.y - b.x * a.y;
}

function doBoundingBoxesIntersect(a, b) {
    return a.xMin <= b.xMax && 
    	   a.xMax >= b.xMin && 
    	   a.yMin <= b.yMax && 
    	   a.yMax >= b.yMin;
}

function isPointOnLine(line, point) {
    // Move the image, so that a.first is on (0|0)
    let aTmp = [ 
      {x: 0, y: 0 }, 
      {
        x: line[1].x - line[0].x, 
        y: line[1].y - line[0].y
      }
    ];
  
    let bTmp = {
      x: point.x - line[0].x, 
      y: point.y - line[0].y
    };
    let r = crossProduct(aTmp[1], bTmp);
    return Math.abs(r) < EPSILON;
}

function isPointRightOfLine(line, point) {
    // Move the image, so that a.first is on (0|0)
    let aTmp = [ 
    	{ x: 0, y: 0 }, 
      { 
        x: line[1].x - line[0].x, 
        y: line[1].y - line[0].y 
      }
    ];
    let bTmp = { 
      x: point.x - line[0].x , 
      y: point.y - line[0].y 
    };
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
	let xMin = Math.min(line[0].x, line[1].x);
	let xMax = Math.max(line[0].x, line[1].x);
	let yMin = Math.min(line[0].y, line[1].y);
	let yMax = Math.max(line[0].y, line[1].y);

	return { xMin, xMax, yMin, yMax };
}

function doLinesIntersect(a, b) {
    let box1 = getBoundingBox(a);
    let box2 = getBoundingBox(b);
    return doBoundingBoxesIntersect(box1, box2)
            && lineSegmentCrossesLine(a, b)
            && lineSegmentCrossesLine(b, a);
}

function overlap(p0, p1) {
	return 0.000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);
}

function isClosed(points) {
	return overlap(points[0], points[points.length - 1]);
}

function distancePoly(p, points) {

	let d = 999999999999;
	let numPoints = points.length;
	let intersections = 0;
	let iUp = 0;
	let iDown = 0;

	for ( let i = 0, j = 1; j < numPoints; j++, i++) {
		let temp = distanceSeg(p, points[i], points[j]);
		d = Math.min(d, temp);

		let seg = [points[i], points[j]];
	
    let ray = [ 
      p, 
      { x: p.x, y:-999999999999 } 
    ]
    
		if (doLinesIntersect(seg , ray ) ) {
			intersections++;
		}

	}

	if (!isClosed(points)) intersections = 0;

	return intersections % 2 === 0 ? d : -d;
}

function isRectangle( 
	{x: x0, y: y0},
  {x: x1, y: y1},
  {x: x2, y: y2},
  {x: x3, y: y3},
) {
  let cx, cy, dd0, dd1, dd2, dd3;

  cx = (x0+x1+x2+x3)/4;
  cy = (y0+y1+y2+y3)/4;

  dd0 = (cx-x0)**2+(cy-y0)**2;
  dd1 = (cx-x1)**2+(cy-y1)**2;
  dd2 = (cx-x2)**2+(cy-y2)**2;
  dd3 = (cx-x3)**2+(cy-y3)**2;
    

  return approxEq(dd0, dd1) && approxEq(dd0, dd2) && approxEq(dd0, dd3);
}


const approxEq = (x, y) => Math.abs(x - y) < 1;

const samePt = (pt0, pt1) => approxEq(pt0.x, pt1.x) && approxEq(pt0.y, pt1.y);

const dist2 = (pt0, pt1) => (pt1.x-pt0.x)**2 + (pt1.y-pt0.y)**2;

const dist = (pt0, pt1) => Math.sqrt(dist2(pt0, pt1));

function getMidpoint(p0, p1) {
	return {
  	x: (p0.x + p1.x)/2,
    y: (p0.y + p1.y)/2,
  }
}

// function ptOnLine(p, p0, p1) {}

// function rectFromLine(p0, p1) {}

function ptContained(pt, pts) {
	let numPoints = pts.length;
	let intersections = 0;

	for ( let i = 0, j = 1; j < numPoints; j++, i++) {
    
		let seg = [pts[i], pts[j]];
    let ray = [ 
      pt, 
      { x: pt.x, y: -999999999999 } 
    ]
    
		if (doLinesIntersect(seg , ray ) ) intersections++;

	}

	return intersections % 2 !== 0;
}

function ptsAreRight(p0, p1, p2) {
  const midPt = getMidpoint(p0, p2)
  const a = dist2(p0, p1);
  const b = dist2(p1, p2);
  const c = dist2(p0, p2);
  const isRight = approxEq(a + b, c);

  return { isRight, midPt };
}



function getTabsPls(pls) {
  let tabs = [];
  for (let i = 0; i < pls.length; i++) {
    let pl = pls[i];

    const n = pl.pts.length;
    for (let i = 0; i < n-2; i++) { // need to handle case where i start on tab
      const [p0, p1, p2] = pl.pts.slice(i);

      const { isRight, midPt } = ptsAreRight(p0, p1, p2)

      if (isRight) {
        let contained = ptContained(midPt, pl.pts)
        tabs.push({
          contained: contained && !pl.inside,
          midPt,
          pts: [p0, p1, p2]
        })
        const fivePts = pl.pts.length === 5;
        if (fivePts) {
          const [p0, p1, p2, p3] = pl.pts;
          let isRect = isRectangle(p0, p1, p2, p3)
          if (isRect) i += 1;
        } 
      }

      if (i === n - 3) {
        // console.log("last");
        const p2 = pl.pts[1];
        const [p0, p1] = pl.pts.slice(i + 1);

        const { isRight, midPt } = ptsAreRight(p0, p1, p2)
        if (true) {
          let contained = ptContained(midPt, pl.pts)
          tabs.push({
            contained: contained && !pl.inside,
            midPt,
            pts: [p0, p1, p2],
            last: true
          })
          const fivePts = pl.pts.length === 5;
          if (fivePts) {
            const [p0, p1, p2, p3] = pl.pts;
            let isRect = isRectangle(p0, p1, p2, p3)
            if (isRect) i += 1;
          } 
        }
      }

    }
  }

  const fusedTabs = [];

  for (let i = 0; i < tabs.length; i++) {
    let tab0 = tabs[i];
    for (let j = i+1; j < tabs.length; j++) {
      let tab1 = tabs[j];
      if (samePt(tab0.midPt, tab1.midPt)) {
        tab0.pts.push(tab1.pts[2])
        fusedTabs.push(tab0)
      }
    }
  }
  
  return [tabs, fusedTabs];
}


export function getTabs(turtle) {
  return getTabsPls(turtle.copy().polylines());
}






