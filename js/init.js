import { global_state } from "./global_state.js";
import { addEvents } from "./events.js";
import { dispatch } from "./dispatch.js";
import { urlToCode } from "./urlToCode.js";

export function init() {
  dispatch("RENDER");
  global_state.codemirror = document.querySelector(".code-editor");
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

    dispatch("RENDER");
}

function timeoutExperiments() {
  const wasteTime = async (res) => {
    for (let i = 0; i < 100000000; i++) 1+1;
    res("done");
  }

  // console.time("wasteTime");
  // wasteTime();
  // console.timeEnd("wasteTime");

          // const p1 = new Promise((res) => {
  //   dispatch("RUN");
  //   console.log("finished")
  //   res("p1");
  // });

  // const p1 = addTimeout(() => {
  //   wasteTime();
  //   return "p1";
  // }, 100);


  // const result = await Promise.race([p1, p2]);

  // const result = await addTimeout(() => {
  //   wasteTime();
  // }, 100)

  // console.log(result);

  const addTimeout = (fn, ms) => new Promise(async (res) => {
    new Promise(fn).then(() => res(true));
    setTimeout(() => res(false), ms);
  });

  const result = new Promise((resolve, reject) => {
    wasteTime(resolve);
    setTimeout(_ => reject('timeout'), 100);
  });

  console.log(result);
}









