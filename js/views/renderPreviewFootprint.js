import { html, svg } from "lit-html";
import { getPathData } from "/geogram/index.js";

export const renderPreviewFootprint = ({ svgView }, pos) => {
  // <svg width="30" height="30">
  //  <circle cx="15" cy="15" r="10" stroke="grey" stroke-width="4" fill="yellow" />
  // </svg>

  // <div class="footprint-item-icon" data-index=${i} ></div>

  const renderComp = pts => svg`
    <path
      class="path-footprint"
      d="${getPathData([pts])}"
      fill-rule="nonzero"
      />
  `

  const [ x, y ] = pos;
  return html`
    <style>
      .path-footprint-dragged {
        fill: black;
      }
    </style>

    <svg 
      style="position: absolute; left: ${x}; top: ${y}; transform: translate(-50%, -50%) scale(1, -1);"
      width="50px"
      height="50px">
      ${svgView.map(renderComp)}
    </svg>

  `
}
