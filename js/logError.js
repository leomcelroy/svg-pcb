import { global_state } from "./global_state.js";
import { dispatch } from "./dispatch.js";


export function logError(error) {
  global_state.error = error;
  console.log(error);
  dispatch("RENDER");
}