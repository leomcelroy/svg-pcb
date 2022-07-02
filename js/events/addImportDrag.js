import esprima from '/libs/esprima.js';
import { dispatch } from "../dispatch.js";
import { getFileSection } from "../getFileSection.js"

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

export function addImportDrag(state, listener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let index, string, ast;

  listener("mousedown", ".footprint-svg, .path-footprint", e => {
    clicked = true;

    index = e.target.dataset.index;

    string = state.codemirror.view.state.doc.toString();
    ast = esprima.parseScript(string, { range: true, comment: true });

    // pauseEvent(e);
  })

  listener("mousemove", "", e => {
    if (!clicked) return;

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY})

    var path = event.path || (event.composedPath && event.composedPath());

    if (!path) return;

    const overSVG = path.some(el => el.matches && el.matches("#viewer"));

    // want to add footprint with x y currentPoint

    const rect = document.querySelector("#viewer").getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    state.previewFootprint = [
      state.footprints[index],
      [ x, y ]
    ];

    dispatch("RENDER");
  })

  listener("mouseup", "", e => {

    if (state.previewFootprint !== null) {

      const rect = document.querySelector("#viewer").getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = rect.bottom - e.clientY;

      const svgPoint = svg.panZoomParams.svgPoint;
      const pos = svgPoint({ x: x, y: y })

      const string = state.codemirror.view.state.doc.toString();
      const start = getFileSection("ADD_COMPONENTS", string);

      if (start !== null) {
        const name = state.previewFootprint[0][0];

        const text = `board.add(${name}, { translate: [${pos.x}, ${pos.y}] })\n`

        state.codemirror.view.dispatch({
          changes: {from: start, insert: text}
        });

        dispatch("RUN");
      };
    }
    state.previewFootprint = null;

    if (clicked) dispatch("RENDER");
    clicked = false;
  })

  listener("mouseleave", "", e => {
    state.previewFootprint = null;
    clicked = false;
  })
}
