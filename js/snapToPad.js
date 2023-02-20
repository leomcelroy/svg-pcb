import { global_state } from "./global_state.js";

export const snapToPad = (valPad, valInit) => 
   !global_state.snapPad 
     ? parseFloat(valInit).toFixed(3) 
     : parseFloat(valPad).toFixed(3);