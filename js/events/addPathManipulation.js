import { dispatch } from "../dispatch.js";
import { snapToGrid } from "../snapToGrid.js";
import { snapToPad } from "../snapToPad.js";
import * as esprima from 'esprima';

const sigFigs = num => num.includes(".")
  ? num.split(".")[1].length
  : num.length;

const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

export function addPathManipulation(state, svgListener) {

  // --- POINT MANIPULATION ---

  let draggedPtIndex = -1;
  let fullIndex = [];
  let draggedPtType = "";
  const svgPoint = document
    .querySelector("svg")
    .panZoomParams
    .svgPoint;

  svgListener("mousedown", ".path-pt", e => {
    if (state.heldKeys.size > 0) return;
    draggedPtIndex = Number(e.target.dataset.index.split(",")[0]);
    fullIndex = e.target.dataset.index.split(",").map(Number);
    draggedPtType = e.target.dataset.type;
    state.transforming = true;
  })

  svgListener("mousemove", "", (e) => {
    if (draggedPtIndex < 0) return;
    const { from, to, args } = state.selectedPath;
    const code = state.codemirror.view.state.doc.toString();
    const snippet = code.slice(from, to);

    const ast = esprima.parse(`hack${snippet}`, { range: true, comment: true }).body[0];
    
    let pt = svgPoint({x: e.offsetX, y: e.offsetY});

    pt = snapToPad(pt);
    if (!pt.snapped) {
      pt.x = snapToGrid(pt.x);
      pt.y = snapToGrid(pt.y);
    }

    const action = {
      point() {
        const parsedArg = ast.expression.arguments[draggedPtIndex];
        parsedArg.range = [
          parsedArg.range[0] - 4 + from,
          parsedArg.range[1] - 4 + from,
        ]

        const insert = pt.snapped
          ? `${pt.padRef}`
          : `[${pt.x}, ${pt.y}]`;

        state.codemirror.view.dispatch({ 
          changes: [
            { 
              from: parsedArg.range[0],
              to: parsedArg.range[1],
              insert
            }
          ] 
        });

        dispatch("RUN");
      },
      cubic,
      filletOrChamfer() {
        const parsedArg = ast.expression.arguments[draggedPtIndex].elements[2];
        parsedArg.range = [
          parsedArg.range[0] - 4 + from,
          parsedArg.range[1] - 4 + from,
        ]

        const insert = pt.snapped
          ? `${pt.padRef}`
          : `[${pt.x}, ${pt.y}]`;

        state.codemirror.view.dispatch({ 
          changes: [
            { 
              from: parsedArg.range[0],
              to: parsedArg.range[1],
              insert
            }
          ] 
        });

        dispatch("RUN");
      },
    }[draggedPtType];

    if (action) action({
      fullIndex, 
      x: pt.x, 
      y: pt.y,
      ast,
      args,
      state,
      from,
      handleMovement: state.cubicHandleManipulation
    });

  })

  svgListener("mouseup", "", e => {
    draggedPtIndex = -1;
    state.transforming = false;
  })

  // --- POINT CONVERSION ---

  {
    svgListener("mousedown", ".path-pt", (e) => {
      if (state.heldKeys.size !== 1) return;
      if (!state.heldKeys.has("KeyZ")) return;

      const { from, to, args } = state.selectedPath;
      const code = state.codemirror.view.state.doc.toString();
      const snippet = code.slice(from, to);
      const ast = esprima.parse(`hack${snippet}`, { range: true, comment: true }).body[0];
    
      let fullIndex = e.target.dataset.index.split(",").map(Number);
      let draggedPtType = e.target.dataset.type;

      const pt = args[fullIndex[0]];

      if (draggedPtType === "point") {
        const angle = getAnglePath(args, fullIndex[0]);
        const mag = .3;

        let h0 = [pt[0] - mag * Math.cos(angle), pt[1] - mag * Math.sin(angle)];

        let h1 = [pt[0] + mag * Math.cos(angle), pt[1] + mag * Math.sin(angle)];

        const bisectingPoint = [
          pt[0] - mag * Math.cos(angle + Math.PI / 2),
          pt[1] - mag * Math.sin(angle + Math.PI / 2),
        ];

        const side = (l0, l1, p0) =>
          (l1[0] - l0[0]) * (p0[1] - l0[1]) - (l1[1] - l0[1]) * (p0[0] - l0[0]);

        const pointBefore =
          fullIndex[0] >= 1
            ? getPoint(args, fullIndex[0] - 1)
            : getPoint(args, fullIndex[0]);

        const sameSide =
          side(pt, bisectingPoint, h0) *
            side(pt, bisectingPoint, pointBefore) >=
          0;

        if (!sameSide) {
          const temp = h0;
          h0 = h1;
          h1 = temp;
        }

        const newCubic = `[ "cubic", [${h0.join(",")}], [${pt.join(",")}], [${h1.join(",")}] ]`;

        const parsedArg = ast.expression.arguments[fullIndex[0]];
        parsedArg.range = [
          parsedArg.range[0] - 4 + from,
          parsedArg.range[1] - 4 + from,
        ]

        state.codemirror.view.dispatch({ 
          changes: [
            { 
              from: parsedArg.range[0],
              to: parsedArg.range[1],
              insert: newCubic
            }
          ] 
        });

        dispatch("RUN");
      }

      if (draggedPtType === "cubic") {
        const parsedArg = ast.expression.arguments[fullIndex[0]];
        parsedArg.range = [
          parsedArg.range[0] - 4 + from,
          parsedArg.range[1] - 4 + from,
        ]

        state.codemirror.view.dispatch({ 
          changes: [
            { 
              from: parsedArg.range[0],
              to: parsedArg.range[1],
              insert: `["fillet", 0.1, [ ${pt[2].join(",")} ] ]`
            }
          ] 
        });

        dispatch("RUN");
      }

      if (draggedPtType === "filletOrChamfer") {
        const parsedArg = ast.expression.arguments[fullIndex[0]];
        parsedArg.range = [
          parsedArg.range[0] - 4 + from,
          parsedArg.range[1] - 4 + from,
        ]

        state.codemirror.view.dispatch({ 
          changes: [
            { 
              from: parsedArg.range[0],
              to: parsedArg.range[1],
              insert: `[ ${pt[2].join(",")} ]`
            }
          ] 
        });

        dispatch("RUN");
      }

    })
  }

  // --- POINT DELETION ---

  {
    svgListener("mousedown", ".path-pt", e => {
      if (state.heldKeys.size !== 1) return;
      if (!state.heldKeys.has("KeyX")) return;

      const { from, to, args } = state.selectedPath;
      const code = state.codemirror.view.state.doc.toString();
      const snippet = code.slice(from, to);
      const ast = esprima.parse(`hack${snippet}`, { range: true, comment: true }).body[0];
      const fullIndex = e.target.dataset.index.split(",").map(Number);

      const parsedArg = ast.expression.arguments[fullIndex[0]];
      let fromEdit = parsedArg.range[0] - 4 + from;
      let toEdit = parsedArg.range[1] - 4 + from;

      while([" ", ",", "\t", "\n"].includes(code[toEdit])) toEdit++;

      state.codemirror.view.dispatch({ 
        changes: [
          { 
            from: fromEdit,
            to: toEdit,
            insert: ``
          }
        ] 
      });

      dispatch("RUN");
    })
  }

  // --- PATH SELECTION ---
  svgListener("mousedown", ".selectable-path", e => {
    const start = [...e.target.classList].find(x => x.match(/pathStart-\d+/)).split("-")[1];
    const index = [...e.target.classList].find(x => x.match(/pathIndex-\d+/)).split("-")[1];

    state.selectedPathIndex = Number(index);
    state.heldKeys = new Set();
    dispatch("RUN");

    // TODO: scroll to this button in code, highlight perhaps
  })

  // --- POINT ADDING ---
  addPointAdding(state, svgListener);
}

