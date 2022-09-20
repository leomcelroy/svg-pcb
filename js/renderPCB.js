import { global_state } from "./global_state.js";

const default_renderPCB_params = {
  pcb: null,
  layerColors: { "F.Cu": "#ff8c00cc" },
  limits: {
      x: [0, 1],
      y: [0, 1]
  },
  mm_per_unit: 25.4,
}

export function renderPCB({ pcb, layerColors, limits, mm_per_unit }) {
  if (pcb === undefined) console.log("renderPCB must include pcb param");

  if (layerColors === undefined) layerColors = default_renderPCB_params.layerColors;
  if (limits === undefined) limits = default_renderPCB_params.limits;
  if (mm_per_unit === undefined) mm_per_unit = default_renderPCB_params.mm_per_unit;

  const shapes = [];
  for (const layer in layerColors) {
    shapes.push({
      data: pcb.getLayer(layer), // could be pathData or text
      color: layerColors[layer],
      groupId: layer
    });
  }

  global_state.shapes = shapes; // TODO ??? what should the shape format be { d: path data string, color: hex or valid svg color, classes: []}
  global_state.limits = limits;
  global_state.mm_per_unit = mm_per_unit;

  // renders the outline not the interior
}