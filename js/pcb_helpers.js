import { 
  pathD, 
  getPathData, 
  circle, 
  rectangle, 
  translate as trans, 
  rotate as rot, 
  outline,
  scale
} from "../geogram/index.js";

const length = ([x1, y1], [x2, y2]) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);

const via = (diameterHole, diameterCopper, layers = ["F.Cu", "B.Cu"]) => ({
  "via": {
    pos: [0, 0],
    layers: layers,
    shape: getPathData(circle(diameterCopper/2)),
    drill: {
      diameter: diameterHole,
      start: layers[0],
      end: layers[1],
      plated: true
    },
  }
})


const vector_add = ([x, y], [dx, dy]) => [x + dx, y + dy];
const dot = ([x0, y0], [x1, y1]) => x0*x1 + y0*y1;
const vector_rotate = ([x, y], angle) => [
  x*Math.cos(angle) - y * Math.sin(angle),
  y*Math.cos(angle) + x * Math.sin(angle)
]


class Component {
  constructor({ pads, layers, drills, footprint, pos, padShapes, id, rotation }) {
    this.pads = pads;
    this.layers = layers;
    this.footprint = footprint;
    this.drills = drills;
    this._pos = pos;
    this.rotation = rotation;
    this.padShapes = padShapes;
    this.id = id;
  }

  pad(name) {
    return this.pads[name];
  }

  padX(name) {
    return this.pads[name][0];
  }

  padY(name) {
    return this.pads[name][1];
  }

  get pos() {
    return this._pos; // should store this somewhere else
  }

  get posX() {
    return this._pos[0]; // should store this somewhere else
  }

  get posY() {
    return this._pos[1]; // should store this somewhere else
  }
}

const SHAPE_CACHE = {}

function makeComponent(comp, options = {}) {
  let translate = options.translate || [0, 0];
  let rotate = options.rotate || 0;
  let padLabelSize = options.padLabelSize || 0.02;
  let flip = options.flip || false;
  let id = options.id || crypto.randomUUID();

  const [xOff, yOff] = translate;
  const rad = (rotate * Math.PI) / 180;

  const pads = {};
  const padShapes = {};
  const padsLabels = [];
  const drills = [];
  let results = {};

  for (const pad in comp) {
    let { pos, shape, layers, origin, drill } = comp[pad];
    // is origin ever used?

    if (drill) {
      let _ = pos;
      if (flip) _ = scalePt(_, [-1, 1], [0, 0]);
      _ = translatePt(_, translate, [0, 0]);
      _ = rotatePt(_, rotate, translate);

      drills.push({ pos: _, ...drill });
    }
    

    function swapFB(inputString) {
      const result = inputString.replace(/F\./g, 'TEMP').replace(/B\./g, 'F.').replace(/TEMP/g, 'B.');
      return result;
    }

    if (flip) {
      layers = layers.map(layer => swapFB(layer));
    }

    if (typeof shape === "string") {
      if (!(shape in SHAPE_CACHE)) {
        SHAPE_CACHE[shape] = pathD([], shape);
      }

      shape = SHAPE_CACHE[shape].slice();
     
    }

    // shape = pathD([], shape);

    let offset = [pos[0], pos[1]];
    if (origin !== undefined) {
      offset[0] = origin[0];
      offset[1] = origin[1];
    }
    
    trans(shape, offset);
    if (flip) scale(shape, [-1, 1], [0, 0]);
    trans(shape, translate);
    rot(shape, rotate, translate);

    let pad_pos = vector_add(vector_rotate(pos, rad), translate);
    pads[pad] = pad_pos;

    function scalePt(p, [ xScale, yScale ], [ x, y ]) {

      const newPoint = [
        ((p[0]-x) * xScale) + x,
        ((p[1]-y) * yScale) + y
      ];

      return newPoint;
    };

    function rotatePt(p, angle, point) {

      let delta = angle / 180 * Math.PI;

      let hereX = p[0] - point[0];
      let hereY = p[1] - point[1];

      let newPoint = [
        hereX * Math.cos(delta) - hereY * Math.sin(delta) + point[0],
        hereY * Math.cos(delta) + hereX * Math.sin(delta) + point[1]
      ];

      return newPoint;
    }

    function translatePt(p, toPoint, fromPoint) {
      const [ x0, y0 ] = fromPoint;
      const [ x1, y1 ] = toPoint;
      const x = x1 - x0;
      const y = y1 - y0;

      const newPoint = [
        p[0] + x,
        p[1] + y
      ];

      return newPoint;
    }

    let textLoc = pad_pos;
    textLoc = scalePt(textLoc, [flip ? -1 : 1, 1], translate);
    textLoc = rotatePt(textLoc, flip ? 2*rotate : 0, translate);

    if (layers.some(layer => ["F.Cu", "B.Cu"].includes(layer))) {
      padsLabels.push({
        type: "text",
        value: pad,
        translate: textLoc,
        size: padLabelSize
      });
    }

    layers.forEach(l => {
      if (l in results) results[l].push(shape);
      else results[l] = [shape];
    })

    padShapes[pad] = shape;
  }

  results.padLabels = padsLabels;

  return new Component({
    pads,
    layers: results,
    footprint: comp,
    drills,
    pos: translate,
    padShapes,
    id: id,
    rotation: rotate
  })
}

export {
  // makeText,
  makeComponent,
  via
}
