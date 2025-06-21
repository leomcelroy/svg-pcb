
const rectangle = (w, h) => {
  const p0 = [ -w/2, h/2 ];
  const p1 = [ w/2, h/2 ];
  const p2 = [ w/2, -h/2 ];
  const p3 = [ -w/2, -h/2 ];

  return [
    [ p0, p1, p2, p3, p0 ]
  ]
}

const circle = r => {
  const n = 360/2;
  const pts = [];

  const getX = (theta, r) => r*Math.cos(theta);
  const getY = (theta, r) => r*Math.sin(theta);

  for ( let i = 0; i < n; i++) {
    const theta = Math.PI*2/n*i;
    const x = getX(theta, r);
    const y = getY(theta, r);
    pts.push( [ x, y ] );
  }

  const [ x, y ] = pts[0];
  pts.push([ x, y ]);

  return [ pts ];
}

// parser should take units

const convertLayers = (layers) => layers.reduce((acc, cur) => {
  let l = cur.split(".");
  if (l.length === 0) return acc;
  else if (l[0] !== "*") return [...acc, cur];
  else return [...acc, `F.${l[1]}`, `B.${l[1]}`];
}, []);

const getNamedArray = (line, name) => {
  const index = line.findIndex(entry => Array.isArray(entry) && entry[0] === name);
  const value = line[index];

  return value ? value.slice(1) : [];
}

export function kicadParser(data) {
  let r = sParse(data);

  let scale = 1/25.4;
  const padsToAdd = {};

  for (const line of r) {
    const isPad = line[0] === "pad";
    const isSmd = line[2] === "smd";
    const isThru = line[2] === "thru_hole";
    const shape = line[3];

    if (isPad && (isSmd || isThru)) {
      let name = line[1];

      let at = getNamedArray(line, "at").map(x => Number(x)*scale);
      at[1] = -at[1]; // negative Y axis
      let rotate = at.length === 3 ? Number(getNamedArray(line, "at")[2]) : 0;

      let layers = getNamedArray(line, "layers");
      layers = convertLayers(layers);

      let size = getNamedArray(line, "size").map(x => Number(x)*scale);

      const shapeCases = {
        "rect": (size) => rectangle(...size),
        "roundrect": (size) => {
          // let _ = rectangle(...size);
          // roundCorners(_);

          const ratio = Number(getNamedArray(line, "roundrect_rratio")[0]);
          const pts = generateRoundRect(0, 0, ...size, ratio);

          return [ pts ];
        },
        "circle": (size) => circle(...size.map(x => x/2)), 
        "oval": (size) => {
            const pts = generateRoundRect(0, 0, ...size, 1); 
            return [ pts ];
        },
        "custom": () => {
          const primitives = getNamedArray(line, "primitives");

          const poly = primitives[0][1]
            .slice(1)
            .map(
              xy => [ Number(xy[1])*scale, Number(xy[2])*scale ]
            );

          return [ poly ];
        }
        // "ellipse": () => circle(...size), 
      }

      let shapeGeometry = 
        (shape in shapeCases) 
        ? shapeCases[shape](size)
        : [];

      rotateShape(shapeGeometry, rotate);

      if (!(shape in shapeCases)) {
        console.log("missing shape case", shape);
      }

      const footprint = { 
        pos: at, 
        shape: shapeGeometry, 
        layers 
      }

      const drillIndex = line.findIndex(entry => Array.isArray(entry) && entry[0] === "drill");

      if (drillIndex !== -1 && typeof line[drillIndex][1] === "number") {
        let drillDia = Number(line[drillIndex][1])*scale;

        footprint.drill = {
          diameter: drillDia,
          start: "F.Cu", // this should come from layers
          end: "B.Cu",
          plated: true // hmm how does kicad module do this
        }
      }

      if (drillIndex !== -1 && line[drillIndex][1] === "oval") { 
        const drillIndexLine = line[drillIndex];

        const shapeGeo = shapeCases["oval"]([ drillIndexLine[2], drillIndexLine[3] ].map(x => Number(x)*scale));
        rotateShape(shapeGeo, rotate);

        const footprint = { 
          pos: at, 
          shape: shapeGeo, 
          layers: ["outline", "Thru.Hole"]
        }

        if (padsToAdd[name+"_plated_cut"] === undefined) padsToAdd[name+"_plated_cut"] = [footprint];
        else padsToAdd[name+"_plated_cut"].push(footprint);
      }
     
      if (padsToAdd[name] === undefined) padsToAdd[name] = [footprint];
      else padsToAdd[name].push(footprint);

    }
  }

  let result = Object.entries(padsToAdd).reduce((acc, cur) => {
    const [key, value] = cur;

    if (value.length === 1) {
      acc[key] = value[0];
    } else {
      value.forEach((v, i) => {
        const newKey = i === 0 ? key : `${key}_${i}`
        acc[newKey] = v;
      })
    }

    return acc;
  }, {});

  Object.keys(result).forEach(k => {
    let d = "";
    const shape = result[k].shape;
    shape.forEach(s => {
      s.forEach((p, i) => {
        const [ x, y ] = p;
        d += `${i==0 ? "M" : "L"} ${x} ${y} `
      })
      
    })

    result[k].shape = d;
  })

  return result;
}


