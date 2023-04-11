import { dispatch } from "../dispatch.js";
import { getFileSection } from "../getFileSection.js"

export function addImportDrag(state, listener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let index = null;
  let key = null;

  listener("mousedown", ".footprint-svg, .path-footprint", e => {
    clicked = true;
    index = e.target.dataset.index;
    key = e.target.dataset.key;

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
      state.footprints[key],
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
        const name = state.previewFootprint[0].name;

        const text = `board.add(${name}, { translate: pt(${pos.x}, ${pos.y}), rotate: 0, label: "${name}" })\n`

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
