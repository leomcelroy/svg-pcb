

export function addPathAddPoint(state, svgListener) {


  svgListener("mousedown", ".trigger-selected-path", e => {
    console.log(e.target);

    // e.preventDefault();
    // e.stopPropagation();
    // pauseEvent(e)
  })

  svgListener("mousemove", ".trigger-selected-path", e => {
    console.log(e.target);
  })
}