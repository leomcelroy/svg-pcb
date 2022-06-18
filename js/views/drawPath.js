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

export const drawPath = ({ data, color, groupId = ""}) => {
  const alpha = parseInt(color.slice(-2), 16) / 255;

  // why did I need to add this scale
  const renderDataString = s => svg`
    <path
        d="${s}"
        fill-rule="nonzero"
        fill="${color.slice(0, -2)}"
        fill-opacity=${alpha}/>
  `

  const renderText = s => svg`
    <text 
      text-anchor="middle" 
      x=${s.translate[0]} 
      y=${-s.translate[1] + s.size*0.352778}
      transform=${`scale(1 -1)`}
      style=${`font: ${s.size}pt sans-serif;`}
      fill=${color.slice(0, -2)}
      opacity=${alpha}
      >
      ${s.value}
    </text>
  `


  const toRender = [];

  data.forEach(d => {
    if (typeof d === "string") { // pathData
      d.split(/(?=M)/g).forEach(dstring => {
        toRender.push(renderDataString(dstring));
      });
    } else { // text
      toRender.push(renderText(d));
    }
  })

  return svg`
    <g id=${groupId}>
      ${toRender}
    </g>
  `
}
