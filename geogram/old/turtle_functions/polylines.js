const round = (num, prec = 0) => prec === 0 ? num : Math.round(num*prec)/prec; // 1 instead of 1.01

function flatten(items) {
  const flat = [];

  items.forEach(item => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
}

export function polylines(asArray, prec, turtle) {
  const roundPathPts = path => ({ 
    inside: path.fillColor === "white", 
    pts: path.points.map( ({x, y}) => asArray 
      ? [ x, y ] 
      : { x, y } 
    )
  })

  const pls = flatten(turtle.path).map(roundPathPts);

  return pls;
}