export function addTranslateHandle(state, svgListener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let clickedPoint;
  let lastX = 0;
  let lastY = 0;
  let index;

  svgListener("mousedown", ".translate-handle", e => {
    clicked = true;
    state.transforming = true;
    lastX = 0;
    lastY = 0;

    const svgPoint = svg.panZoomParams.svgPoint;
    clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY})

    index = e.target.dataset.index;

    // pauseEvent(e);
  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    const x = currentPoint.x - clickedPoint.x;
    const y = currentPoint.y - clickedPoint.y;
    dispatch("TRANSLATE", { x: x - lastX, y: y - lastY, index });
    // dispatch("TRANSLATE", { x, y, index });
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