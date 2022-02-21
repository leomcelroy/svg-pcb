import { html, svg } from "lit-html";

export const renderFootprint = ([name, footprint, svgView], i) => {
      // <svg width="30" height="30">
      //  <circle cx="15" cy="15" r="10" stroke="grey" stroke-width="4" fill="yellow" />
      // </svg>

      // <div class="footprint-item-icon" data-index=${i} ></div>

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
        class="footprint-svg footprint-${i}" 
        width="50px"
        height="50px">
        <path
            class="path-footprint"
            data-index=${i} 
            d="${svgView.getPathData()}"
            fill-rule="nonzero"
            />
      </svg>
      <span style="padding-left: 5px;">${name}</span>
    </div>
  `
}