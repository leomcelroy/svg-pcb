import { html, svg } from "lit-html";

import { drawGrid } from "./drawGrid.js";
import { drawPath } from "./drawPath.js";
import { drawHandles } from "./drawHandles.js";

export const svgViewer = (state) => {
  const shapes = state.shapes.map(p => drawPath(p))
  
  const corners = state.panZoomParams?.corners();

  return svg`
    <svg id="viewer" style="width: 100%; height: 100%; transform: scale(1, -1);">
      <g class="transform-group">
            ${ state.selectBox.start && state.selectBox.end ? svg`
              <path
                class="selectBox"
                d="
                  M ${state.selectBox.start.x} ${state.selectBox.start.y}
                  L ${state.selectBox.end.x} ${state.selectBox.start.y}
                  L ${state.selectBox.end.x} ${state.selectBox.end.y}
                  L ${state.selectBox.start.x} ${state.selectBox.end.y}
                "
              />` : ""
            }
          <g class="shapes">${shapes}</g>
        ${state.panZoomParams && state.gridSize > 0 && state.grid ? drawGrid(state.panZoomParams.corners(), state.gridSize) : ""}

        <rect
          class="limits no-download"
          width="${state.limits.x[1] - state.limits.x[0]}"
          height="${state.limits.y[1] - state.limits.y[0]}"
          stroke="black" fill="transparent" stroke-width="1"
          vector-effect="non-scaling-stroke"
          transform="translate(${state.limits.x[0]}, ${state.limits.y[0]})"/>
        ${state.storedPCB && state.viewHandles ? drawHandles(state.storedPCB) : ""}
      </g>

    </svg>
  `
}