import { MM_PER_INCH } from "./constants.js";
import { global_state } from "./global_state.js";

const default_renderShapes_params = {
  shapes: [],
  limits: {
      x: [0, 1],
      y: [0, 1]
  },
  mm_per_unit: MM_PER_INCH,
}

export function renderShapes({ shapes, limits, mm_per_unit }) {
  if (shapes === undefined) shapes = default_renderShapes_params.shapes;
  if (limits === undefined) limits = default_renderShapes_params.limits;
  if (mm_per_unit === undefined) mm_per_unit = default_renderShapes_params.mm_per_unit;

  global_state.shapes = shapes;
  global_state.limits = limits;
  global_state.mm_per_unit = mm_per_unit;
}