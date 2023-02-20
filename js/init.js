import { global_state } from "./global_state.js";
import { addEvents } from "./events.js";
import { dispatch } from "./dispatch.js";
import { urlToCode } from "./urlToCode.js";
import { ensureSyntaxTree } from "@codemirror/language";

export function init() {
  dispatch("RENDER");
  global_state.codemirror = document.querySelector(".code-editor");

  // TODO: sometimes path widget not generated
  // global_state.codemirror.view.dispatch({});
  addEvents(global_state);

  const url = new URL(window.location.href);

    const search = window.location.search;
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
        changes: {from: 0, insert: saved ?? ""}
      });

      if (!dontRun) dispatch("RUN")

      document.querySelector(".center-button").click();
    }

    // const doc = global_state.codemirror.view.state.doc;
    // ensureSyntaxTree(global_state.codemirror.view.state, doc.length, 10000);

    dispatch("RENDER");
}







