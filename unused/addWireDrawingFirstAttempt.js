// import esprima from '/libs/esprima.js';
import * as esprima from 'esprima';
// import acorn from 'acorn';
import { dispatch } from "../dispatch.js";
import { syntaxTree } from "@codemirror/language";
import { getFileSection } from "../getFileSection.js";

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

const sigFigs = num => num.includes(".")
  ? num.split(".")[1].length
  : num.length;

const step = (num, stepSize) => Math.round(num/stepSize)*stepSize;
const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

export function addWireDrawing(state, svgListener) {
  const svg = document.querySelector("svg");
  const toGrid = (n) => state.gridSize === 0 || !state.grid ? n : round(step(n, state.gridSize), 3);

  let clicked = false;
  let drawing = false;

  svgListener("mousedown", "", e => {
    if (!state.wireDrawing) return;
    const svgPoint = svg.panZoomParams.svgPoint;
    const clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY});
    const pt = {
      x: toGrid(clickedPoint.x),
      y: toGrid(clickedPoint.y)
    }

    if (!drawing) {
      // create new wire
      const text = `board.wire([
  [${pt.x}, ${pt.y}],
  /* -- NEXT_POINT_HERE -- */
], 0.016);\n\n`

      const string = state.codemirror.view.state.doc.toString();
      const startIndex = getFileSection("ADD_WIRES", string) ?? -1;
      if (startIndex !== -1) {
        state.codemirror.view.dispatch({
          changes: {
            from: startIndex, 
            insert: text
          }
        });
      };

      dispatch("RUN");
    } else {
      const text = `[${pt.x}, ${pt.y}],\n  /* -- NEXT_POINT_HERE -- */\n`

      const string = state.codemirror.view.state.doc.toString();
      const startIndex = getFileSection("NEXT_POINT_HERE", string) ?? -1;
      if (startIndex !== -1) {
        const commentLength = `/* -- NEXT_POINT_HERE -- */`.length;
        state.codemirror.view.dispatch({
          changes: {
            from: startIndex - commentLength - 1, 
            to: startIndex, 
            insert: text
          }
        });
      }

      dispatch("RUN");
    }

    drawing = true;
    clicked = true;
  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;
  })

  svgListener("mouseup", "", e => {
    clicked = false;
  })

  svgListener("mouseleave", "", e => {
    clicked = false;
  })

  // svgListener("keypress", "", e => {
  //   let code = event.code;
  //   console.log("end wire");
  //   if (code === "Enter") {
  //     drawing = false;
  //   } 
  //   clicked = false;
  // });

  document.body.addEventListener("keydown", e => {
    let code = event.code;
    console.log("end wire");
    if (code === "Enter") {
      // remove next point here
      drawing = false;
    } 
    clicked = false;
  });
}

















