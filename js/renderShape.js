import { global_state } from "./global_state.js";
import { getPathData } from "../geogram/index.js";

export function renderShape(shape) {
  const d = getPathData(shape.shape);
  const stroke = shape.stroke ?? "black";
  const fill = shape.fill ?? "none";
  const strokeWidth = shape.strokeWidth ?? 0.03;
  const strokeLinecap = shape.strokeLinecap ?? "round";
  const strokeLinejoin = shape.strokeLinejoin ?? "round";

  global_state.paths.push({ d, stroke, fill, strokeWidth, strokeLinecap, strokeLinejoin });
}