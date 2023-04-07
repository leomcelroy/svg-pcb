import JSZip from "jszip";
import { saveAs } from "file-saver";
import { APP_NAME, MM_PER_INCH } from "../constants.js";

// KiCad Board File Format reference
// https://dev-docs.kicad.org/en/file-formats/sexpr-pcb/

/* TODO:
- [x] Create basic .kicad_pcb for download
- [x] Add wires
- [ ] Add footprint references
- [ ] Create footprints
- [ ] Add tests
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

  plotFootprints(footprintData) {
    console.log(footprintData);

    footprintData.forEach((el) => {
      const footprintName = el[0];
      const tstamp = getUUID();

      this.#body += `(footprint "${APP_NAME}:${footprintName}" (layer "F.Cu")\n`;
      this.#body += `(tstamp ${tstamp})\n`;
      this.#body += `(attr smd)\n`; // For now all footprints are surface mount
      
      // Add pads
      const padInfo = el[1];
      const padGraphics = el[2];
      
      Object.entries(padInfo).forEach(([key, val], i) => {
        const padNumber = val.index;
        const padType = 'smd'; // We consider all pads as smd at this point
        const padShape = 'custom'; // All shapes are custom for now
        const padPos = {
          x: inchesToMM(val.pos[0]).toFixed(3), 
          y: inchesToMM(val.pos[1]).toFixed(3)
        };
        const padSize = {w: 1, h: 1}; // TODO calculate this based on polygon data
        const pinFunction = key;
        const padTstamp = getUUID();
        const padLayers = [];
        val.layers.forEach((layer) => {
          const layerStr = `"${layer}"`;
          padLayers.push(layerStr);
          console.log(layerStr);
        });
        const padClearance = 'outline';
        const padAnchor = 'rect';
        const padPrimitives = [];
        
        // We need to get real values out of SVG shape
        const pts = [];
        const re = /(M|L)[^0-9-.]*(-?[0-9.]+),(-?[0-9.]+)/gm;
        const match = val.shape.match(re);
        match.forEach((pt) => {
          const re = /(M|L)[^0-9-.]*(-?[0-9.]+),(-?[0-9.]+)/;
          const match = pt.match(re);
          const x = inchesToMM(parseFloat(match[2])).toFixed(3);
          const y = inchesToMM(parseFloat(match[3])).toFixed(3);
          pts.push({x: x, y: y});
        });
        
        // Here we plot the custom polygon shape for current pad we are looping over
        let primitive = `(gr_poly (pts`;
        pts.forEach((pt) => {
          primitive += ` (xy ${pt.x} ${pt.y})`;
        });
        primitive += `) (width 0) (fill yes))`;
        padPrimitives.push(primitive);
        
        this.#body += `(pad "${padNumber}" ${padType} ${padShape} (at ${padPos.x} ${padPos.y}) (size ${padSize.w} ${padSize.h}) (layers ${padLayers.join(' ')}) (pinfunction "${pinFunction}") (tstamp ${padTstamp}) (options (clearance ${padClearance}) (anchor ${padAnchor}) ) (primitives ${padPrimitives.join(' ')}))\n`;
      });
      
      this.#body += `)\n`;
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

  const footprints = state.footprints;
  boardFile.plotFootprints(footprints);

  zip.file( `${projectName}.kicad_pcb`, boardFile.toString() );
  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "Untitled" : state.name}-KiCad.zip`);
    });
}