import { makeComponent } from "./pcb_helpers.js";
import { wire } from "./wire.js";
import { getPathData, scale, outline, union } from "/geogram/index.js";

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
      newComp.layers[layer].forEach( shapeOrText => {
        this.addShape(layer, shapeOrText);
      })
    }

    if (name !== "" && !name.includes("drill")) {
      // let componentLabels = makeText(name, transform.componentLabelSize, transform.translate, 0);

      this.addShape("componentLabels", { 
        value: name,  
        translate: transform.translate,
        rotate: 0,
        size: transform.componentLabelSize
      });
    }

    this.components.push(newComp);

    return newComp;
  }

  addShape(layer, shapeOrText) {

    if (layer in this.layers) {
      this.layers[layer].push(shapeOrText);
    } else {
      this.layers[layer] = [shapeOrText];
    }

    return this.layers[layer];
  }

  getLayer(layer, flatten = false) { // returns array of path data
    if (!(layer in this.layers)) {
      // console.error(`No layer with name: ${layer}`);
      return [];
    }

    const shapes = [];
    const texts = [];
    // const wires = [];

    this.layers[layer].forEach( x => {
      if (Array.isArray(x)) {
        if (flatten) union(shapes, x);
        else shapes.push(...x);
      } else texts.push(x);
    })

    // if (shapes.length > 0) scale(shapes, [1, -1]);

    return [
      getPathData(shapes), 
      ...texts
    ]
  }

  wire(pts, thickness, layer = "F.Cu") {
    this.addShape(layer, wire(pts, thickness));
  }
}
