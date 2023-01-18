import { global_state } from "./global_state.js";

export function renderPath(path) {
  const d = path.d ?? "";
  const stroke = path.stroke ?? "black";
  const fill = path.fill ?? "none";
  const strokeWidth = path.strokeWidth ?? 0.03;
  const strokeLinecap = path.strokeLinecap ?? "round";
  const strokeLinejoin = path.strokeLinejoin ?? "round";

  global_state.paths.push({ d, stroke, fill, strokeWidth, strokeLinecap, strokeLinejoin });
}