import * as esprima from "esprima";
import { Parser } from "acorn";

const boardNameRe = /(const|let|var)([^=]*)=\s*new\s+PCB\s*\(\s*\)/;

let boardName = string.match(boardNameRe);
boardName = boardName ? boardName[2].trim() : null;

if (boardName) FUNCTIONS_STATIC_INFO.push(`${boardName}.add`);
if (boardName) FUNCTIONS_STATIC_INFO.push(`${boardName}.wire`);

const FUNCTIONS_STATIC_INFO = ["pt", "path", "input", "footprint", "renderPCB"];

let tree;
console.time("ESPRIMA");
tree = esprima.parse(string, { range: true, comment: true }).body[0];
console.timeEnd("ESPRIMA");

console.time("ACORN");
tree = Parser.parse(string);
console.log("acorn", tree);
console.timeEnd("ACORN");

Parser.extend(myPlugin);

function myPlugin(Parser) {
  return class extends Parser {
    parsePropertyValue(prop, refDestructuringErrors) {
      // Check if the property key is 'translate'
      if (prop.key.type === "Identifier" && prop.key.name === "translate") {
        // Check if the value is an array
        if (prop.value.type !== "ArrayExpression") {
          throw new SyntaxError("Expected 'translate' to be an array");
        }
      }

      return super.parsePropertyValue(prop, refDestructuringErrors);
    }
  };
}

class PCB {
  constructor() {
    this.components = [];
    this.wires = [];
    this.netlist = []; // nets?
    this.shapes = [];

    this._cache = {
      // holes: [],
      // processedFootprints: {}, // geometry is transformed, path string is polylines, flipped stuff is flipped
      // footprintShapes: {},
      componentLabels: [],
      padLabels: [],
      layers: {}
      // componentBoundingBoxes: {},
    };
  }

  addComponent({ footprint, id, translate, rotate, flip }) {}

  addNet({ name, pads }) {
    // merge with existing net of same name
  }

  addShape({ shape, layer }) {}

  addWire({ points, thickness, layer }) {}

  getLayer(flatten = false) {}

  getComponent(id) {}

  toJSON() {

  }

  fromJSON() {

  }
}

class Component {
  constructor() {

    this.boundingBox = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };
    this._cache = {
      footprintShapes: [],
    };
  }

  pad() {}

  padX() {}

  padY() {}

  pos() {}

  posX() {}

  posY() {}

}

function via(
  diameterHole, 
  diameterCopper, 
  layers = ["F.Cu", "B.Cu"]
) {
  return {
    via: {
      pos: [0, 0],
      layers: layers,
      shape: getPathData(circle(diameterCopper / 2)),
      drill: {
        diameter: diameterHole,
        start: layers[0],
        end: layers[1],
        plated: true,
      },
    },
  };
}