function addPointAdding(state, svgListener) {
  let clickedPoint = null;

  const svg = document.querySelector("svg");
  const svgPoint = svg.panZoomParams.svgPoint;
  let isPt = false;
  let movedPt = false;

  svgListener("mousedown", "", e => {
    movedPt = false;

    if (state.heldKeys.size > 0) return;
    if (e.target.classList.contains("selectable-path")) return;
    if (state.selectedPathIndex < 0 || state.selectedPath === null) return;
    isPt = 
      e.composedPath().some(el => el.classList?.contains("draggable-pt"))
      || e.target.classList.contains("path-pt");

    clickedPoint = {x: e.offsetX, y: e.offsetY };
    
    dispatch("RUN"); // set proper indices
  })

  svgListener("contextmenu", ".path-pt", e => {
    movedPt = true;
    e.preventDefault();
  })

  svgListener("mousemove", "", e => {
    if (isPt) movedPt = true;
    const currentPoint = { x: e.offsetX, y: e.offsetY };
    const targetPoint = svgPoint(currentPoint);
    const pt = snapToPad(targetPoint);

    if (!pt.snapped) {
      pt.x = snapToGrid(pt.x);
      pt.y = snapToGrid(pt.y);
    }

    state.preview = [ pt.x, pt.y ];

    dispatch("RENDER");
  })

  svgListener("mouseup", "", e => {
    const currentPoint = { x: e.offsetX, y: e.offsetY };
    if (clickedPoint === null 
        || clickedPoint.x !== currentPoint.x 
        || clickedPoint.y !== currentPoint.y 
        || movedPt) {
      clickedPoint = null;
      return null;
    }

    const targetPoint = svgPoint(clickedPoint);

    const pt = snapToPad(targetPoint);

    if (!pt.snapped) {
      pt.x = snapToGrid(pt.x);
      pt.y = snapToGrid(pt.y);
    }

    const doc = state.codemirror.view.state.doc;
    const string = doc.toString();

    let start = state.selectedPath.to-2;
    const chs = [" ", "\t", "\n"];
    let ch = " ";
    while (start > 0) {
      ch = string[start];
      if (!chs.includes(ch)) break;
      start--;
    }

    const textStart = `${(ch === "," || ch === "(") ? "" : ","} `;

    const text = pt.snapped
      ? `${textStart}${pt.padRef},`
      : `${textStart}[${pt.x}, ${pt.y}],`;

    state.codemirror.view.dispatch({
      changes: {
        from: start+1, 
        insert: text
      }
    });

    dispatch("RUN");
  })
}

