import { html, svg } from "lit-html";

export const drawPath = ({ d, color, groupId = ""}) => {

  const renderDataString = s => svg`
    <path
        d="${s}"
        fill-rule="nonzero"
        fill=${color}/>
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