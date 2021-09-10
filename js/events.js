import { addTranslateHandle } from "./events/addTranslateHandle.js";
import { addVerticalBarDrag } from "./events/addVerticalBarDrag.js";
import { download } from "./events/download.js"

function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

window.pauseEvent = pauseEvent;

const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);
// create on listener
const createListener = (target) => (eventName, selectorString, event) => { // focus doesn't work with this, focus doesn't bubble, need focusin
	target.addEventListener(eventName, (e) => {
		e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
		if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
	})
}

function addImgPanZoom(state, listen) {
  let mousedown = false;

  let scale = 1;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };

  function setTransform(el) {
    el.style.transformOrigin = `${0}px ${0}px`;
    el.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
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

    if (Math.sign(e.deltaY) < 0) scale *= 1.03;
    else scale /= 1.03;

    pointX = e.offsetX - xs * scale;
    pointY = e.offsetY - ys * scale;

    // console.log(e.offsetX, xs, pointX, scale)

    const imgs = document.querySelectorAll(".transform-group");
    for (const img of imgs) {
      setTransform(img);
    }

    const scaleWithViewers = document.querySelectorAll(".scale-with-viewer");
    for (const el of scaleWithViewers) {
    	const bbox = el.getBoundingClientRect();
    	const bboxGrand = document.querySelector("svg").getBoundingClientRect();
    	if (!el.center) { // first time set the center so we don't have to deal with scale
    		el.center = { 
	    		x: bbox.left - bboxGrand.left + bbox.width/2 - pointX, 
	    		y: bbox.top - bboxGrand.top + bbox.height/2 - pointY
	    	}
    	}
		// let gPos = svgPoint({
		//    x: bbox.left,
		//    y: bbox.top
		// });
	 //  	const x = (gPos.x*scale - bboxGrand.left)/scale + bbox.width/2/scale;
	 //  	const y = (gPos.y*scale - bboxGrand.top)/scale + bbox.height/2/scale;
	  	el.style.transform = `scale(${1/scale})`;
      el.style.transformOrigin = `${el.center.x}px ${el.center.y}px`
    }

    e.preventDefault();

  })

  function setScaleXY(limits) {
    console.log("set scale x y")
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

  return { 
  	scale: () => scale,
  	x: () => pointX,
  	y: () => pointY,
    svgPoint,
    setScaleXY
  }
}

let count = 0;
function readFile(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = event => {
    let text = reader.result;
    dispatch("UPLOAD_COMP", {text, name: `component${count}`});
    count++;
  };
}

function upload(files, extensions = []) {
  let file = files[0];
  let fileName = file.name.split(".");
  let name = fileName[0];
  const extension = fileName[fileName.length - 1];

  if (extensions.length > 0 && !extensions.includes(extension)) throw "Extension not recongized: " + fileName;

  readFile(file);
  // if (["json"].includes(extension)) readFile(file);
  // else console.log("Unknown extension:", extension);
};

function addDropUpload(state, bodyListener) {
  bodyListener("drop", "", function(evt) {    
    let dt = evt.dataTransfer;
    let files = dt.files;

    upload(files);

    pauseEvent(evt);
  });

  bodyListener("dragover", "", function(evt) {    
    pauseEvent(evt);
  });
}

function addSelectBox(state, svgListener) {
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

const isDigit = (ch, left = false) => /[0-9]/i.test(ch) || ch === "." || (left && ch === "-");

function addNumberDragging(state, bodyListener) {
  let dragged = false;
  let num, pos_start, pos_end, sigFigs, usePrecision, selectedText;

  bodyListener("mousedown", ".ͼb", e => {
    const cm = document.querySelector("code-mirror");

    const s = cm.view.state;
    const doc = s.doc;
    const pos = s.selection.main.head;
    const at = doc.lineAt(pos);

    let { from, to, text} = doc.lineAt(pos)
    let start = pos, end = pos;
    // console.log("start", start, text[start - from - 1], "end", end, text[end - from]);
    while (start > from && isDigit(text[start - from - 1], true)) start--
    while (end < to && isDigit(text[end - from])) end++


    selectedText = text.slice(start-from, end-from);

    num = Number(selectedText);
    dragged = true;
    pos_start = start;
    pos_end = end;
    usePrecision = selectedText.includes(".");
    sigFigs = selectedText.includes(".") ? selectedText.split(".")[1].length : 1;
  })

  bodyListener("mousemove", "", e => {
    const cm = document.querySelector("code-mirror");

    if (dragged) {
		const sign = 0 > e.movementX ? 1 : -1;
		// console.log(sign, e.movementX);
		const oldValue = `${num}`;
		if (usePrecision) {
			let rounded = Math.round(num*10**sigFigs);
			let newNum = rounded + e.movementX;
			newNum = Math.round(newNum)/(10**sigFigs);

			num = newNum;    
		} else {
			num += e.movementX;
		}

		const newValue = `${num}`;

		cm.view.dispatch({
			changes: {from: pos_start, to: pos_start + selectedText.length, insert: newValue}
		});

		selectedText = newValue;

		dispatch("RUN");
		pauseEvent(e);
    }
  })

  bodyListener("mouseup", "", e => {
    dragged = false;
  })
}

export function addEvents(state) {
	const svg = document.querySelector("svg");
	const listenSVG = createListener(svg);
	svg.panZoomParams = addImgPanZoom(state, listenSVG);
	addSelectBox(state, listenSVG);
  addTranslateHandle(state, listenSVG);
	// addPathSelect(state, listenSVG);

	const body = document.querySelector("body");
	const listenBody = createListener(body);
	addDropUpload(state, listenBody);
	addNumberDragging(state, listenBody);
	addVerticalBarDrag(state, listenBody);

	listenBody("keydown", "", (e) => {
		let code = event.code;
		if (code === "Enter" && event.shiftKey) {
		  event.preventDefault();
		  dispatch("RUN");
		} else if (code === "KeyT" && event.shiftKey) {
      console.time()
      dispatch("RENDER")
      console.timeEnd()
    }
	})

  listenBody("mousedown", ".download-button", () => download(state));

  listenBody("click", ".center-button", () => {
    const svg = document.querySelector("svg");
    svg.panZoomParams.setScaleXY(state.limits);

  })

}


















