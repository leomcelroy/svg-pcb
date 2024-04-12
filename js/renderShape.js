import { global_state } from "./global_state.js";
import { getPathData } from "../geogram/index.js";

export function renderShape(shape, ops = {}) {
  const d = getPathData(shape);
  const stroke = ops.stroke ?? "black";
  const fill = ops.fill ?? "none";
  const strokeWidth = ops.strokeWidth ?? 0.03;
  const strokeLinecap = ops.strokeLinecap ?? "round";
  const strokeLinejoin = ops.strokeLinejoin ?? "round";

  global_state.paths.push({ d, stroke, fill, strokeWidth, strokeLinecap, strokeLinejoin });
}