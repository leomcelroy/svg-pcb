import { svg } from '../libs/lit-html.js';

const last = arr => arr[arr.length - 1];

export function drawTurtle(turtle, { showTurtles = true, showPoints = false, filterConstruction = false } = {}) {
  const paths = turtle.pathMap((x, i) => drawPath(
    x,
    showPoints, 
    filterConstruction,
  ))

  return showTurtles ? [...paths, drawTurtleHead(turtle)] : paths;
}

function drawTurtleHead(turtle) {
  const points = turtle.points;
  const lastPoint = last(points);
  const angle = turtle.angle;

  const drawingViews = document.getElementById("inner-svg-view");
  const w = Number(drawingViews.getAttribute("width").replace("px", ""));
  const viewBox = drawingViews.getAttribute("viewBox").split(" ");
  const vw = Number(viewBox[2]);
  const headScale = vw/w;
  const turtleSize = 12

  return svg`
    <g transform="scale(1, -1)">
      <polyline
          class="scale-with-viewer"
          fill = "orange"
          vector-effect="non-scaling-stroke"
          points="
            ${lastPoint.x - turtleSize/2}, ${lastPoint.y - turtleSize} 
            ${lastPoint.x}, ${lastPoint.y} 
            ${lastPoint.x + turtleSize/2}, ${lastPoint.y - turtleSize}
          "
          transform="
            rotate(${angle - 90}) 
            scale(${headScale})
          "
          transform-origin="${lastPoint.x} ${lastPoint.y}"/>
    </g>
  `
}

const drawPath = (path, showPoints, filterConstruction) => {
  if (path.construction && filterConstruction) return "";
  let points = path.points.reduce((acc, point) => acc + ` ${point.x},${point.y}`, " ");

  let polyline = svg`
    <g transform="scale(1, -1)">
      <polyline 
        points="${points}" 
        fill=${path.fillColor} 
        stroke=${path.strokeColor}
        stroke-width="${path.strokeWidth}px"
        stroke-dasharray="${path.dashed ? path.dashed : "none"}"
        stroke-linejoin=${path.linejoin}
        stroke-linecap=${path.linecap}
        vector-effect="non-scaling-stroke"/>
      ${showPoints 
        ? path.points.map((p) => svg`
            <circle 
              cx="${p.x}" 
              cy="${p.y}" 
              r="0.05" 
              stroke="black" 
              stroke-width="0" 
              fill="red"/>
          `) 
        : ""
      }
    </g>
  `;

  return polyline;
};