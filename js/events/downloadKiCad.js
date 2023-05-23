import JSZip from "jszip";
import { saveAs } from "file-saver";
import { APP_NAME, MM_PER_INCH } from "../constants.js";
import { pathD } from "../../geogram/index.js";

// KiCad Board File Format reference
// https://dev-docs.kicad.org/en/file-formats/sexpr-pcb/

/* TODO:
- [x] Create basic .kicad_pcb for download
- [x] Add wires
- [x] Add footprints
- [ ] Optimize class interface (single call with options should do)
- [ ] Add tests
- [ ] Add bool option for pads as polygons or primitive shapes
- [ ] Add bool option for primitive shape pads as circles or rects
*/

export const BOARD_THICKNESS = 1.6; // This is in millimeters according to KiCad spec
export const PAPER_SIZE = 'User'; // This will take into account the width and height values below
export const PAPER_SIZE_WIDTH = 297;
export const PAPER_SIZE_HEIGTH = 210;
export const KICAD_PCB_VERSION = '20221018'; // Maybe this could be set to make it KiCad 6 compatible
export const PAD_TO_MASK_CLEARANCE = 0;

// This should be a global function
export function inchesToMM(inches){
  return inches * MM_PER_INCH;
}

// Simple enum (kind of)
export const KiCadPadPrimitiveShape = Object.freeze({
  RECTANGLE: 'rect', // These should match KiCad sexpr spec
  CIRCLE: 'circle',
});

export const KiCadPadShapeType = Object.freeze({
  PRIMITIVE: 'PRIMITIVE',
  POLYGON: 'POLYGON',
});

export class KiCadBoardFileOptions {
  #libraryName = "SvgPcb"; // Footprint library name to specify to make KiCad update footprints process easier.
  #padShapeType = KiCadPadShapeType.POLYGON; // true: draw pads as primitive shapes. false: draw pads as polygons, but primitive shapes will still be there.
  #padPrimitiveShape = KiCadPadPrimitiveShape.RECTANGLE;
  
  constructor(options = {}) {
    if (options.libraryName) {
      this.#libraryName = options.libraryName;
      this.#padShapeType = options.padShapeType;
    }
  }

  get libraryName() {
    return this.#libraryName;
  }

  get padShapeType() {
    return this.#padShapeType;
  }

  get padPrimitiveShape() {
    return this.#padPrimitiveShape;
  }
}

export class KiCadBoardFileBuilder {
  #body = "";
  #options = new KiCadBoardFileOptions();

  constructor(options) {
    this.#body = "";
    this.#options = options;
  }

  #getHeader() {
    // The version here is the KiCad version this file should be compatible with
    let str = `(kicad_pcb (version ${KICAD_PCB_VERSION}) (generator ${APP_NAME})\n`;

    // Add general section with board thickness
    str += `(general\n`;
    str += `(thickness ${BOARD_THICKNESS})\n`;
    str += `)\n`; // Add comment after closing bracket for ease of testing

    // Add page settings, paper size
    str += `(paper "${PAPER_SIZE}" ${PAPER_SIZE_WIDTH} ${PAPER_SIZE_HEIGTH})\n`;

    // Add layers
    str += `(layers\n`;
    str += `(0 "F.Cu" signal)\n`;
    str += `(31 "B.Cu" signal)\n`;
    str += `(36 "B.SilkS" user)\n`;
    str += `(37 "F.SilkS" user)\n`;
    str += `(38 "B.Mask" user)\n`;
    str += `(39 "F.Mask" user)\n`;
    str += `(44 "Edge.Cuts" user)\n`;
    str += `)\n`;

    // Add setup section
    str += `(setup\n`;
    str += `(pad_to_mask_clearance ${PAD_TO_MASK_CLEARANCE})\n`;
    str += `)\n`;

    // Add nets section
    str += `(net 0 "")\n`;

