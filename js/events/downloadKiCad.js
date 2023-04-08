import JSZip from "jszip";
import { saveAs } from "file-saver";
import { APP_NAME, MM_PER_INCH } from "../constants.js";

// KiCad Board File Format reference
// https://dev-docs.kicad.org/en/file-formats/sexpr-pcb/

/* TODO:
- [x] Create basic .kicad_pcb for download
- [x] Add wires
- [ ] Add footprints
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
    return ") ;; kicad_pcb";
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

  plotComponents(componentData) {

    // Gather all the data we need to add footprint entries to KiCad board file
    const components = [];
    componentData.forEach((comp) => {
      const component = {
        position: comp.pads.center,
        layers: ['"F.Cu"'],
        pads: []
      }

      // Combine pad name, shape and location into KiCad compat pad object
      const padDataArr = [];
      Object.entries(comp.pads).forEach(([key, val], i) => {
        if (key === 'center') return;
        const padInfo = {
          number: i + 1,
          label: key,
          position: val,
          shapes: comp.layers["F.Cu"][i]
        };
        component.pads.push(padInfo);
      });

      components.push(component);
    });

    // Add footprint entrie to KiCad board file
    components.forEach((component) => {
      const footprintName = getUUID(); // No linkage to original footprint, thats why a random uuid
      const footprintTstamp = getUUID();
      const footprintPos = {
        x: inchesToMM(component.position[0]).toFixed(3),
        y: -inchesToMM(component.position[1]).toFixed(3)
      }

      this.#body += `(footprint "${APP_NAME}:${footprintName}" (layer "F.Cu")\n`;
      this.#body += `(tstamp ${footprintTstamp})\n`;
      this.#body += `(at ${footprintPos.x} ${footprintPos.y})`; // Footprint center, I suppose
      this.#body += `(attr smd)\n`; // For now all footprints are surface mount

      component.pads.forEach((pad) => {
        const padPos = {
          x: inchesToMM(pad.position[0]).toFixed(3),
          y: -inchesToMM(pad.position[1]).toFixed(3)
        };
        
        const padTstamp = getUUID();
        const min = {x: 0, y: 0}; // For pad size calculation
        const max = {x: 0, y: 0};
        const padPrimitives = [];
        
        pad.shapes.forEach((shape) => {
          let primitive = `(gr_poly (pts`;
          
          shape.forEach((pt) => {
            const pos = {
              x: inchesToMM(pt[0]).toFixed(3) - padPos.x,
              y: -inchesToMM(pt[1]).toFixed(3) - padPos.y
            }
            
            min.x = pos.x < min.x ? pos.x : min.x; // We need to determine max extents of the pad
            min.y = pos.y < min.y ? pos.y : min.y;
            max.x = pos.x > max.x ? pos.x : max.x;
            max.y = pos.y > max.y ? pos.y : max.y;
            primitive += ` (xy ${pos.x} ${pos.y})`;
          });
          
          primitive += `) (width 0) (fill yes))`;
          padPrimitives.push(primitive);
        });

        const padSize = {
          w: Math.abs(max.x - min.x),
          h: Math.abs(max.y - min.y)
        }

        this.#body += `(pad "${pad.number}" smd custom (at ${padPos.x - footprintPos.x} ${padPos.y - footprintPos.y}) (size ${Math.min(padSize.w, padSize.h)} ${Math.min(padSize.w, padSize.h)}) (layers ${component.layers.join(' ')}) (pinfunction "${pad.label}") (tstamp ${padTstamp}) (options (clearance 0) (anchor rect) ) (primitives ${padPrimitives.join(' ')}))\n`;
      });

      this.#body += `)\n`; // Closing footprint definition
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
  boardFile.plotWires(layers["F.Cu"], "F.Cu");

  const components = state.pcb.components;
  boardFile.plotComponents(components);

  zip.file( `${projectName}.kicad_pcb`, boardFile.toString() );
  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "Untitled" : state.name}-KiCad.zip`);
    });
}