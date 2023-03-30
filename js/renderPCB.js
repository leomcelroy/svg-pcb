import { MM_PER_INCH } from "./constants.js";
import { global_state } from "./global_state.js";

const default_renderPCB_params = {
  pcb: null,
  layerColors: { "F.Cu": "#ff8c00cc" },
  limits: {
      x: [0, 1],
      y: [0, 1]
  },
  mm_per_unit: MM_PER_INCH,
  background: "#00000000"
}

export const renderPCB = flatten => ({ pcb, layerColors, limits, mm_per_unit, background }) => {
  if (pcb === undefined) console.log("renderPCB must include pcb param");

  if (layerColors === undefined) layerColors = default_renderPCB_params.layerColors;
  if (limits === undefined) limits = default_renderPCB_params.limits;
  if (mm_per_unit === undefined) mm_per_unit = default_renderPCB_params.mm_per_unit;
  if (background === undefined) background = default_renderPCB_params.background;

  const shapes = [];
  for (const layer in layerColors) {
    shapes.push({
      data: pcb.getLayer(layer, flatten), // could be pathData or text
      color: layerColors[layer],
      groupId: layer
    });
  }

  global_state.pcb = pcb;
  global_state.shapes = shapes; // TODO ??? what should the shape format be { d: path data string, color: hex or valid svg color, classes: []}
  global_state.limits = limits;
  global_state.mm_per_unit = mm_per_unit;
  global_state.background = background;

  // renders the outline not the interior
}