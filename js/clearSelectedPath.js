import { global_state } from "./global_state.js";
import { dispatch } from "./dispatch.js";

export function clearSelectedPath() {
  global_state.selectedPathIndex = -1; 
  global_state.selectedPath = null; 

  // need to run to update wire menu view
  dispatch("RUN");
}