import { html, svg } from "lit-html";
import { pathToCubics } from "../path.js";
import { drawGrid } from "./drawGrid.js";
import { drawPath } from "./drawPath.js";
import { drawHandles } from "./drawHandles.js";

const drawPt = ({ pt, start, end, text }, i, scale) => svg`
  <circle
    class="draggable-pt"
    cx=${pt[0]}
    cy=${pt[1]}
    r=${true ? 0.01 / (scale * 0.0015) : 0.01}
    data-index=${i}
    data-start=${start}
    data-end=${end}
    data-text=${text}></circle>
`

const drawP = ({ d, stroke, fillRule, strokeWidth, fill, strokeLinecap, strokeLinejoin }) => svg`
  <path 
    d=${d} 
    stroke=${stroke} 
    stroke-linecap=${strokeLinecap}
    stroke-linejoin=${strokeLinejoin}
    stroke-width=${strokeWidth} 
    fill-rule=${fillRule} 
    fill=${fill}></path>
`
export const svgViewer = (state) => {
  const corners = state.panZoomParams?.corners();
  const scale = state.panZoomParams?.scale();

  const drills = [];

  const visibleLayers = state.layers
    ? state.layers.reduce((acc, cur) => cur.length === 3 ? [...acc, cur[1][0].value] : acc, [])
    : [];

  const interiorVisible = visibleLayers.some(layer => layer.includes("interior"));

  if (state.pcb) state.pcb.components.forEach(component => {
    component.drills.forEach(x => {
      drills.push(svg`
        <circle
          fill="white"
          cx=${x.pos[0]}
          cy=${x.pos[1]}
          r=${x.diameter/2}/>
        `)
    })
  })

  const drillLayer = svg`
    <g class="drills">${interiorVisible ? drills : ""}</g>
  `
  
  const labels = state.shapes.filter(x => ["componentLabels", "padLabels"].includes(x.groupId));
  const notLabels = state.shapes.filter(x => !["componentLabels", "padLabels"].includes(x.groupId));
  
  const shapes = [
    ...notLabels.map(drawPath),
    drillLayer,
    ...labels.map(drawPath),
  ]

  const paths = state.paths.map(drawP);
  const pts = state.pts.map((pt, i) => drawPt(pt, i, scale));

  const selectablePaths = [];

  state.selectablePaths.forEach( ([key, path], i) => {
    if (state.selectedPathIndex >= 0) return;

    const ops = {
      "class": [
        `selectable-path`, 
        `pathStart-${key}`,
        `pathIndex-${i}`
      ]
    }

    const template = renderPath(pathToCubics(path).cubics, ops);
    selectablePaths.push(template);
  })

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
            class="limits"
            width="${state.limits.x[1] - state.limits.x[0]}"
            height="${state.limits.y[1] - state.limits.y[0]}"
            stroke="black" fill="transparent" stroke-width="1"
            vector-effect="non-scaling-stroke"
            transform="translate(${state.limits.x[0]}, ${state.limits.y[0]})"/>

          <rect 
            class="background"
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
          <g class="selectable-paths">${selectablePaths}</g>
          ${renderSelectedPath(state, scale)}

          ${state.panZoomParams && state.gridSize > 0 && state.grid && false
            ? drawGrid(state.panZoomParams.corners(), state.gridSize)
            : ""
          }


        <g class="pts">${state.viewHandles ? pts : ""}</g>
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

function renderSelectedPath(state, scale) {
  const path = state.selectedPath;
  if (state.selectedPathIndex < 0 || !path || !path.args) return "";
  return [
    renderPath(pathToCubics(path.args).cubics),
    drawPreview(state),
    renderPts(path.args, scale),
  ]
}

function renderPath(path, attributes = {}) {
  const attributesDefault = {
    "stroke": "plum",
    "stroke-width": "5",
    "vector-effect": "non-scaling-stroke",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "fill": "none",
    "class": []
  }

  attributes = {...attributesDefault, ...attributes};

  let d = "";

  path.forEach((cmd, cmdIndex) => {
    const [p0, h0, h1, p1] = cmd;
    const start = cmdIndex === 0 ? `M ${p0[0]} ${p0[1]}` : "";
    d += `${start} C ${h0[0]} ${h0[1]}, ${h1[0]} ${h1[1]}, ${p1[0]} ${p1[1]} `;
  });

  let attributesString = "";

  for (const attribute in attributes) {
    const value = attributes[attribute];
    attributesString += `${attribute}="${value}" `
  }

  return svg`
    <path
      d=${d}
      class=${attributes["class"].join(" ")}
      stroke=${attributes["stroke"]}
      stroke-width=${attributes["stroke-width"]}
      vector-effect=${attributes["vector-effect"]}
      stroke-linecap=${attributes["stroke-linecap"]}
      stroke-linejoin=${attributes["stroke-linejoin"]}
      fill=${attributes["fill"]}
      />
  `;
};

function cmdType(cmd) {
  if (typeof cmd[0] === "number") return "point";
  else return cmd[0];
}

function ptToCircle(pt, scale, ops = {}) { 
  return svg`
    <circle
      cx=${pt[0]}
      cy=${pt[1]}
      class="path-pt"
      r=${0.01 / (scale * 0.0015)}
      display=${ops.display ?? "inherit"}
      fill=${ops.fill ?? "black"}
      stroke-width="0.15"
      vector-effect="non-scaling-stroke"
      stroke="black"
      data-index=${ops.index}
      data-type=${ops.type}
    >`;
}

function renderPts(path, scale) {
  let result = [];

  const pointDisplay = "inherit";
  // global_state["viewMode"] === "none" ? "none" : "inherit";
  const handleDisplay = "inherit";
  // global_state["viewMode"] === "handles" ? "inherit" : "none";

  path.forEach((cmd, cmdIndex) => {
    const pathcmd = `${cmdIndex}`;
    const type = cmdType(cmd);

    if (type === "point") {
      // Draw just a point
      result.push(
        ptToCircle(cmd, scale, {
          display: pointDisplay,
          index: pathcmd,
          type: "point",
        })
      );
    }

    if (type === "fillet" || type === "chamfer") {
      const [_, r, p ] = cmd;

      result.push(
        ptToCircle(p, scale, {
          display: pointDisplay,
          index: pathcmd,
          type: "filletOrChamfer",
        })
      );
    }

    if (type === "cubic") {
      // Draw a point and handles
      const [_, h0, p0, h1] = cmd;

      const lineStyle = `
        stroke: red;
        stroke-width: 7;
        vector-effect: non-scaling-stroke;
        stroke-dasharray: 7;
        opacity: .7;
      `;

      if (cmdIndex !== 0)
        result.push(svg`
        <path display=${handleDisplay} style="${lineStyle}" d="M ${h0.join(
          " "
        )} L ${p0.join(" ")}">
      `);

      if (cmdIndex !== path.length - 1)
        result.push(svg`
        <path display=${handleDisplay} style="${lineStyle}" d="M ${h1.join(
          " "
        )} L ${p0.join(" ")}">
      `);

      // draw a handle (h0)
      if (cmdIndex !== 0)
        result.push(
          ptToCircle(h0, scale, {
            display: handleDisplay,
            fill: "blue",
            index: `${pathcmd},1`,
            type: "cubic",
          })
        );

      // draw point on path (p0)
      result.push(
        ptToCircle(p0, scale, {
          display: pointDisplay,
          index: `${pathcmd},2`,
          fill: "purple",
          type: "cubic",
        })
      );

      // draw a handle (h1)
      if (cmdIndex !== path.length - 1)
        result.push(
          ptToCircle(h1, scale, {
            display: handleDisplay,
            fill: "blue",
            index: `${pathcmd},3`,
            type: "cubic",
          })
        );
    }

  });

  return result;
};

function drawPreview(state) {
  if (!state.selectedPath) return "";
  if (!state.selectedPath.args) return "";
  if (state.selectedPath.args.length < 1) return "";

  const lastCommand = state.selectedPath.args.at(-1);

  let lastPoint = {
    "cubic": lastCommand[2],
    "fillet": lastCommand[2],
    "chamfer": lastCommand[2],
  }[cmdType(lastCommand)];

  if (!lastPoint) lastPoint = lastCommand;

  const renderPreviewLine = (start, end) => {
    if (!start || !end) return "";

    const d = `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`;

    return svg`
      <path
        d=${d}
        stroke="plum"
        stroke-width="5"
        stroke-dasharray="10"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        >
     </path>
    `;
  };

  return renderPreviewLine(lastPoint, state.preview);
};
