import JSZip from "jszip";
import { saveAs } from "file-saver";
import { MM_PER_INCH } from "../constants.js";

// KiCad Board File Format reference
// https://dev-docs.kicad.org/en/file-formats/sexpr-pcb/

/* TODO:
- [ ] Create basic .kicad_pcb for download
- [ ] Add wires
- [ ] Add footprint references
- [ ] Create footprints
- [ ] Add tests
*/

// This should be a global function
function inchesToMM(inches){
  return inches * MM_PER_INCH;
}

function getVersionYYYYMMDD() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

class BoardFileBuilder {
  #body = ";; contents of board file...\n";
  #header = "(kicad_pcb\n  (version " + getVersionYYYYMMDD() + ")\n  (generator SvgPcb)\n";
  #footer = ")";

  #getHeader() {
    let str = '';

    str += "(kicad_pcb\n";
      
    // Add date and time of generation.
    const version = getVersionYYYYMMDD();
    str += `  (version ${version})\n`;
    str += `  (generator SvgPcb)\n`;

    return str;
  }

  #getFooter() {
    return ")";
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
  const boardFile = new BoardFileBuilder();
  const projectName = (state.name === "" ? "Untitled" : state.name);

  zip.file( `${projectName}.kicad_pcb`, boardFile.toString() );
  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "Untitled" : state.name}-KiCad.zip`);
    });
}