import { makeComponent, makeText } from "./pcb_helpers.js";
import { wire } from "./wire.js";
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
      padLabelSize: ops.padLabelSize || 0.03,
      componentLabelSize: ops.componentLabelSize || 0.04,
    };

    const newComp = makeComponent(footprint, transform);

    for ( const layer in newComp.layers) {
      this.addShape(layer, newComp.layers[layer]);
    }

    if (name !== "" && !name.includes("drill")) {
      let componentLabels = makeText(name, transform.componentLabelSize, transform.translate, 0);

      this.addShape("componentLabels", componentLabels);
    }

    this.components.push(newComp);

    return newComp;
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

  getLayer(layer, flatten = null) { // returns array of path data
    flatten = flatten ?? !["padLabels", "componentLabels"].includes(layer);

    return this.layers[layer]
      ? flatten
        ? this.layers[layer].flatten().getPathData() // TODO: this flatten is a bottleneck
        : this.layers[layer].getPathData()
      : "";
  }

  wire(pts, thickness, layer = "F.Cu") {
    this.addShape(layer, wire(pts, thickness));
  }
}
