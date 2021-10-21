import esprima from 'esprima';
import { generate } from 'astring';
// import { walk, walkAddParent } from "esprima-walk";

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
  let lastX = 0;
  let lastY = 0;
  let index;

  svgListener("mousedown", ".translate-handle-trigger", e => {
    clicked = true;
    state.transforming = true;
    lastX = 0;
    lastY = 0;

    const svgPoint = svg.panZoomParams.svgPoint;
    clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY})

    index = e.target.dataset.index;

    const string = state.codemirror.view.state.doc.toString();
    const stringToParse = `()=>{${string}}`; // remember to subtract 5 from indices
    const esprimaAST = esprima.parseScript(stringToParse, { range: true, comment: true });
    const mainBody = esprimaAST.body[0].expression.body.body;

    let adds = [];
    walk(esprimaAST, node => {
      try {
          if (node.callee.type === "MemberExpression" && node.callee.property.name === "add") adds.push(node.arguments[1]);
      } catch (err) { }
    })
    // sort by first range
    const sortedAdds = adds.sort((a, b) => a.range[0] - b.range[0])
    const sigFigs = num => num.includes(".")
      ? num.split(".")[1].length
      : num.length;

    const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
    const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
    const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

    // const comp = state.storedPCB.components[index];

    state.transformUpdate = (x, y) => {

      const changes = [];

      sortedAdds[index].properties.forEach( prop => {
        if (prop.key.name !== "translate") return;

        const [ xNode, yNode ] = prop.value.elements;

        let offs = 5;

        let is_sum = false;
        let is_neg = false;
        let changed = false;

        let change_x_or_y = function(n, delta) {
          if (changed) return;

          if (n.type === "Literal" && typeof n.value === "number") {

            let n_from = n.range[0] - offs;

            if (n.parent.operator === "-") {
              is_neg = true;
            }

            if (n.parent.type === "BinaryExpression" && (n.parent.operator === "+" || n.parent.operator === "-") && n.parent.right == n) {
              is_sum = true;
              n_from = n.parent.left.range[1] - offs;
            }

            if (n.parent.type === "UnaryExpression" && n.parent.operator === "-") {
              n_from = n.parent.range[0] - offs;
            }

            console.log(n.range, n.parent.range);

            if (!n.ogValue) n.ogValue = n.value;
            if (!n.ogRaw) n.ogRaw = n.raw;

            let newNum;
            if (is_neg) {
              newNum = -n.ogValue + delta;
            } else {
              newNum = n.ogValue + delta;
            }

            let n_val = state.gridSize === 0 ? round(newNum, sigFigs(n.ogRaw)) : round(step(newNum, state.gridSize), 8);

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
              from: n_from,
              to: n.range[1] - offs,
              insert: n_insert
            });

            changed = true;
          }
        }

        walk(xNode, n => change_x_or_y(n, x));

        is_sum = false;
        is_neg = false;
        changed = false;

        walk(yNode, n => change_x_or_y(n, y));

        const currentString = state.codemirror.view.state.doc.toString();

        state.codemirror.view.dispatch({
          changes: { from: 0, to: currentString.length, insert: string }
        });

        state.codemirror.view.dispatch({ changes });
      })

      foldImports(state);

    }

    // pauseEvent(e);
  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    const x = currentPoint.x - clickedPoint.x;
    const y = currentPoint.y - clickedPoint.y;
    // dispatch("TRANSLATE", { x: x - lastX, y: y - lastY, index });
    dispatch("TRANSLATE", { x, y, index });
    lastX = x;
    lastY = y;
    // pauseEvent(e);
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
