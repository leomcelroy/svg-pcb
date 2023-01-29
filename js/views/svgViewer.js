import { html, svg } from "lit-html";

import { drawGrid } from "./drawGrid.js";
import { drawPath } from "./drawPath.js";
import { drawHandles } from "./drawHandles.js";

const drawPt = ({ pt, start, end, text }, i, scale) => svg`
  <circle
    class="draggable-pt"
    cx=${pt[0]}
    cy=${pt[1]}
    r=${false ? 0.015 / (scale * 0.0015) : 0.015}
    data-index=${i}
    data-start=${start}
    data-end=${end}
    data-text=${text}></circle>
`

const drawP = ({ d, stroke, strokeWidth, fill }) => svg`
  <path d=${d} stroke=${stroke} stroke-width=${strokeWidth} fill=${fill}></path>
`
export const svgViewer = (state) => {
  const corners = state.panZoomParams?.corners();
  const scale = state.panZoomParams?.scale();

  const shapes = state.shapes.map(drawPath);
  const paths = state.paths.map(drawP);
  const pts = state.pts.map((pt, i) => drawPt(pt, i, scale));



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
          <g class="paths">${paths}</g>


        ${state.panZoomParams && state.gridSize > 0 && state.grid ? drawGrid(state.panZoomParams.corners(), state.gridSize) : ""}

        <rect
          class="limits no-download"
          width="${state.limits.x[1] - state.limits.x[0]}"
          height="${state.limits.y[1] - state.limits.y[0]}"
          stroke="black" fill="transparent" stroke-width="1"
          vector-effect="non-scaling-stroke"
          transform="translate(${state.limits.x[0]}, ${state.limits.y[0]})"/>
        <g class="pts no-download">${state.viewHandles ? pts : ""}</g>
      </g>

    </svg>
  `
}
