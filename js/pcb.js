import { makeComponent, wire } from "./pcb_helpers.js";
import { Turtle } from "./Turtle.js";

export class PCB {
  constructor() {
    this.layers = {}; // maybe should just store shapes, get layer contents on demand
    this.components = [];
  }

  add(footprint, ops = {}) {
    // ops = { translate, rotate, padLabelSize, componentLabelSize, value? }
    const name = ops.name || "";
    const transform = {
      translate: ops.translate || [0, 0],
      rotate: ops.rotate || 0,
      padLabelSize: ops.padLabelSize || 0.0003,
      componentLabelSize: ops.componentLabelSize || 0.0004,
    };

    const newComp = makeComponent(footprint, transform);

    for ( const layer in newComp.layers) {
      this.addShape(layer, newComp.layers[layer]);
    }

    if (name !== "" && !name.includes("_drill")) {
      let componentLabels = new Turtle()
        .text(name)
        .scale(transform.componentLabelSize)
        .originate()
        .translate(transform.translate);

      // let componentLabels = ["text", name];

      this.addShape("componentLabels", componentLabels);
    }

    this.components.push(newComp);

    return newComp;
  }

  via(pos, rv, rp, name) {
    let VIA = {
      "1": {
        "pos": [0, 0],
        "shape": new Turtle().circle(rp).getPathData(),
        "layers": ["F.Cu"],
        "index": 1
      },
      "2": {
        "pos": [0, 0],
        "shape": new Turtle().circle(rp).getPathData(),
        "layers": ["B.Cu"],
        "index": 2
      },
      "drill": {
        "pos": [0, 0],
        "shape": new Turtle().circle(rv).getPathData(),
        "layers": ["drill"]
      },
    }

    return this.add(VIA, {translate: pos, name: name});
  }

  addShape(layer, shape) {
    if (!(shape instanceof Turtle)) return console.error("Shape isn't Turtle.");

    if (layer in this.layers) {
      this.layers[layer] = this.layers[layer].group(shape);
    } else {
      this.layers[layer] = shape;
    }

    return this.layers[layer];
  }

  subtractShape(layer, shape) {
    if (!(shape instanceof Turtle)) return console.error("Shape isn't Turtle.");

    if (layer in this.layers) {
      this.layers[layer] = this.layers[layer].difference(shape);
    } else {
      this.layers[layer] = new Turtle();
    }

    return this.layers[layer];
  }

  getLayer(layer, flatten = false) {
    const paths = layer.includes("Labels");
    // flatten = false; // !layer.includes("Labels");
    flatten = !layer.includes("Labels");

    return this.layers[layer]
      ? flatten
        ? this.layers[layer].flatten().getPathData(paths)
        : this.layers[layer].getPathData(paths)
      : "";
  }

  wire(pts, thickness, layer = "F.Cu") {
    this.addShape(layer, wire(pts, thickness));
  }

}