function generateRoundRect(centerX, centerY, width, height, rratio, numPointsPerCorner=10) {
    // Calculate the radius
    var radius = Math.min(width, height) * rratio / 2;

    // Calculate the corner centers
    var topLeft = [centerX - width/2 + radius, centerY - height/2 + radius];
    var topRight = [centerX + width/2 - radius, centerY - height/2 + radius];
    var bottomRight = [centerX + width/2 - radius, centerY + height/2 - radius];
    var bottomLeft = [centerX - width/2 + radius, centerY + height/2 - radius];

    var points = [];

    // Generate points for each corner, we're using a simple circle equation here.
    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Top left corner
        points.push([topLeft[0] - radius * Math.cos(angle), topLeft[1] - radius * Math.sin(angle)]);
    }

    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Top right corner
        points.push([topRight[0] + radius * Math.sin(angle), topRight[1] - radius * Math.cos(angle)]);
    }

    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Bottom right corner
        points.push([bottomRight[0] + radius * Math.cos(angle), bottomRight[1] + radius * Math.sin(angle)]);
    }

    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Bottom left corner
        points.push([bottomLeft[0] - radius * Math.sin(angle), bottomLeft[1] + radius * Math.cos(angle)]);
    }

    // Add first point to the end to close the shape
    points.push(points[0]);

    return points;
}

const rotateShape = (shape, angle, point = [0, 0]) => {
  const fn = p => {

    let delta = angle / 180 * Math.PI;

    let hereX = p[0] - point[0];
    let hereY = p[1] - point[1];

    let newPoint = [
      hereX * Math.cos(delta) - hereY * Math.sin(delta) + point[0],
      hereY * Math.cos(delta) + hereX * Math.sin(delta) + point[1]
    ];

    return newPoint;
  }


  return applyFn(shape, fn);

  function applyFn(shape, fn) {
      shape.forEach((pl, i) => {
        shape[i] = pl.map(fn);
      })

      return shape;
    }

}


// https://github.com/fwg/s-expression

function SParser(stream) {
    this._line = this._col = this._pos = 0;
    this._stream = stream;
}

