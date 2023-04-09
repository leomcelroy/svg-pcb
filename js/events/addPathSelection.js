import { dispatch } from "../dispatch.js";

export function addPathSelection(state, listener) {

  listener("click", ".cm-path-button", (e) => {
    let { pathStart } = e.target.dataset;
    pathStart = Number(pathStart);

    state.selectedPath = {
      from: pathStart
    }

    dispatch("RUN");
  })
}