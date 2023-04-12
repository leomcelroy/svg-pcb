import { addPtDragging } from "./events/addPtDragging.js";
import { addVerticalBarDrag } from "./events/addVerticalBarDrag.js";
import { addImgPanZoom } from "./events/addImgPanZoom.js";
import { addDropUpload } from "./events/addDropUpload.js";
import { addSelectBox } from "./events/addSelectBox.js";
import { addNumberDragging } from "./events/addNumberDragging.js";
import { addImportDrag } from "./events/addImportDrag.js";
import { addPathManipulation } from "./events/addPathManipulation.js";
import { addPathSelection } from "./events/addPathSelection.js";
import { clearSelectedPath } from "./clearSelectedPath.js";
import { dispatch } from "./dispatch.js";

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
  	addPtDragging(state, listenSVG);
  	addPathManipulation(state, listenSVG);

	const body = document.querySelector("body");
	const listenBody = createListener(body);
	addImportDrag(state, listenBody);
	addDropUpload(state, listenBody);
	addNumberDragging(state, listenBody);
	addVerticalBarDrag(state, listenBody);
	addPathSelection(state, listenBody);

	window.addEventListener("keydown", (e) => {
		const code = event.code;

		state.heldKeys.add(code);
		
		const isTypingCode = e.target.classList.contains("cm-content");
		if (isTypingCode) clearSelectedPath();

		if (code === "Enter" && event.shiftKey) {
		  event.preventDefault();
		  dispatch("RUN");
		} else if (code === "KeyT" && event.shiftKey) { // test something
      
    	}
	})

	window.addEventListener("keyup", e => {
		const code = event.code;
		state.heldKeys.delete(code);
	})

	window.addEventListener("unload", () => {
		const string = state.codemirror.view.state.doc.toString();
		window.localStorage.setItem("svg-pcb", string);
	})

	window.addEventListener("wheel", () => {
		function getBaseLog(x, y) {
	      return Math.log(y) / Math.log(x);
	    }

	    if (!state.panZoomParams) return;

	    const corners = state.panZoomParams.corners();

	    const xLimits = [corners.lt.x, corners.rt.x];
	    const xRange = Math.abs(xLimits[1] - xLimits[0]);
	    const yLimits = [corners.lb.y, corners.lt.y];
	    const yRange = Math.abs(yLimits[1] - yLimits[0]);

	    const order = Math.round(getBaseLog(5, Math.max(xRange, yRange)));
	    const stepSize = state.adaptiveGrid ? (5**(order))/20 : state.gridSize;
	    state.gridSize = stepSize;
	})
}


















