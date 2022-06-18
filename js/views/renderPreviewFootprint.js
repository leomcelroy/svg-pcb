import { html, svg } from "lit-html";
import { getPathData } from "/geogram/index.js";

export const renderPreviewFootprint = ([name, footprint, svgView], pos) => {
  // <svg width="30" height="30">
  //  <circle cx="15" cy="15" r="10" stroke="grey" stroke-width="4" fill="yellow" />
  // </svg>

  // <div class="footprint-item-icon" data-index=${i} ></div>

  const [ x, y ] = pos;
  return html`
    <style>
      .path-footprint-dragged {
        fill: black;
      }
    </style>

    <svg 
      style="position: absolute; left: ${x}; top: ${y}; transform: translate(-50%, -50%);"
      width="50px"
      height="50px">
      <path
          class="path-footprint-dragged" 
          d="${getPathData(svgView)}"
          fill-rule="nonzero"
          />
    </svg>

  `
}