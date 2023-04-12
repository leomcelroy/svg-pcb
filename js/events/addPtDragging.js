import * as esprima from 'esprima';
import { dispatch } from "../dispatch.js";
import { walk } from "../walk.js";
import { snapToGrid } from "../snapToGrid.js";

export function addPtDragging(state, svgListener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let clickedPoint;
  let index;
  let ogPos;
  let initialOffset;
  let dragPt;

  svgListener("mousedown", ".draggable-pt", e => {
    const svgPoint = svg.panZoomParams.svgPoint;
    clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    clicked = true;
    state.transforming = true;
    index = Number(e.target.dataset.index);
    ogPos = [
      Number(e.target.getAttribute("cx")),
      Number(e.target.getAttribute("cy"))
    ];

    const [xSnippet, ySnippet] = e.target.dataset.text.split(",");

    initialOffset = [...ogPos];
    const xNode = esprima.parse(xSnippet, { range: true, comment: true }).body[0];
    const yNode = esprima.parse(ySnippet, { range: true, comment: true }).body[0];
    const change_x_0 = createGetAdditiveConstant(initialOffset, 0);
    walk(xNode, n => change_x_0(n));
    const change_y_0 = createGetAdditiveConstant(initialOffset, 1);
    walk(yNode, n => change_y_0(n));

    dragPt = (x, y, i) => {
      const pt = state.pts[i];
      const [xSnippet, ySnippet] = pt.text.split(",");
      const xNode = esprima.parse(xSnippet, { range: true, comment: true }).body[0];
      const yNode = esprima.parse(ySnippet, { range: true, comment: true }).body[0];

      const startX = pt.start;
      const startY = startX + xSnippet.length+1;

      const changes = [];
      const create_change_x_or_y = create_change_x_or_y_helper(changes, state);
      const change_x = create_change_x_or_y(startX);
      walk(xNode, n => change_x(n, x));
      const change_y = create_change_x_or_y(startY);
      walk(yNode, n => change_y(n, y));

      state.codemirror.view.dispatch({ changes });

      dispatch("RUN", { dragging: true });
    }

  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY});
    const xOffset = ( ogPos[0] - initialOffset[0] );
    const yOffset = ( ogPos[1] - initialOffset[1] );
    
    let pt = { x:0, y:0 };

    pt.x = round(snapToGrid(currentPoint.x) - xOffset, 3);
    pt.y = round(snapToGrid(currentPoint.y) - yOffset, 3);
    
    dragPt(pt.x, pt.y, index);
  })

  svgListener("mouseup", "", e => {
    clicked = false;
    state.transforming = false;
  })

  svgListener("mouseleave", "", e => {
    clicked = false;
    state.transforming = false;
  })
}

const sigFigs = num => num.includes(".")
  ? num.split(".")[1].length
  : num.length;

const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

const create_change_x_or_y_helper = (changes, state) => (offsetStart) => {
  let is_sum = false;
  let is_neg = false;
  let changed = false;

  // differential programming problem?
  // TODO: can I set this up as an equation to solve so I can pass the target value not the delta
  return (n, delta) => { 
    if (changed) return;

    if (n.type === "Literal" && typeof n.value === "number") {
      let n_from = n.range[0];
      
      if (n.parent && n.parent.operator === "/") {
        return;
      }

      if (n.parent && n.parent.operator === "-") {
        is_neg = true;
      }

      if (n.parent && n.parent.type === "BinaryExpression" && (n.parent.operator === "+" || n.parent.operator === "-") && n.parent.right == n) {
        is_sum = true;
        n_from = n.parent.left.range[1];
      }

      if (n.parent && n.parent.type === "UnaryExpression" && n.parent.operator === "-") {
        n_from = n.parent.range[0];
      }
      
      let n_val = delta;

      let is_neg_new = n_val < 0;

      let n_insert;
      if (is_neg_new) {
        n_insert = `-${Math.abs(n_val)}`
      } else if (is_sum) {
        n_insert = `+${n_val}`
      } else {
        n_insert = `${n_val}`
      }
        
      changes.push({
        from: n_from+offsetStart,
        to: n.range[1]+offsetStart,
        insert: n_insert
      });

      changed = true;
    }
  }
}

const createGetAdditiveConstant = (constants, index) => {
  let is_sum = false;
  let is_neg = false;
  let changed = false;

  return (n) => { 
    if (changed) return;
    
    let n_val = 0;

    if (n.type === "Literal" && typeof n.value === "number") {
      let n_from = n.range[0];
      
      if (n.parent && n.parent.operator === "/") {
        return;
      }

      if (n.parent && n.parent.operator === "-") {
        is_neg = true;
      }

      if (n.parent && n.parent.type === "BinaryExpression" && (n.parent.operator === "+" || n.parent.operator === "-") && n.parent.right == n) {
        is_sum = true;
        n_from = n.parent.left.range[1];
      }

      if (n.parent && n.parent.type === "UnaryExpression" && n.parent.operator === "-") {
        n_from = n.parent.range[0];
      }

      let newNum;
      if (is_neg) {
        newNum = -n.value;
      } else {
        newNum = n.value;
      }

      n_val = newNum;

      let is_neg_new = n_val < 0;

      if (is_neg_new) {
        n_val = -Math.abs(n_val);
      } else if (is_sum) {
        n_val = n_val;
      } else {
        n_val = n_val;
      }

      constants[index] = n_val;
    }


    return n_val;
  }
}

















