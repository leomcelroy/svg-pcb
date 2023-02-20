import { global_state } from "./global_state.js";
import { dispatch } from "./dispatch.js";

export function clearSelectedPath() {
  global_state.selectedPath = null; 
  // const selections = global_state.codemirror.view.state.selection.ranges;
  // global_state.codemirror.view.dispatch({
  //   selection: { anchor: 0 }
  // })

  dispatch("RENDER");
}