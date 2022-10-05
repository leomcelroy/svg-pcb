import Shape from "./libs/simple-clipper.js";

const overlap = (p0, p1) => 0.00000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);

export function offset(shape, distance, ops = {}) {
  // et = "etOpenSquare" | "etOpenRound" | "etOpenButt" | "etClosedLine" |  "etClosedPolygon"
  // jt = "jtSquare" | "jtRound" | "jtMiter"
  let { endType, jointType = "jtRound", miterLimit = 2, roundPrecision = .25 } = ops;

  if (!endType) {
    const start = shape[0][0];
    const end = shape.at(-1).at(-1);
    const closed = overlap(start, end);
    endType = closed ? 'etClosedRound' : "etOpenRound";
  }

  const { data, scale } = toBooleanForm(shape, distance);

  const subject = new Shape(data, true);
  const result = subject.offset(distance*scale, {
    jointType,
    endType,
    miterLimit,
    roundPrecision
  })
                  
  const newShape = fromBooleanForm(result, scale);

  while (shape.length > newShape.length) shape.pop();

  newShape.forEach((pl, i) => {
    shape[i] = pl;
  })

  return shape;
}

const pointAdjust = (p, scale) => {
  const temp = {};
  temp["X"] = Math.round(p.x*scale);
  temp["Y"] = Math.round(p.y*scale);
  return temp;
}

const dist = (p0, p1) => Math.sqrt((p1.x - p0.x)**2 + (p1.y - p0.y)**2);

function toBooleanForm(shape, limiter) {
  const distances = [];
  const pts = shape.flat();
  for (let i = 0; i < pts.length - 2; i += 1) {
    const p0 = pts[i];
    const p1 = pts[i+1];
    const d2 = dist(p0, p1);
    if (Math.abs(d2) !== 0) distances.push(d2);
  }

  const scale = limiter !== 0 
    ? (1/Math.min(...distances, limiter)+1)*10
    : (1/Math.min(...distances)+1)*10;

  const data = shape.map((pl,i) => {
    return pl.map(pt => pointAdjust(pt, scale));
  })
  
  return {
    data,
    scale
  }
};

function fromBooleanForm(clippedPaths, scale) {

  const newShape = Object.values(clippedPaths.paths).map(p => {
    p = p.map( ({X, Y}) => ({x: X/scale, y: Y/scale}) );
    // I automatically close the paths
    const points = [ ...p, p[0] ];

    return [ ...p, p[0] ];
  })

  return newShape; 
};