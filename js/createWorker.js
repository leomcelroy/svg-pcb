import { global_state } from "./global_state.js"; 
import { dispatch } from "./dispatch.js"; 
import { renderShapes } from "./renderShapes.js";

export function createWorker() {
  let worker = new Worker("js/evalWorker.js", { type: "module" });

  worker.running = false;

  worker.run = (msg) => {
    worker.running = true;
    worker.postMessage(msg);
  }

  worker.addEventListener("message", e => {
    if (e.data.done === true) {
      worker.running = false;
    }

    if (e.data.renderPCB === true) {
      worker.running = false;
      global_state.pts = e.data.pts;
      global_state.shapes = e.data.shapes;
      global_state.limits = e.data.limits;
      global_state.mm_per_unit = e.data.mm_per_unit;
      dispatch("RENDER");
    }
  })

  worker.addEventListener('error', (event) => {
    console.error(event);
  });


  return worker;
}
