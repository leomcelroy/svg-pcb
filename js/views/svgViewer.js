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

const drawP = ({ d, stroke, strokeWidth, fill, strokeLinecap, strokeLinejoin }) => svg`
  <path 
    d=${d} 
    stroke=${stroke} 
    stroke-linecap=${strokeLinecap}
    stroke-linejoin=${strokeLinejoin}
    stroke-width=${strokeWidth} 
    fill=${fill}></path>
`
export const svgViewer = (state) => {
  const corners = state.panZoomParams?.corners();
  const scale = state.panZoomParams?.scale();

  const shapes = state.shapes.map(drawPath);
  const paths = state.paths.map(drawP);
  const pts = state.pts.map((pt, i) => drawPt(pt, i, scale));



  return svg`
    <svg id="viewer" style="width: 100%; height: 100%; transform: scale(1, -1);">
      ${state.panZoomParams && state.gridSize > 0 && state.grid
        ? drawPattern(
                state.panZoomParams.x(), 
                state.panZoomParams.y(), 
                state.panZoomParams.scale(),
                state.panZoomParams.corners(),
                state.gridSize
              )
        : ""}

      <g class="transform-group">
          <rect 
            x=${state.limits.x[0]} 
            y=${state.limits.y[0]} 
            fill=${state.background} 
            width=${state.limits.x[1] - state.limits.x[0]} 
            height=${state.limits.y[1] - state.limits.y[0]}>
            </rect>
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


        ${state.panZoomParams && state.gridSize > 0 && state.grid && false
          ? drawGrid(state.panZoomParams.corners(), state.gridSize)
          : ""
        }

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

function drawPattern(x, y, scale, corners, gridSize) {
  const xLimits = [corners.lt.x, corners.rt.x];
  const xRange = Math.abs(xLimits[1] - xLimits[0]);
  const yLimits = [corners.lb.y, corners.lt.y];
  const yRange = Math.abs(yLimits[1] - yLimits[0]);

  return svg`
    <defs>
      <pattern
        id="grid"
        x="${x}"
        y="${y}"
        width="${scale*gridSize}"
        height="${scale*gridSize}"
        patternUnits="userSpaceOnUse">
        <line stroke="black" stroke-width=".2" x1="0" y1="0" x2="${scale*gridSize}" y2="0"></line>
        <line stroke="black" stroke-width=".2" x1="0" y1="0" x2="0" y2="${scale*gridSize}"></line>
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill="url(#grid)">
    </rect>
    <line 
      stroke="black" 
      stroke-width=".6" 
      x1=${(scale*corners.lt.x + x)} 
      y1=${y} 
      x2=${scale*corners.rt.x + x} 
      y2=${y}>
      </line>
    <line 
      stroke="black" 
      stroke-width=".6" 
      x1=${x} 
      y1=${(scale*corners.lb.y + y)} 
      x2=${x} 
      y2=${(scale*corners.lt.y + y)}>
      </line>
  `
}
