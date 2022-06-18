import Shape from "../../libs/simple-clipper.js";

const overlap = (p0, p1) => 0.00000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);

export function offset(distance, ops, turtle) {
  // et = "etOpenSquare" | "etOpenRound" | "etOpenButt" | "etClosedLine" |  "etClosedPolygon"
  // jt = "jtSquare" | "jtRound" | "jtMiter"
  let { endType, jointType = "jtRound", miterLimit = 2, roundPrecision = .25 } = ops;

  // this is because gram doesn't have capital symbols
  // if (ops.end) endType = ops.end;
  // if (ops.joint) jointType = ops.joint;
  // if (ops.miter_limit) miterLimit = ops.miter_limit;
  // if (ops.round_precision) roundPrecision = ops.round_precision;

  if (!endType) {
    const closed = overlap(turtle.start, turtle.end);
    endType = closed ? 'etClosedRound' : "etOpenRound";
  }

  const paths =  turtle.getBooleanForm(distance).flat();
  const subject = new Shape(paths, true);

  const result = subject.offset(distance*turtle.booleanScale, {
    jointType,
    endType, // et Open/Closed Polygon/Round/Line/Butt
    miterLimit,
    roundPrecision
  })
  turtle.setBooleanForm(result);                  
  return turtle;
}