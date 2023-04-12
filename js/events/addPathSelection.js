import { dispatch } from "../dispatch.js";

export function addPathSelection(state, listener) {

  listener("click", ".cm-path-button", (e) => {

    if (state.selectedPathIndex >= 0) {
      state.selectedPathIndex = -1;
      dispatch("RENDER");
    }

    let { pathStart } = e.target.dataset;

    const selectablePath = document.querySelector(`.pathStart-${pathStart}`);
    if (!selectablePath) return;

    const index = [...selectablePath.classList].find(x => x.match(/pathIndex-\d+/)).split("-")[1];

    state.selectedPathIndex = Number(index);
    state.heldKeys = new Set();
    dispatch("RUN");
  })
}