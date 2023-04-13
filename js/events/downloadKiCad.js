import JSZip from "jszip";
import { saveAs } from "file-saver";
import { APP_NAME, MM_PER_INCH } from "../constants.js";

// KiCad Board File Format reference
// https://dev-docs.kicad.org/en/file-formats/sexpr-pcb/

/* TODO:
- [x] Create basic .kicad_pcb for download
- [x] Add wires
- [x] Add footprints
- [ ] Add tests
- [ ] Add bool option for pads as polygons or primitive shapes
- [ ] Add bool option for primitive shape pads as circles or rects
*/

export const BOARD_THICKNESS = 1.6; // This is in millimeters according to KiCad spec
export const PAPER_SIZE = 'A4';
export const KICAD_PCB_VERSION = '20221018';
export const PAD_TO_MASK_CLEARANCE = 0;

// This should be a global function
export function inchesToMM(inches){
  return inches * MM_PER_INCH;
}

// We use these UUIDs for KiCad line segments and other elements
const uuids = [];
export function getUUID() {
  let uuid = '';
  while (uuids.includes(uuid) || uuid === '') {
    uuid = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
  }
  uuids.push(uuid);
  return uuid;
}

export class KiCadBoardFileBuilder {
  #body = "";

  #getHeader() {
    // The version here is the KiCad version this file should be compatible with
    let str = `(kicad_pcb (version ${KICAD_PCB_VERSION}) (generator SvgPcb)\n`;

    // Add general section with board thickness
    str += `(general\n`;
    str += `(thickness ${BOARD_THICKNESS})\n`;
    str += `)\n`; // Add comment after closing bracket for ease of testing

    // Add page settings, paper size
    str += `(paper "${PAPER_SIZE}")\n`;

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
    const re = /(M|L)[^0-9-.]*(-?[0-9.]+),(-?[0-9.]+)/gm;
    const points = svgString.match(re);

    const shape = points.map((ptString) => {
      const re = /(M|L)[^0-9-.]*(-?[0-9.]+),(-?[0-9.]+)/;
      const match = ptString.match(re);
      const point = {
        x: inchesToMM(match[2]).toFixed(3),
        y: inchesToMM(match[3]).toFixed(3)
      }
      return point;
    });
    
    return shape;
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
          const startY = inchesToMM(-polyline[i][1]).toFixed(3);
          const endX = inchesToMM(polyline[i+1][0]).toFixed(3);
          const endY = inchesToMM(-polyline[i+1][1]).toFixed(3);
          const tstamp = getUUID();
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
      if (keys.includes('F') && keys.includes('B') && keys.includes('drill')) {
        viaData.push(comp);
      } else {
        compData.push(comp);
      }
    });

    // Wrangle components before adding to KiCad file
    const components = Object.values(compData).map((val) => {
      const component = {
        reference: state.idToName[`${val.id}`],
        position: {
          x: inchesToMM(val._pos[0]).toFixed(3),
          y: inchesToMM(-val._pos[1]).toFixed(3)
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

    // Add footprint entries to KiCad board file
    components.forEach((component) => {
      const footprintName = getUUID(); // No linkage to original footprint, thats why a random uuid
      const footprintTstamp = getUUID();
      const footprintPos = component.position;
      const footprintRotation = component.rotation;

      this.#body += `(footprint "${APP_NAME}:${footprintName}" (layer "${component.layer}")\n`;
      this.#body += `(tstamp ${footprintTstamp})\n`;
      this.#body += `(at ${footprintPos.x} ${footprintPos.y} ${footprintRotation})`; 
      this.#body += `(attr smd)\n`; // For now all footprints are surface mount

      // Add reference designator
      const refDesTstamp = getUUID();
      this.#body += `(fp_text reference "${component.reference}" (at 0 0) (layer "F.SilkS")(effects (font (size 1 1) (thickness 0.15))) (tstamp ${refDesTstamp}))`;

      component.pads.forEach((pad) => {
        const padTstamp = getUUID();
        const padLayers = pad.layers.map((layer) => {
          return `"${layer}"`;
        });

        // Add additional layers for KiCad
        padLayers.push(`"F.Mask"`);
        padLayers.push(`"F.Paste"`);

        let primitive = `(gr_poly (pts`; 
        pad.shape.forEach((pt) => {
          primitive += ` (xy ${pt.x} ${pt.y})`;
        });
          
        primitive += `) (width 0) (fill yes))`;
        this.#body += `(pad "${pad.number}" smd custom (at ${pad.position.x} ${pad.position.y} ${footprintRotation}) (size ${Math.min(pad.size.w, pad.size.h)} ${Math.min(pad.size.w, pad.size.h)}) (layers ${padLayers.join(' ')}) (pinfunction "${pad.name}") (tstamp ${padTstamp}) (options (clearance 0) (anchor rect) ) (primitives ${primitive}))\n`;
      });

      this.#body += `)\n`; // Closing footprint definition
    });

    // Wrangle vias
    const vias = Object.values(viaData).map((comp) => {
      const via = {
        position: {
          x: inchesToMM(comp.pos[0]).toFixed(3),
          y: inchesToMM(-comp.pos[1]).toFixed(3)
        }, 
        size: this.#getSizeFromPoints(this.#svgToPoints(comp.footprint.F.shape)).w,
        drill: this.#getSizeFromPoints(this.#svgToPoints(comp.footprint.drill.shape)).w,
        tstamp: getUUID()
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
          y: inchesToMM(-ptStart[1]).toFixed(3)
        }
        const lineEnd = {
          x: inchesToMM(ptEnd[0]).toFixed(3),
          y: inchesToMM(-ptEnd[1]).toFixed(3)
        }
        const lineTstamp = getUUID();

        this.#body += `(gr_line (start ${lineStart.x} ${lineStart.y}) (end ${lineEnd.x} ${lineEnd.y})\n`;
        this.#body += `(stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp ${lineTstamp}))\n`;
      }
    });
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
  const boardFile = new KiCadBoardFileBuilder();
  const projectName = (state.name === "" ? "Untitled" : state.name);

  const layers = state.pcb.layers;

  if (layers["F.Cu"]) { 
    boardFile.plotWires(layers["F.Cu"], "F.Cu");
  }
  
  if (layers["B.Cu"]) {
    boardFile.plotWires(layers["B.Cu"], "B.Cu");
  }

  if (layers["interior"]) {
    boardFile.plotOutline(layers["interior"]);
  }

  boardFile.plotComponents(state);

  zip.file( `${projectName}.kicad_pcb`, boardFile.toString() );
  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "Untitled" : state.name}-KiCad.zip`);
    });
}