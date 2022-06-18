import { makeComponent } from "./pcb_helpers.js";
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
    // if (!(shape instanceof Turtle)) return console.error("Shape isn't Turtle.");

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

    const turtle = new Turtle();
    const texts = [];

    this.layers[layer].forEach( x => {
      if (x instanceof Turtle) turtle.group(x);
      else texts.push(x);
    })

    return [
      flatten 
        ? turtle.flatten().getPathData()
        : turtle.getPathData(), 
      ...texts
    ]
  }

  wire(pts, thickness, layer = "F.Cu") {
    this.addShape(layer, wire(pts, thickness));
  }
}
