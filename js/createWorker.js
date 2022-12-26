import { global_state } from "./global_state.js"; 
import { dispatch } from "./dispatch.js"; 

export function createWorker() {
  let worker = new Worker("js/evalWorker.js", { type: "module" });

  worker.running = false;

  worker.run = (msg) => {
    worker.running = true;
    worker.postMessage(msg);
  }

  worker.addEventListener("message", e => {
    if (e.data === "done") {
      worker.running = false;
    }
  })

  worker.addEventListener('error', (event) => {
    console.error(event);
  });


  return worker;
}