    return str;
  }

  #getFooter() {
    return ")";
  }

  #svgToPoints(svgString) {

    // BUG: may have more than one path

    const points = pathD([], svgString)[0]
      .map(pt => {
        const point = {
          x: inchesToMM(pt[0]),
          y: inchesToMM(pt[1])
        }
        return point;
      });
    
    return points;
  }

  #getSizeFromPoints(points) {
    const min = { x: 0, y: 0 };
    const max = { x: 0, y: 0 };
    points.forEach((pt) => {
      min.x = pt.x < min.x ? pt.x : min.x;
      min.y = pt.y < min.y ? pt.y : min.y;
      max.x = pt.x > max.x ? pt.x : max.x;
      max.y = pt.y > max.y ? pt.y : max.y
    });
    const size = {
      w: Math.abs(max.x - min.x),
      h: Math.abs(max.y - min.y)
    }
    return size;
  }

  plotWires(layerData, layerName) {
    const wires = [];
    layerData.forEach((el) => {
      if (el.type === 'wire') {
        wires.push(el);
      }
    });

    wires.forEach((wire) => {
      const width = inchesToMM(wire.thickness).toFixed(3);
      const layer = layerName;
      const net = 0;
      const shape = wire.shape;

      shape.forEach((polyline) => {
        for (let i = 0; i < polyline.length - 1; i++) {
          const startX = inchesToMM(polyline[i][0]).toFixed(3);
          const startY = (inchesToMM(-polyline[i][1]) + PAPER_SIZE_HEIGTH).toFixed(3);
          const endX = inchesToMM(polyline[i+1][0]).toFixed(3);
          const endY = (inchesToMM(-polyline[i+1][1]) + PAPER_SIZE_HEIGTH).toFixed(3);
          const tstamp = crypto.randomUUID();
          this.#body += `(segment (start ${startX} ${startY}) (end ${endX} ${endY}) (width ${width}) (layer "${layer}") (net ${net}) (tstamp ${tstamp}))\n`;
        }
      });
    });
  }

  plotComponents(state) {
    const componentData = state.pcb.components;

    // Separate vias from components
    const compData = []; 
    const viaData = [];
    Object.values(componentData).forEach((comp) => {
      const keys = Object.keys(comp.footprint);
      if (keys.includes('via')) {
        viaData.push(comp);
      } else {
        compData.push(comp);
      }
    });

    // Wrangle components before adding to KiCad file
    const components = Object.values(compData).map((val) => {
      const component = {
        id: val.id,
        reference: state.idToName[val.id] ?? "",
        footprint: val.label ?? "",
        position: {
          x: inchesToMM(val._pos[0]).toFixed(3),
          y: (inchesToMM(-val._pos[1]) + PAPER_SIZE_HEIGTH).toFixed(3)
        },
        rotation: val.rotation,
        layer: Object.values(val.footprint)[0].layers[0],
        pads: Object.entries(val.footprint).map(([key, val]) => {
          const pad = {
            number: val.index,
            name: key,
            position: {
              x: inchesToMM(val.pos[0]).toFixed(3),
              y: inchesToMM(-val.pos[1]).toFixed(3)
            },
            shape: this.#svgToPoints(val.shape),
            layers: val.layers,
            size: this.#getSizeFromPoints(this.#svgToPoints(val.shape))
          };
          return pad;
        })
      }
      return component;
    });

    console.log(components);

    // Add footprint entries to KiCad board file
    components.forEach((component) => {
      const footprintTstamp = component.id;
      const footprintName = component.footprint;
      const footprintPos = component.position;
      const footprintRotation = component.rotation;

      this.#body += `(footprint "${this.#options.libraryName}:${footprintName}" (layer "${component.layer}")\n`;
      this.#body += `(tstamp ${footprintTstamp})\n`;
      this.#body += `(at ${footprintPos.x} ${footprintPos.y} ${footprintRotation})`; 
      this.#body += `(attr smd)\n`; // For now all footprints are surface mount

      // Add reference designator
      const refDesTstamp = crypto.randomUUID();
      this.#body += `(fp_text reference "${component.reference}" (at 0 0) (layer "F.SilkS")(effects (font (size 1 1) (thickness 0.15))) (tstamp ${refDesTstamp}))`;

      component.pads.forEach((pad) => {
        const padTstamp = crypto.randomUUID();
        const padLayers = pad.layers.map((layer) => {
          return `"${layer}"`;
        });

        // Add additional layers for KiCad
        padLayers.push(`"F.Mask"`);
        padLayers.push(`"F.Paste"`);

        let primitive = "";
        if (this.#options.padShapeType === KiCadPadShapeType.POLYGON) {
          primitive = `(gr_poly (pts`; 
          pad.shape.forEach((pt) => {
            primitive += ` (xy ${pt.x.toFixed(3)} ${pt.y.toFixed(3)})`;
          });
          primitive += `) (width 0) (fill yes))`;
        }

        const anchor = state.downloadKiCadOptions.padPrimitiveShape;
        const shape = state.downloadKiCadOptions.padShapeType === KiCadPadShapeType.POLYGON 
          ? "custom"
          : state.downloadKiCadOptions.padPrimitiveShape;
        
        this.#body += `(pad "${pad.number}" smd ${shape} (at ${pad.position.x} ${pad.position.y} ${footprintRotation}) (size ${Math.min(pad.size.w, pad.size.h).toFixed(3)} ${Math.min(pad.size.w, pad.size.h).toFixed(3)}) (layers ${padLayers.join(' ')}) (pinfunction "${pad.name}") (tstamp ${padTstamp}) (options (clearance 0) (anchor ${anchor}) ) (primitives ${primitive}))\n`;
      });

      this.#body += `)\n`; // Closing footprint definition
    });

    // Wrangle vias
    const vias = Object.values(viaData).map((comp) => {
      const via = {
        position: {
          x: inchesToMM(comp._pos[0]).toFixed(3),
          y: (inchesToMM(-comp._pos[1]) + PAPER_SIZE_HEIGTH).toFixed(3)
        }, 
        size: this.#getSizeFromPoints(this.#svgToPoints(comp.footprint.via.shape)).w.toFixed(3),
        drill: inchesToMM(comp.footprint.via.drill.diameter).toFixed(3),
        tstamp: comp.id
      };
      return via;
    });

    vias.forEach((via) => {
      this.#body += `(via (at ${via.position.x} ${via.position.y}) (size ${via.size}) (drill ${via.drill}) (layers "F.Cu" "B.Cu") (net 0) (tstamp ${via.tstamp}))\n`;
    });
  }

  plotOutline(outlineLayer) {
    const shapes = outlineLayer[0];
    shapes.forEach((shape) => {
      const ptFirst = shape[0];
      const ptLast = shape[shape.length-1];
      
      if (ptFirst[0] !== ptLast[0] || ptFirst[1] !== ptLast[1]) {
        shape.push(ptFirst); // Add first point as last if it is not like that already
      }

      for (let i = 0; i < shape.length - 1; i++) {
        const ptStart = shape[i];
        const ptEnd = shape[i+1];
        const lineStart = {
          x: inchesToMM(ptStart[0]).toFixed(3),
          y: (inchesToMM(-ptStart[1]) + PAPER_SIZE_HEIGTH).toFixed(3)
        }
        const lineEnd = {
          x: inchesToMM(ptEnd[0]).toFixed(3),
          y: (inchesToMM(-ptEnd[1]) + PAPER_SIZE_HEIGTH).toFixed(3)
        }
        const lineTstamp = crypto.randomUUID();

        this.#body += `(gr_line (start ${lineStart.x} ${lineStart.y}) (end ${lineEnd.x} ${lineEnd.y})\n`;
        this.#body += `(stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp ${lineTstamp}))\n`;
      }
    });
  }

  plot(state) {
    const layers = state.pcb.layers;

    if (layers["F.Cu"]) { 
      this.plotWires(layers["F.Cu"], "F.Cu");
    }

    if (layers["B.Cu"]) {
      this.plotWires(layers["B.Cu"], "B.Cu");
    }

    if (layers["interior"]) {
      this.plotOutline(layers["interior"]);
    }

    this.plotComponents(state);
  }

  toString() {
    let str = this.#getHeader();
    str += this.#body;
    str += this.#getFooter();
    return str;
  }
}

export function downloadKiCad(state) {
  const zip = new JSZip();
  const projectName = (state.name === "" ? "Untitled" : state.name);
  const boardFileOptions = new KiCadBoardFileOptions({
    libraryName: state.downloadKiCadOptions.footprintLibraryName,
    padShapeType: state.downloadKiCadOptions.padShapeType
  });
  const boardFile = new KiCadBoardFileBuilder(boardFileOptions);

  boardFile.plot(state);

  zip.file( `${projectName}.kicad_pcb`, boardFile.toString() );
  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "Untitled" : state.name}-KiCad.zip`);
    });
}