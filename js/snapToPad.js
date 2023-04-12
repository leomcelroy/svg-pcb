import { global_state } from "./global_state.js";

export function snapToPad(pt) {
  if (!global_state.snapToPad) return pt;
  if (!global_state.pcb) return pt;

  pt.snapped = false;

  const components = global_state.pcb.components;
  const ids = global_state.pcb.ids;
  for (let i = 0; i < components.length; i++) {
    const comp = components[i];

    // get variable name
    const id = ids[i];
    const refDes = global_state.idToName[id] || "";

    const pads = comp.pads;
    for (const pad in pads) {
      const p = pads[pad];
      const dx = Math.abs(pt.x - p[0]);
      const dy = Math.abs(pt.y - p[1]);

      // This selection area is off.
      // Best would be to compare against the actual shape of the pad.
      if (Math.sqrt(dx**2 + dy**2) < global_state.snapToPadRadius) {
        pt.x = p[0];
        pt.y = p[1];
        pt.snapped = true;
        pt.padRef = (refDes !== "") ? `${refDes}.pad("${pad}")` : `[${pt.x.toFixed(3)}, ${pt.y.toFixed(3)}]`;
        break;
      }
    }
  }

  return pt;
};