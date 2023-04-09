import { global_state } from "./global_state.js";
import { dispatch } from "./dispatch.js";

export function clearSelectedPath() {
  global_state.selectedPathIndex = -1; 
  global_state.selectedPath = null; 

  dispatch("RENDER");
}