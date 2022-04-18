import { html, svg } from "lit-html";

function hexToRgb(hex) {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export const drawPath = ({ d, color, groupId = ""}) => {
  const alpha = parseInt(color.slice(-2), 16) / 255;

  const renderDataString = s => svg`
    <path
        d="${s}"
        fill-rule="nonzero"
        fill="${color.slice(0, -2)}"
        fill-opacity=${alpha}/>
  `


  if (["padLabels", "componentLabels"].includes(groupId)) {
    return svg`<g id=${groupId}>${renderDataString(d)}</g>`
  }

  const pathDataStrings = d.split(/(?=M)/g);

  return svg`
    <g id=${groupId}>
      ${pathDataStrings.map(renderDataString)}
    </g>
  `
}
