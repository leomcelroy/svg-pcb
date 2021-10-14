import { Turtle } from "./Turtle.js";

const length = ([x1, y1], [x2, y2]) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);
const overlap = (p1, p2) => length(p1, p2) < 0.000001;

const wire = (pts, thickness) => {
  let lastPt = pts[0];
  let result = new Turtle();
  result.booleanScale = 2000;
  result.goto(lastPt, false);
  for (const pt of pts.slice(1)) {
    if (overlap(pt, lastPt)) continue;
    result.goto(pt);
    lastPt = pt;
  }

  return result.offset(thickness);
}

const vector_add = ([x, y], [dx, dy]) => [x + dx, y + dy];
const dot = ([x0, y0], [x1, y1]) => x0*x1 + y0*y1;
const vector_rotate = ([x, y], angle) => [
  x*Math.cos(angle) - y * Math.sin(angle),
  y*Math.cos(angle) + x * Math.sin(angle)
]


class Component {
  constructor({ pads, layers }) {
    this.pads = pads;
    this.layers = layers;
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
    return this.pads["center"]; // should store this somewhere else
  }

  get posX() {
    return this.pads["center"][0]; // should store this somewhere else
  }

  get posY() {
    return this.pads["center"][1]; // should store this somewhere else
  }
}

// let SWD_4_05 = {
//   "RST": {
//     "pos": [-0.072, -0.025],
//     "shape": "M 0 0 L 90 90",
//     "layers": ["F.Cu"]
//   },
//   "GND": {
//     "pos": [0.072, -0.025],
//     "shape": "M 0 0 L 90 90",
//     "layers": ["F.Cu"]
//   }
// }

function makeComponent(comp, options = {}) {
  let translate = options.translate || [0, 0];
  let rotate = options.rotate || 0;
  let padLabelSize = options.padLabelSize || 0.0002;
  let componentLabelSize = options.componentLabelSize || 0.0003;
  // add flip

  const [xOff, yOff] = translate;
  const rad = (rotate * Math.PI) / 180;

  const pads = {}; // name: pos
  const padsLabels = [];
  let results = {};

  for (const pad in comp) {
    let { pos, shape, layers } = comp[pad];

    shape = typeof shape === "string" ? new Turtle().bezier(shape) : shape.copy();

    let pad_pos = vector_add(vector_rotate(pos, rad), translate);
    pads[pad] = pad_pos;

    shape.translate(pad_pos).rotate(rotate, pad_pos);

    if (!pad.includes("_drill")) {
      let text = new Turtle()
        .text(pad)
        .scale(padLabelSize)
        .originate()
        .translate(pad_pos);
      padsLabels.push( text );
    }

    layers.forEach(l => {
      if (l in results) results[l] = results[l].group(shape);
      else results[l] = shape;
    })
  }

  pads["center"] = translate;

  results.padLabels = padsLabels.reduce( (acc, cur) => acc.group(cur), new Turtle());

  return new Component({
    pads,
    layers: results
  })
}

export {
  wire,
  makeComponent,
}
