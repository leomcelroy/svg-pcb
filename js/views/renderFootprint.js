import { html, svg } from "lit-html";
import { getPathData } from "/geogram/index.js";




export const renderFootprint = ({ name, svgView }, i) => {
      // <svg width="30" height="30">
      //  <circle cx="15" cy="15" r="10" stroke="grey" stroke-width="4" fill="yellow" />
      // </svg>

      // <div class="footprint-item-icon" data-index=${i} ></div>

  const renderComp = pts => svg`
    <path
      class="path-footprint"
      data-index=${i}
      data-key=${name}
      d="${getPathData([pts])}"
      fill-rule="nonzero"
      />
  `

  return html`
    <style>
      .path-footprint {
        fill: black;
      }

      .footprint-svg:hover .path-footprint {
        fill: orange;
      }
    </style>
    <div class="footprint-item">
      <svg
        data-index=${i}
        data-key=${name}
        class="footprint-svg footprint-${i}"
        width="50px"
        height="50px"
        transform="scale(1, -1)">
        ${svgView.map(renderComp)}
      </svg>
      <span style="padding-left: 5px;">${name}</span>
    </div>
  `
}
