import Shape from "../../libs/simple-clipper.js";

export function intersect(shape0, shape1) {
  
  const scale = getScale([...shape0, ...shape1]);
  const data0 =  toBooleanForm(shape0, scale);
  const data1 =  toBooleanForm(shape1, scale);
  const subject = new Shape(data0, true);
  const clip = new Shape(data1, true);
  const result = subject.intersect(clip);
                  
  const newShape = fromBooleanForm(result, scale);


  while (shape0.length > newShape.length) shape0.pop();

  newShape.forEach((pl, i) => {
    shape0[i] = pl;
  })

  return shape0;
}

const pointAdjust = (p, scale) => {
  const temp = {};
  temp["X"] = Math.round(p.x*scale);
  temp["Y"] = Math.round(p.y*scale);
  return temp;
}

const dist = (p0, p1) => Math.sqrt((p1.x - p0.x)**2 + (p1.y - p0.y)**2);

function getScale(shape) {
  const distances = [];
  const pts = shape.flat();
  for (let i = 0; i < pts.length - 2; i += 1) {
    const p0 = pts[i];
    const p1 = pts[i+1];
    const d2 = dist(p0, p1);
    if (Math.abs(d2) !== 0) distances.push(d2);
  }

  return (1/Math.min(...distances)+1)*10;
}

function toBooleanForm(shape, scale) {

  return shape.map((pl,i) => {
    return pl.map(pt => pointAdjust(pt, scale));
  })
  
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