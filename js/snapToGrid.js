import { global_state } from "./global_state.js";

const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);

export const snapToGrid = (n) => 
  global_state.gridSize === 0 || !global_state.grid 
    ? round(n, 3)
    : round(step(n, global_state.gridSize), 3);