function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

function cubic({ ast, args, x, y, fullIndex, state, from, handleMovement }) {

  let [_, h0, p0, h1] = JSON.parse(JSON.stringify(args[fullIndex[0]]));

  const lastIndex = fullIndex[1];

  const movingPt = {
    1: h0,
    2: p0,
    3: h1,
  }[lastIndex];

  const startingPt = [...movingPt];

  movingPt[0] = x;
  movingPt[1] = y;

  const offsetX = movingPt[0] - startingPt[0];
  const offsetY = movingPt[1] - startingPt[1];

  if (handleMovement !== "broken" && [1, 3].includes(lastIndex)) {

    const center = p0;

    let partnerPt = {
      1: h1,
      3: h0,
    }[lastIndex];

    const dx = x - center[0];
    const dy = y - center[1];

    const angle = getAngle([x, y], center);

    if (handleMovement === "symmetric") {
      partnerPt[0] = center[0] - dx;
      partnerPt[1] = center[1] - dy;
    } else if (handleMovement === "colinear") {
      const mag = Math.sqrt(
        (partnerPt[0] - center[0]) ** 2 + (partnerPt[1] - center[1]) ** 2
      );

      partnerPt[0] = center[0] - mag * Math.cos(angle);
      partnerPt[1] = center[1] - mag * Math.sin(angle);
    }
  }

  if (lastIndex === 2) {
    h0[0] += offsetX;
    h0[1] += offsetY;

    h1[0] += offsetX;
    h1[1] += offsetY;
  }

  const elements = ast.expression.arguments[fullIndex[0]].elements.slice(1);

  const newPoints = [h0, p0, h1]
  const changes = elements.map((el, i) => {
    const [x, y] = newPoints[i];
    const range = [
      el.range[0] - 4 + from,
      el.range[1] - 4 + from,
    ];

    return {
      from: range[0],
      to: range[1],
      insert: `[${x.toFixed(3)}, ${y.toFixed(3)}]`
    }
  })

  state.codemirror.view.dispatch({ changes });

  dispatch("RUN");
}

function getAngle(lastPoint, secondLastPoint) {
  const x = lastPoint[0] - secondLastPoint[0];
  const y = lastPoint[1] - secondLastPoint[1];

  // in rads
  return Math.atan2(y, x);
}

function getAnglePath(path, index) {
  if (path.length <= 3) return 0;
  
  let pointBefore =
    index >= 1 ? getPoint(path, index - 1) : getPoint(path, index);
  
  let pointAfter =
    index < path.length - 1 ? getPoint(path, index + 1) : getPoint(path, index);
  
  if (index === 0 || index === path.length - 1) {
    pointBefore = getPoint(path, 1);
    pointAfter = getPoint(path, path.length - 2);
  }


  const point = getPoint(path, index);

  // var dAx = point[0] - pointBefore[0];
  // var dAy = point[1] - pointBefore[1];
  // var dBx = pointAfter[0] - point[0];
  // var dBy = pointAfter[1] - point[1];
  // var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
  // if(angle < 0) {angle = angle * -1;}

  const angle0 = getAngle(point, pointBefore);
  const angle1 = getAngle(pointAfter, point);
  const angle = (angle0 + angle1) / 2;

  // const prevNorm = normDiff(pointBefore, point);
  // const nextNorm = normDiff(point, pointAfter);
  // const angle = Math.acos(
  //   (prevNorm[0] * nextNorm[0]) +
  //   (prevNorm[1] * nextNorm[1])
  // )

  return angle;
}

function cmdType(cmd) {
  if (typeof cmd[0] === "number") return "point";
  else return cmd[0];
}

function getPoint(path, index) {
  const cmd = path[index];
  const type = cmdType(cmd);

  return type === "point" ? cmd : cmd[2];
}








