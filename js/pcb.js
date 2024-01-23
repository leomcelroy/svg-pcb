import { makeComponent } from "./pcb_helpers.js";
import { getPathData, expand, scale, outline, union, xor, path, path2, offset, offset2, boolean } from "/geogram/index.js";
import { makeRandStr } from "./makeRandStr.js"

export class PCB {
  constructor() {
    this.layers = {}; // maybe should just store shapes, get layer contents on demand
    this.components = [];
    this.ids = [];

    this.netList = [];
  }

  add(footprint, ops = {}) {
    
    const label = ops.label || "";

    const options = {
      translate: ops.translate || [0, 0],
      rotate: ops.rotate || 0,
      padLabelSize: ops.padLabelSize || 0.02,
      componentLabelSize: ops.componentLabelSize || 0.025,
      flip: ops.flip || false,
      id: ops.id || `_${makeRandStr(8)}`,
    };

    if (this.getComponent(options.id) !== undefined) {
      throw new Error(`id not unique: ${ops.id}`);
      return;
    }

    const newComp = makeComponent(footprint, options);

    for (const layer in newComp.layers) {
      newComp.layers[layer].forEach(data => {
        this.addShape(layer, data);
      })
    }

    if (label !== "") {
      // let componentLabels = makeText(label, options.componentLabelSize, options.translate, 0);

      this.addShape("componentLabels", {
        type: "text", 
        value: label,  
        translate: options.translate,
        rotate: 0,
        size: options.componentLabelSize
      });
    }

    this.components.push(newComp);
    this.ids.push(options.id);

    return newComp;
  }

  getComponent(id) {
    return this.components.find(x => x.id === id);
  }

  query(id, padName = "", xy = "") { // layer
    const comp = this.getComponent(id);

    if (padName === "") return comp;

    const pad = comp.pad(padName);

    if (xy === "") return pad;

    if (["x", "y"].some(val => val === xy)) {
      
    }

    if (xy === "x") return pad[0];
    if (xy === "y") return pad[1];

    throw new Error(`xy param must be "x" or "y"`);
    return undefined;
  }

  addShape(layer, shapeOrText) {
    if (shapeOrText[0] && (typeof shapeOrText[0][0] === "number")) {
      shapeOrText = [ shapeOrText ];
    } 

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

      if (x.type === "wire") {
        wires.push({
          type: "wire",
          data: getPathData(x.shape),
          thickness: x.thickness,
          shape: x.shape
        });
      } else if (Array.isArray(x)) {
        shapes.push(x)
      } else if (x.type === "text") {
        texts.push(x);
      }
    })

    const unioned = () => union(
      ...shapes, 
      ...wires.map( 
        w => offset2(
          JSON.parse(JSON.stringify(w.shape)), 
          w.thickness/2, 
          {
            endType: "etOpenRound", 
            jointType:"jtRound", 
          })
        )
    ) ?? [];

    const shapeString = () => shapes.reduce((acc, cur) => {

      if (cur.length === 0) return acc;

      const newD = getPathData(cur);
      return acc + newD;
    }, "");

    return flatten 
      ? [ getPathData(unioned()), ...texts ] 
      : [
          ...shapes.map(getPathData),
          ...texts,
          ...wires
        ]
  }

  setNetList(...newNetList) {
    newNetList.forEach(group => {
      group.forEach(item => {
        const [ comp, pad ] = item;
        const constructor = comp.constructor.name;
        if (constructor === "Component") item[0] = comp.id;
      })
    })
    
    this.netList = newNetList;

    return newNetList;
  }

  wire(pts, thickness, layer = "F.Cu") {
    // if (pts.length <= 1) return;
    if (pts.length === 0) return;
    const newWire = {
      type: "wire",
      shape: [ pts ], // TODO: seems like this shouldn't be wrapped in another array
      thickness: thickness
    }
    this.addShape(layer, newWire);
  }
}
