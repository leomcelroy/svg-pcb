import { addTranslateHandle } from "./events/addTranslateHandle.js";
import { addVerticalBarDrag } from "./events/addVerticalBarDrag.js";
import { addImgPanZoom } from "./events/addImgPanZoom.js";
import { addDropUpload } from "./events/addDropUpload.js";
import { addSelectBox } from "./events/addSelectBox.js";
import { addNumberDragging } from "./events/addNumberDragging.js";
// import { download } from "./events/download.js"

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

export function addEvents(state) {
	const svg = document.querySelector("svg");
	const listenSVG = createListener(svg);
  
	svg.panZoomParams = addImgPanZoom(state, listenSVG);
  	state.panZoomParams = svg.panZoomParams;

	addSelectBox(state, listenSVG);
  	addTranslateHandle(state, listenSVG);

	const body = document.querySelector("body");
	const listenBody = createListener(body);
	addDropUpload(state, listenBody);
	addNumberDragging(state, listenBody);
	addVerticalBarDrag(state, listenBody);

	listenBody("keydown", "", (e) => {
		let code = event.code;
		if (code === "Enter" && event.shiftKey) {
		  event.preventDefault();
		  dispatch("RUN", { save: true });
		} else if (code === "KeyT" && event.shiftKey) { // test something
      
    	}
	})

  // listenBody("mousedown", ".download-button", () => download(state));

  // listenBody("click", ".center-button", () => {
  //   const svg = document.querySelector("svg");
  //   svg.panZoomParams.setScaleXY(state.limits);
  // })
}


















