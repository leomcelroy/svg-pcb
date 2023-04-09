import { dispatch } from "../dispatch.js";

export function addImgPanZoom(state, listen) {
  let mousedown = false;

  let scale = 1;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };

  function setTransform(el) {
    el.style.transformOrigin = `${0}px ${0}px`;
    el.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    if (state.gridSize > 0) dispatch("RENDER");
  }

  function svgPoint({ x, y }) {
  	  let newX = (x - pointX) / scale;
    	let newY = (y - pointY) / scale;

    	return { x: newX, y: newY };
  }

  listen("mousedown", "", (e) => {
    if (e.shiftKey) return;

    mousedown = true;

    start = { x: e.offsetX - pointX, y: e.offsetY - pointY };

    if (e.detail === 2) {
    	console.log(e.offsetX, e.offsetY, svgPoint({x: e.offsetX, y: e.offsetY}));
    }
  })

  listen("mousemove", "", (e) => {
    if (!mousedown) return;
    if (state.transforming) return;

    pointX = (e.offsetX - start.x);
    pointY = (e.offsetY - start.y);

    const imgs = document.querySelectorAll(".transform-group");

    for (const img of imgs) {
      setTransform(img);
    }

  })

  listen("mouseup", "", (evt) => {
    mousedown = false;
  })

  listen("wheel", "", (e) => {
    
    let xs = (e.offsetX - pointX) / scale;
    let ys = (e.offsetY - pointY) / scale;

    const ZOOM_SCALE = 1.05;
    if (Math.sign(e.deltaY) < 0) scale *= ZOOM_SCALE;
    else scale /= ZOOM_SCALE;

    pointX = e.offsetX - xs * scale;
    pointY = e.offsetY - ys * scale;

    const imgs = document.querySelectorAll(".transform-group");
    for (const img of imgs) {
      setTransform(img);
    }

    e.preventDefault();
  })

  function setScaleXY(limits) {
    const svg = document.querySelector("svg");
    const bb = svg.getBoundingClientRect();
    const xr = limits.x[1] - limits.x[0];
    const yr = limits.y[1] - limits.y[0];
    const xScalingFactor = bb.width/xr;
    const yScalingFactor = bb.height/yr;

    const scalingFactor = Math.min(xScalingFactor, yScalingFactor) * 0.9;

    scale = scalingFactor;

    const center = { 
      x: (limits.x[0] + limits.x[1])/2 * scalingFactor - bb.width/2,
      y: (limits.y[0] + limits.y[1])/2 * scalingFactor - bb.height/2
    }

    pointX = -center.x;
    pointY = -center.y;

    const imgs = document.querySelectorAll(".transform-group");
    for (const img of imgs) {
      setTransform(img);
    }
  }

  function corners() {
    const svg = document.querySelector("svg"); // what if there were other svgs?
    if (svg === null) return null;
    const { left, right, bottom, top, width, height} = svg.getBoundingClientRect();
    // need rt, lt, rb, lb
    const rt = svgPoint({ x: width, y: height });
    // rt.y = -rt.y
    const lt = svgPoint({ x: 0, y: height });
    // lt.y = -lt.y
    const rb = svgPoint({ x: width, y: 0 });
    // rb.y = -rb.y
    const lb = svgPoint({ x: 0, y: 0 });
    // lb.y = -lb.y

    return { rt, lt, rb, lb }
  }

  return { 
  	scale: () => scale,
  	x: () => pointX,
  	y: () => pointY,
    corners,
    svgPoint,
    setScaleXY
  }
}