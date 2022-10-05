class Gram {
  constructor(shape) {
    this.shape = shape;
  }

  turnForward() { 
    turnForward(this.shape, ...arguments); 
    return this;
  };

  vec() { 
    vec(this.shape, ...arguments); 
    return this;
  };

  close() { 
    close(this.shape, ...arguments); 
    return this;
  };

  translate() { 
    translate(this.shape, ...arguments); 
    return this;
  };

  rotate() { 
    rotate(this.shape, ...arguments); 
    return this;
  };

  scale() { 
    scale(this.shape, ...arguments); 
    return this;
  };

  originate() { 
    originate(this.shape, ...arguments); 
    return this;
  };

  goTo() { 
    goTo(this.shape, ...arguments); 
    return this;
  };

  reverse() { 
    reverse(this.shape, ...arguments); 
    return this;
  };

  thicken() { 
    thicken(this.shape, ...arguments); 
    return this;
  };

  copyPaste() { 
    copyPaste(this.shape, ...arguments); 
    return this;
  };

  offset() { 
    offset(this.shape, ...arguments); 
    return this;
  };

  outline() { 
    outline(this.shape, ...arguments); 
    return this;
  };

  expand() { 
    expand(this.shape, ...arguments); 
    return this;
  };

  intersect() { 
    intersect(this.shape, ...arguments); 
    return this;
  };

  difference() { 
    difference(this.shape, ...arguments); 
    return this;
  };

  union() { 
    union(this.shape, ...arguments); 
    return this;
  };

  xor() { 
    xor(this.shape, ...arguments); 
    return this;
  };

  pathD() { 
    pathD(this.shape, ...arguments); 
    return this;
  };

  arc() { 
    arc(this.shape, ...arguments); 
    return this;
  };

  bezier() { 
    bezier(this.shape, ...arguments); 
    return this;
  };

  getAngle() { 
    return getAngle(this.shape, ...arguments); 
  };

  getPathData() { 
    return getPathData(this.shape, ...arguments); 
  };

  extrema() { 
    extrema(this.shape, ...arguments); 
    return this;
  };

  getPoint() { 
    getPoint(this.shape, ...arguments); 
    return this;
  };

  get lt() { 
    point(this.shape, "lt"); 
    return this;
  };

  get lc() { 
    point(this.shape, "lc"); 
    return this;
  };

  get lb() { 
    point(this.shape, "lb"); 
    return this;
  };

  get ct() { 
    point(this.shape, "ct"); 
    return this;
  };

  get cc() { 
    point(this.shape, "cc"); 
    return this;
  };

  get cb() { 
    point(this.shape, "cb"); 
    return this;
  };

  get rt() { 
    point(this.shape, "rt"); 
    return this;
  };

  get rc() { 
    point(this.shape, "rc"); 
    return this;
  };

  get rb() { 
    point(this.shape, "rb"); 
    return this;
  };

  get centroid() { 
    return centroid(this.shape, ...arguments); 
  };

  get width() { 
    return width(this.shape, ...arguments); 
  };

  get height() { 
    return height(this.shape, ...arguments); 
  };

};