import { global_state } from "./global_state.js";

export const snapToPad = function(pt) {
  if (!global_state.snapToPad) return pt;

  pt.snapped = false;

  const components = global_state.pcb.components;
  const refDeses = global_state.pcb.refDeses;
  for (let i = 0; i < components.length; i++) {
    const comp = components[i];
    const refDes = refDeses[i];

    const pads = comp.pads;
    for (const pad in pads) {
      const p = pads[pad];
      const dx = Math.abs(pt.x - p[0]);
      const dy = Math.abs(pt.y - p[1]);

      // This selection area is off.
      // Best would be to compare against the actual shape of the pad.
      if (Math.sqrt(dx**2 + dy**2) < global_state.snapToPadRadius) {
        pt.x = parseFloat(p[0]).toFixed(3);
        pt.y = parseFloat(p[1]).toFixed(3);
        pt.snapped = true;
        pt.padRef = (refDes !== "") ? `${refDes}.pad("${pad}")` : `pt(${pt.x}, ${pt.y})`;
        break;
      }
    }
  }

  return pt;
};