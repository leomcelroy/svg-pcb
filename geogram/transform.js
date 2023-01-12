const mapPtFromRule = rule => ([ x, y ]) => {

  const [ a, b, c, d, tx, ty ] = getMatrixRule(rule);

  return {
    x: x * a + y * c + tx,
    y: x * b + y * d + ty
  };
}

function getMatrixRule({ dx, dy, sx, sy, rotate, skew }) {
  rotate = rotate/180*Math.PI;
  return getMatrix(dx, dy, sx, sy, rotate, skew);
}

function getMatrix(dx, dy, sx, sy, angle, skewness) {
  var matrix=[1,0,0,1,0,0];

  translate(dx, dy);
  rotate(angle);
  skew(skewness);
  scale(sx, sy);
  // skew(skewness);

  return matrix;

  function translate(x,y){
      matrix[4] += matrix[0] * x + matrix[2] * y;
      matrix[5] += matrix[1] * x + matrix[3] * y;
  }

  function scale(x,y){
      matrix[0] *= x;
      matrix[1] *= x;
      matrix[2] *= y;
      matrix[3] *= y;    
  }

  function rotate(radians){
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      var m11 = matrix[0] * cos + matrix[2] * sin;
      var m12 = matrix[1] * cos + matrix[3] * sin;
      var m21 = -matrix[0] * sin + matrix[2] * cos;
      var m22 = -matrix[1] * sin + matrix[3] * cos;
      matrix[0] = m11;
      matrix[1] = m12;
      matrix[2] = m21;
      matrix[3] = m22;   
  }

  function skew(skewness) { // TODO: skew
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);
      matrix[2] += skewness * cos;
      matrix[3] += skewness * sin;
  }
}

export function transform(shape, transformations) {
  const fn = mapPtFromRule(transformations);
  shape.forEach((pl, i) => {
    console.log(pl.map(fn));
    shape[i] = pl.map(fn);
  })

  return shape;
}