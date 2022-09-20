import { dispatch } from "../dispatch.js";

export function addSelectBox(state, svgListener) {
  let start = null;
  let end = null;
  const svg = document.querySelector("svg");

  svgListener("mousedown", "", e => {
    if (!e.shiftKey) return;

    start = svg.panZoomParams.svgPoint({x: e.offsetX, y: e.offsetY});
  })

  svgListener("mousemove", "", e => {
  	document.body.classList.add("no-select");
    if (!e.shiftKey) return;
    if (start === null) return;

    end = svg.panZoomParams.svgPoint({x: e.offsetX, y: e.offsetY});

    state.selectBox.start = start;
    state.selectBox.end = end;
    dispatch("RENDER");
  })

  function contains (p, selectBox) {
    // console.log(p, selectBox);
    let { start, end } = selectBox;
    return (
      (p.x > start.x && p.x < end.x && p.y > start.y && p.y < end.y) ||
      (p.x > start.x && p.x < end.x && p.y < start.y && p.y > end.y) ||
      (p.x < start.x && p.x > end.x && p.y > start.y && p.y < end.y) ||
      (p.x < start.x && p.x > end.x && p.y < start.y && p.y > end.y)
    );
  };

  svgListener("mouseup", "", e => {
    if (!e.shiftKey) return;
  	document.body.classList.remove("no-select");
    if (start && end) {
      // select
    }
    
    start = null;
    end = null;
    state.selectBox.start = start;
    state.selectBox.end = end;
    dispatch("RENDER");
  })
}