import { makeComponent } from "./pcb_helpers.js";
import { getPathData, expand, scale, outline, union, xor, path, path2, offset, offset2, boolean } from "/geogram/index.js";

export class PCB {
  constructor() {
    this.layers = {}; // maybe should just store shapes, get layer contents on demand
    this.components = [];
    this.refDeses = [];
  }

  add(footprint, ops = {}) {
    // ops = { translate, rotate, padLabelSize, componentLabelSize, value? }
    const name = ops.name || "";

    const options = {
      translate: ops.translate || [0, 0],
      rotate: ops.rotate || 0,
      padLabelSize: ops.padLabelSize || 0.02,
      componentLabelSize: ops.componentLabelSize || 0.025,
      flip: ops.flip || false
    };

    // if (typeof footprint === "string") {
    //   const textFootprint = {
    //     type: "text",
    //     silkscreen: true,
    //     value: footprint,
    //     translate: ops.translate,
    //     rotate: ops.rotate,
    //     flip: ops.flip,
    //     size: Math.max(ops.size, 0)
    //   }

    //   const layer = ops.flip
    //     ? "B.Silkscreen"
    //     : "F.Silkscreen"

    //   this.addShape(layer, textFootprint);

    //   return {
    //     pad() {
    //       return undefined;
    //     },
    //     padX() {
    //       return undefined;
    //     },
    //     padY() {
    //       return undefined;
    //     },
    //     get pos() {
    //       return ops.translate;
    //     },
    //     get posX() {
    //       return ops.translate[0];
    //     },
    //     get posY() {
    //       return ops.translate[1];
    //     }
    //   };
    // }


    const newComp = makeComponent(footprint, options);

    for (const layer in newComp.layers) {
      newComp.layers[layer].forEach(data => {
        this.addShape(layer, data);
      })
    }

    if (name !== "" && !name.includes("drill")) {
      // let componentLabels = makeText(name, options.componentLabelSize, options.translate, 0);

      this.addShape("componentLabels", {
        type: "text", 
        value: name,  
        translate: options.translate,
        rotate: 0,
        size: options.componentLabelSize
      });
    }

    this.components.push(newComp);
    this.refDeses.push(ops.refDes || "");

    return newComp;
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
          w.shape, 
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

  // components({ name: obj })
  // renderPCB -> render()
}
