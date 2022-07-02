import esprima from '/libs/esprima.js';
// import acorn from 'acorn';
import { dispatch } from "../dispatch.js";
import { syntaxTree } from "@codemirror/language";

function foldImports(state) {
  const anotherComp = l => l.includes("return kicadToObj(");

  const doc = state.codemirror.view.state.doc;
  const lines = doc.toString().split("\n");
  let i = 0;
  let count = 0;
  while (true) {
    const line = lines[i];
    if (!line) break;
    count += line.length;
    if (i > lines.length) break;
    if (lines[i] === "`)})()" && !anotherComp(lines[i+1])) break;
    i++;
  };

  state.codemirror.foldRange(0, count+i);
}

function walk( ast, fn ) {
	var stack = [ ast ], i, j, key, len, node, child, subchild
	for ( i = 0; i < stack.length; i += 1 ) {
		node = stack[ i ]
    if (typeof node == 'number')
      continue
		fn( node )
		for ( key in node ) {
			if ( key !== 'parent' ) {
				child = node[ key ]
				if ( child instanceof Array ) {
					for ( j = 0, len = child.length; j < len; j += 1 ) {
						subchild = child[ j ]
						if( subchild instanceof Object ) {
							subchild.parent = node
						}
						stack.push( subchild )
					}
				} else if ( child != void 0 && typeof child.type === 'string' ) {
					child.parent = node
					stack.push( child )
				}
			}
		}
	}
}

export function addTranslateHandle(state, svgListener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let clickedPoint;
  let index;
  let lastPoint;
  let ogPos;


  svgListener("mousedown", ".translate-handle-trigger", e => {
    const svgPoint = svg.panZoomParams.svgPoint;
    clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    lastPoint = clickedPoint
    clicked = true;
    state.transforming = true;
    index = Number(e.target.dataset.index);
    ogPos = state.storedPCB.components[index].pos;

    let string = state.codemirror.view.state.doc.toString();
    const esprimaAST = esprima.parseScript(string, { range: true, comment: true });

    // let adds = [];
    // walk(esprimaAST, node => {
    //   if (node?.callee?.type === "MemberExpression" && node?.callee?.property?.name === "add") adds.push(node.arguments[1]);
    // })

    // sort by first range
    // const sortedAdds = adds.sort((a, b) => a.range[0] - b.range[0])

    state.transformUpdate = (x, y) => {

      const changes = [];
      const create_change_x_or_y = create2_change_x_or_y(changes, state);

      // sortedAdds[index].properties.forEach( prop => {
      //   if (prop.key.name !== "translate") return;

      //   const [ xNode, yNode ] = prop.value.elements;
      //   console.log(xNode, yNode);
      //   const change_x = create_change_x_or_y();
      //   walk(xNode, n => change_x(n, x));
      //   const change_y = create_change_x_or_y();
      //   walk(yNode, n => change_y(n, y));

      //   console.time("UPDATE CM FROM TRANS")

      //   console.time("1")
      //   const currentString = state.codemirror.view.state.doc.toString();
      //   console.timeEnd("1")

      //   console.time("2")
      //   state.codemirror.view.dispatch({
      //     changes: { from: 0, to: currentString.length, insert: string }
      //   });
      //   console.timeEnd("2")

      //   console.time("3")
      //   // state.codemirror.view.dispatch({ changes });
      //   console.timeEnd("3")

      //   console.timeEnd("UPDATE CM FROM TRANS")

      // })

      // console.time("cm parse")
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

      // console.timeEnd("cm parse")

      // foldImports(state);

    }

  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    const x = currentPoint.x - lastPoint.x;
    const y = currentPoint.y - lastPoint.y;
    dispatch("TRANSLATE", { x, y, index });
    lastPoint = currentPoint;

    // const dx = currentPoint.x - lastPoint.x;
    // const dy = currentPoint.y - lastPoint.y;
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

const create2_change_x_or_y = (changes, state) => (offsetStart) => {
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

      // let newNum = is_neg ? -newVal : newVal;
      // let newNum = delta;

      // if (!n.ogValue) n.ogValue = n.value;
      // if (!n.ogRaw) n.ogRaw = n.raw;

      let newNum;
      if (is_neg) {
        newNum = -n.value + delta;
      } else {
        newNum = n.value + delta;
      }

      // BUG: the rounding breaks the changing, why didn't it before? because delta was from og to new not last to new
      // let n_val = state.gridSize === 0 ? round(newNum, sigFigs(n.raw)) : round(step(newNum, state.gridSize), 8);
      let n_val = newNum;
      // console.log(n_val, newNum);

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

const createGetAdditiveConstant = () => {
  let is_sum = false;
  let is_neg = false;
  let changed = false;

  // differential programming problem?
  // TODO: can I set this up as an equation to solve so I can pass the target value not the delta
  return (n, delta) => { 
    if (changed) return 0;
    
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
        newNum = -n.value + delta;
      } else {
        newNum = n.value + delta;
      }

      let is_neg_new = n_val < 0;

      let n_insert;
      if (is_neg_new) {
        n_insert = `-${Math.abs(n_val)}`
      } else if (is_sum) {
        n_insert = `+${n_val}`
      } else {
        n_insert = `${n_val}`
      }
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

















