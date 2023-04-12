import { global_state } from "./global_state.js";
import { addEvents } from "./events.js";
import { dispatch } from "./dispatch.js";
import { urlToCode } from "./urlToCode.js";
import { initCodeMirror } from "./codemirror/codemirror.js"
import { defaultText, basicSetup } from "./defaultText.js";
import { logError } from "./logError.js";
import { downloadText } from "./events/download.js";

export function init() {
  dispatch("RENDER");
  const search = window.location.search;
  const turnOnVim = new URLSearchParams(search).get("neil") === "true";

  global_state.vimMode = turnOnVim;
  const cmEl = document.querySelector(".code-editor");
  global_state.codemirror = initCodeMirror(cmEl, turnOnVim);

  addEvents(global_state);

  const url = new URL(window.location.href);

  const code = new URLSearchParams(search).get("code");
  const file = new URLSearchParams(search).get("file");
  const handlesOff = new URLSearchParams(search).get("bezier") === "false";
  const gridOff = new URLSearchParams(search).get("grid") === "false";
  const dontRun = new URLSearchParams(search).get("run") === "false";


  if (handlesOff) global_state.viewHandles = false;
  if (gridOff) global_state.grid = false;


  if (code) {

  } else if (file) {
      let file_url = file;
      if (!file.startsWith("http")) file_url = `examples/${file}`;

      urlToCode(file_url, global_state);
  } else { // should check before running this
    const saved = window.localStorage.getItem("svg-pcb");
    global_state.codemirror.view.dispatch({
      changes: {from: 0, insert: saved ?? defaultText }
    });


    if (!dontRun) dispatch("RUN")

    document.querySelector(".center-button").click();
  }

  const programString = global_state
    .codemirror
    .view
    .state
    .doc
    .toString();

  const version = programString.match(/@version\s*:\s*(v[\S]+)/);
  if (version) {
    const uploadedVersion = version[1];
    const currentProgramVersion = global_state.version;
    // if mismatch then do something
    if (uploadedVersion !== currentProgramVersion) logError(`Version mismatch:\nFile expects version ${uploadedVersion}.\nEditor is version ${currentProgramVersion}`);
  }

  dispatch("RENDER");

  // for lingdong
  window.exportNet = exportNet;
}

function exportNet() {
  if (!global_state.pcb) {
    console.log("No pcb in state.");
    return;
  }

  const pcb = global_state.pcb;

  const components = {};

  pcb.components.map(x => {
    if (x.id === "") {
      console.log("Assign board.add(...) to variable or pass id in object parameters.")
    }


    components[x.refDes] = { pads: x.padShapes, pos: x._pos, padPositions: x.pads };
  });

  const obj = { components, netList: pcb._netList };

  const string = JSON.stringify(obj);

  console.log(obj);

  downloadText("netList.json", string, false);
}







