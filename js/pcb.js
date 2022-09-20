import { makeComponent } from "./pcb_helpers.js";
import { getPathData, scale, outline, union, path, offset2, boolean } from "/geogram/index.js";

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
      newComp.layers[layer].forEach( data => {
        this.addShape(layer, data);
      })
    }

    if (name !== "" && !name.includes("drill")) {
      // let componentLabels = makeText(name, transform.componentLabelSize, transform.translate, 0);

      this.addShape("componentLabels", {
        type: "text", 
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

  getLayer(layer, flatten = false) { 
    if (!(layer in this.layers)) {
      // console.error(`No layer with name: ${layer}`);
      return [];
    }

    const shapes = [];
    const texts = [];
    const wires = [];

    this.layers[layer].forEach( x => {

      if (x.type === "wire" && !flatten) {
        wires.push({
          type: "wire",
          data: getPathData(x.shape),
          thickness: x.thickness,
        });
      } else if (Array.isArray(x) || (x.type === "wire" && flatten)) {
        if (flatten && x.type === "wire") {
          boolean(shapes, offset2(x.shape, x.thickness/2), "union");
        } else if (flatten) {
          x.forEach( pl => boolean(shapes, [ pl ] , "union"));
        } else shapes.push(...x);
      } 
      else if (x.type === "text") texts.push(x);
      
    })

    // if (shapes.length > 0) scale(shapes, [1, -1]);

    return [
      getPathData(shapes),
      ...texts,
      ...wires
    ]
  }

  wire(pts, thickness, layer = "F.Cu") {
    const newWire = {
      type: "wire",
      shape: path(pts),
      thickness: thickness
    }
    this.addShape(layer, newWire);
  }
}
