import { dispatch } from "../dispatch.js";

export function addPathSelection(state, listener) {

  listener("click", ".cm-path-button", (e) => {
    let { pathStart, pathEnd } = e.target.dataset;
    pathStart = Number(pathStart);
    pathEnd = Number(pathEnd);
    const str = state.codemirror.view.state.doc.toString().slice(pathStart, pathEnd);

    state.selectedPath = {
      pathStart,
      pathEnd,
      str,
    }

    dispatch("RUN");
  })
}