SParser.not_whitespace_or_end = /^(\S|$)/;
SParser.space_quote_paren_escaped_or_end = /^(\s|\\|"|'|`|,|\(|\)|$)/;
SParser.string_or_escaped_or_end = /^(\\|"|$)/;
SParser.string_delimiters = /["]/;
SParser.quotes = /['`,]/;
SParser.quotes_map = {
    '\'': 'quote',
    '`':  'quasiquote',
    ',':  'unquote'
};

SParser.prototype = {
    peek: peek,
    consume: consume,
    until: until,
    error: error,
    string: string,
    atom: atom,
    quoted: quoted,
    expr: expr,
    list: list
};

export function sParse(stream) {
    var parser = new SParser(stream);
    var expression = parser.expr();

    if (expression instanceof Error) {
        return expression;
    }

    // if anything is left to parse, it's a syntax error
    if (parser.peek() != '') {
        return parser.error('Superfluous characters after expression: `' + parser.peek() + '`');
    }

    return expression;
};

function error(msg) {
    var e = new Error('Syntax error: ' + msg);
    e.line = this._line + 1;
    e.col  = this._col + 1;
    return e;
}

function peek() {
    if (this._stream.length == this._pos) return '';
    return this._stream[this._pos];
}

function consume() {
    if (this._stream.length == this._pos) return '';

    var c = this._stream[this._pos];
    this._pos += 1;

    if (c == '\r') {
        if (this.peek() == '\n') {
            this._pos += 1;
            c += '\n';
        }
        this._line++;
        this._col = 0;
    } else if (c == '\n') {
        this._line++;
        this._col = 0;
    } else {
        this._col++;
    }

    return c;
}

function until(regex) {
    var s = '';

    while (!regex.test(this.peek())) {
        s += this.consume();
    }

    return s;
}

function string() {
    // consume "
    var delimiter = this.consume();

    var str = '';

    while (true) {
        str += this.until(SParser.string_or_escaped_or_end);
        var next = this.peek();

        if (next == '') {
            return this.error('Unterminated string literal');
        }

        if (next == delimiter) {
            this.consume();
            break;
        }

        if (next == '\\') {
            this.consume();
            next = this.peek();

            if (next == 'r') {
                this.consume();
                str += '\r';
            } else if (next == 't') {
                this.consume();
                str += '\t';
            } else if (next == 'n') {
                this.consume();
                str += '\n';
            } else if (next == 'f') {
                this.consume();
                str += '\f';
            } else if (next == 'b') {
                this.consume();
                str += '\b';
            } else {
                str += this.consume();
            }

            continue;
        }

        str += this.consume();
    }

    // wrap in object to make strings distinct from symbols
    return new String(str);
}

function atom() {
    if (SParser.string_delimiters.test(this.peek())) {
        return this.string();
    }

    var atom = '';

    while (true) {
        atom += this.until(SParser.space_quote_paren_escaped_or_end);
        var next = this.peek();

        if (next == '\\') {
            this.consume();
            atom += this.consume();
            continue;
        }

        break;
    }

    return atom;
}

function quoted() {
    var q = this.consume();
    var quote = SParser.quotes_map[q];

    if (quote == "unquote" && this.peek() == "@") {
        this.consume();
        quote = "unquote-splicing";
        q = ',@';
    }

    // ignore whitespace
    this.until(SParser.not_whitespace_or_end);
    var quotedExpr = this.expr();

    if (quotedExpr instanceof Error) {
        return quotedExpr;
    }

    // nothing came after '
    if (quotedExpr === '') {
        return this.error('Unexpected `' + this.peek() + '` after `' + q + '`');
    }

    return [quote, quotedExpr];
}

function expr() {
    // ignore whitespace
    this.until(SParser.not_whitespace_or_end);

    if (SParser.quotes.test(this.peek())) {
        return this.quoted();
    }

    var expr = this.peek() == '(' ? this.list() : this.atom();

    // ignore whitespace
    this.until(SParser.not_whitespace_or_end);

    return expr;
}

function list() {
    if (this.peek() != '(') {
        return this.error('Expected `(` - saw `' + this.peek() + '` instead.');
    }

    this.consume();

    var ls = [];
    var v = this.expr();

    if (v instanceof Error) {
        return v;
    }

    if (v !== '') {
        ls.push(v);

        while ((v = this.expr()) !== '') {
            if (v instanceof Error) return v;
            ls.push(v);
        }
    }

    if (this.peek() != ')') {
        return this.error('Expected `)` - saw: `' + this.peek() + '`');
    }

    // consume that closing paren
    this.consume();

    return ls;
}