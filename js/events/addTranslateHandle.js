// import esprima from '/libs/esprima.js';
import * as esprima from 'esprima';
// import acorn from 'acorn';
import { dispatch } from "../dispatch.js";
import { syntaxTree } from "@codemirror/language";
import { walk } from "../walk.js";


export function addTranslateHandle(state, svgListener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let clickedPoint;
  let index;
  let ogPos;
  let initialOffset;

  svgListener("mousedown", ".translate-handle-trigger", e => {
    const svgPoint = svg.panZoomParams.svgPoint;
    clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    clicked = true;
    state.transforming = true;
    index = Number(e.target.dataset.index);
    ogPos = state.storedPCB.components[index].pos;

    initialOffset = [];
    const exps = cmAST(state);
    exps.forEach( (exp, i) => {
      if (i !== index) return;
      const { start, ast } = exp;
      const [ xNode, yNode ] = ast.body[0].expression.elements;
      const change_x = createGetAdditiveConstant(initialOffset);
      walk(xNode, n => change_x(n));
      const change_y = createGetAdditiveConstant(initialOffset);
      walk(yNode, n => change_y(n));
    });

    state.transformUpdate = (x, y) => {
      const changes = [];
      const create_change_x_or_y = create_change_x_or_y_helper(changes, state);

      const exps = cmAST(state);
      exps.forEach( (exp, i) => {
        if (i !== index) return;
        const { start, ast } = exp;
        const [ xNode, yNode ] = ast.body[0].expression.elements;
        const change_x = create_change_x_or_y(start);
        walk(xNode, n => change_x(n, x));
        const change_y = create_change_x_or_y(start);
        walk(yNode, n => change_y(n, y));
      });

      state.codemirror.view.dispatch({ changes });
    }

  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;
    const toGrid = (n) => state.gridSize === 0 || !state.grid ? n : round(step(n, state.gridSize), 8);

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    const xOffset = ( ogPos[0] - initialOffset[0] );
    const yOffset = ( ogPos[1] - initialOffset[1] );
    const x = round(toGrid(currentPoint.x) - xOffset, 8);
    const y = round(toGrid(currentPoint.y) - yOffset, 8);
    dispatch("TRANSLATE", { x, y, index });
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

const createGetAdditiveConstant = (constants) => {
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

      constants.push(n_val);
    }


    return n_val;
  }
}

function cmAST(state) {
  const string = state.codemirror.view.state.doc.toString();
  const ast = syntaxTree(state.codemirror.view.state);

  let texts = [];
  const cursor = ast.cursor()
  do {
    // console.log(`Node ${cursor.name} from ${cursor.from} to ${cursor.to} with value ${string.slice(cursor.from, cursor.to)}`, cursor);
    const value = string.slice(cursor.from, cursor.to);
    if (cursor.name !== "PropertyDefinition" || value !== "translate") continue;
    cursor.next()
    cursor.next(); 
    const text = string.slice(cursor.from, cursor.to);
    texts.push({ text, start: cursor.from });

  } while (cursor.next())

  return texts.map(x => ({
    ...x, 
    ast: esprima.parseScript(x.text, { range: true, comment: true })
  }));
}


/*

given 
  - ast
  - target point

solve for additive constant which will move the component to the target point 

*/

















