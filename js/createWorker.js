

export function createWorker() {
  const worker = new Worker("js/evalWorker.js", { type: "module" });

  worker.addEventListener("message", e => {
    if (e.data === "done") {
      console.log(global_state);
      dispatch("RENDER");
    }
  })

  worker.addEventListener('error', (event) => {
    console.error(event);
    // worker = new Worker("js/evalWorker.js", { type: "module" });
  });

  return worker;
}
