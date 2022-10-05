import { pathD, getPathData, circle, rectangle, translate as trans, rotate as rot, outline } from "/geogram/index.js";

const length = ([x1, y1], [x2, y2]) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);

const via = (rv, rp) => {
  return {
    "F": {
      "pos": [0, 0],
      "shape": getPathData(circle(rp)),
      "layers": ["F.Cu"],
      "index": 1
    },
    "B": {
      "pos": [0, 0],
      "shape": getPathData(circle(rp)),
      "layers": ["B.Cu"],
      "index": 2
    },
    "drill": {
      "pos": [0, 0],
      "shape": getPathData(circle(rv)),
      "layers": ["drill"]
    }
  };
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

// function makeText(text, height, pos, rotate) {
//   let lines = text.split('\n');
//   let t = new Turtle();

//   for (let [i, txt] of lines.entries()) {
//     if (txt.length == 0) {
//       continue;
//     }

//     if (txt.localeCompare("A") == 0) {
//         txt = "A ";
//     }

//     // TODO: render text better
//     let t2 = new Turtle().text(txt).scale(0.01*height).originate().translate([0, i*height*1.5]);
//     // let t2 = new Turtle();

//     t.group(t2);
//   }

//   // return t.originate().translate(pos);
//   return t.originate().translate(pos).rotate(rotate, pos);
// }

function makeComponent(comp, options = {}) {
  let translate = options.translate || [0, 0];
  let rotate = options.rotate || 0;
  let padLabelSize = options.padLabelSize || 0.02;
  // add flip

  const [xOff, yOff] = translate;
  const rad = (rotate * Math.PI) / 180;

  const pads = {}; // name: pos
  const padsLabels = [];
  let results = {};

  for (const pad in comp) {
    let { pos, shape, layers, origin } = comp[pad];

    if (typeof shape === "string") shape = pathD([], shape);

    let offset = [pos[0], pos[1]];
    if (origin !== undefined) {
      offset[0] = origin[0];
      offset[1] = origin[1];
    }
    trans(shape, offset)
    trans(shape, translate)
    rot(shape, rotate, translate);

    let pad_pos = vector_add(vector_rotate(pos, rad), translate);
    pads[pad] = pad_pos;

    if (!pad.includes("drill")) {
      // let text = makeText(pad, padLabelSize, pad_pos, rotate);
      padsLabels.push({
        type: "text",
        value: pad,
        translate: pad_pos,
        rotate,
        size: padLabelSize
      });
    }

    layers.forEach(l => {
      if (l in results) results[l].push(shape);
      else results[l] = [shape];
    })
  }

  pads["center"] = translate;

  results.padLabels = padsLabels;

  return new Component({
    pads,
    layers: results
  })
}

export {
  // makeText,
  makeComponent,
  via
}
