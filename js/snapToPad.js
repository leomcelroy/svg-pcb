import { global_state } from "./global_state.js";

export const snapToPad = function(pt) {
  if (!global_state.snapPad) return pt;

  const components = global_state.pcb.components;
  for (const comp in components) {
    const pads = components[comp].pads;
    for (const pad in pads) {
      const p = pads[pad];
      const dx = Math.abs(pt.x - p[0]);
      const dy = Math.abs(pt.y - p[1]);
      if (dx < 0.05 && dy < 0.05) {
        pt.x = parseFloat(p[0]).toFixed(3);
        pt.y = parseFloat(p[1]).toFixed(3);
        break;
      }
    }
  }

  return pt;
};