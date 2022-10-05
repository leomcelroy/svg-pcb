import Shape from "./libs/simple-clipper.js";

export function union2(shape0, shape1) {
  const poly1 = shape0.map(pl => pl.map(pt => [pt.x, pt.y]));
  const poly2 = shape1.map(pl => pl.map(pt => [pt.x, pt.y]));
  const newShape = polygonClipping.union(poly1, poly2).flat();
  console.log(newShape)
  
  // const scale = getScale([...shape0, ...shape1]);
  // console.log(scale);
  // const data0 =  toBooleanForm(shape0, scale);
  // const data1 =  toBooleanForm(shape1, scale);
  // const subject = new Shape(data0, true);
  // const clip = new Shape(data1, true);
  // const result = subject.difference(clip);
                  
  // const newShape = fromBooleanForm(result, scale);


  while (shape0.length > newShape.length) shape0.pop();

  newShape.forEach((pl, i) => {
    shape0[i] = pl.map(pt => ({ x: pt[0], y: pt[1] }));
  })

  return shape0;
}

export function union(shape0, shape1, scale = 1000) {
  scale = Math.max(scale, getScale([...shape0, ...shape1]))
  const data0 =  toBooleanForm(shape0, scale);
  const data1 =  toBooleanForm(shape1, scale);
  const subject = new Shape(data0, true);
  const clip = new Shape(data1, true);
  const result = subject.union(clip);
                  
  const newShape = fromBooleanForm(result, scale);


  while (shape0.length > newShape.length) shape0.pop();

  newShape.forEach((pl, i) => {
    shape0[i] = pl;
  })

  return shape0;
}

const dist = (p0, p1) => Math.sqrt((p1.x - p0.x)**2 + (p1.y - p0.y)**2);

function getScale(shape) {
  const scales = [];
  const pts = shape.flat();
  for (let i = 0; i < pts.length - 2; i += 1) {
    const p0 = pts[i];
    const p1 = pts[i+1];
    const d2 = dist(p0, p1);
    if (Math.abs(d2) != 0) scales.push(Math.floor(1/d2 + 1)*10);
  }

  return Math.max(...scales);
}

const pointAdjust = (p, scale) => {
  const temp = {};
  temp["X"] = Math.round(p.x*scale);
  temp["Y"] = Math.round(p.y*scale);
  return temp;
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