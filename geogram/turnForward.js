export const turnForward = (shape, theta, distance) => {
  // guard statement
  // if distance is zero then we just get stacked points so let's just not
  if (shape.length === 0) shape.push([ [ 0, 0 ] ])
  if (distance === 0) return shape;

  const lastPoint = shape.at(-1).at(-1);
  const angle = getAngle(shape)+theta;
  const xCos = Math.cos(degreesToRad(angle));
  const ySin = Math.sin(degreesToRad(angle));
  const x = lastPoint.x + distance * xCos;
  const y = lastPoint.y + distance * ySin;

  shape.at(-1).push([ x, y ]);

  return shape;
}

function getAngle(shape) {
  const pl = shape.at(-1);
  if (pl.length < 2) return 0;

  const lastPoint = pl.at(-1);
  const secondLastPoint = pl.at(-2);

  const x = lastPoint[0] - secondLastPoint[0];
  const y = lastPoint[1] - secondLastPoint[1];

  return Math.atan2(y, x) * 180 / Math.PI;
}

const degreesToRad = deg => (deg / 180) * Math.PI;
