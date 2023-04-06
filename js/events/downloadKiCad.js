import JSZip from "jszip";
import { saveAs } from "file-saver";
import { MM_PER_INCH } from "../constants.js";

// KiCad Board File Format reference
// https://dev-docs.kicad.org/en/file-formats/sexpr-pcb/

/* TODO:
- [x] Create basic .kicad_pcb for download
- [ ] Add wires
- [ ] Add footprint references
- [ ] Create footprints
- [ ] Add tests
*/

export const BOARD_THICKNESS = 1.6; // This is in millimeters according to KiCad spec
export const PAPER_SIZE = 'A4';

// This should be a global function
export function inchesToMM(inches){
  return inches * MM_PER_INCH;
}

export function getVersionYYYYMMDD() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

export class KiCadBoardFileBuilder {
  #body = ";; contents of board file...\n";
  #header = "(kicad_pcb\n  (version " + getVersionYYYYMMDD() + ")\n  (generator SvgPcb)\n";
  #footer = ")";

  #getHeader() {
    let str = '';

    str += "(kicad_pcb\n";
      
    // Add date and time of generation.
    const version = getVersionYYYYMMDD();
    str += `(version ${version})\n`;
    str += `(generator SvgPcb)\n`;

    // Add general section with board thickness
    str += `(general\n`;
    str += `(thickness ${BOARD_THICKNESS})\n`;
    str += `) ;; general\n`; // Add comment after closing bracket for ease of testing

    // Add page settings, paper size
    str += `(paper "${PAPER_SIZE}") ;; paper\n`;

    // Add layers
    str += `(layers\n`;
    str += `(0 "F.Cu" signal)\n`;
    str += `(31 "B.Cu" signal)\n`;
    str += `(38 "B.Mask" user)\n`;
    str += `(39 "F.Mask" user)\n`;
    str += `(44 "Edge.Cuts" user)\n`;
    str += `) ;; layers\n`;

    // Add setup section
    str += `(setup\n`;
    str += `(pad_to_mask_clearance 0)\n`;
    str += `) ;; setup\n`;

    // Add nets section
    str += `(net 0 "")\n`;

    return str;
  }

  #getFooter() {
    return ") ;; kicad_pcb";
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

  zip.file( `${projectName}.kicad_pcb`, boardFile.toString() );
  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "Untitled" : state.name}-KiCad.zip`);
    });
}