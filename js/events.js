import { addTranslateHandle } from "./events/addTranslateHandle.js";
import { addVerticalBarDrag } from "./events/addVerticalBarDrag.js";
import { addImgPanZoom } from "./events/addImgPanZoom.js";
import { addDropUpload } from "./events/addDropUpload.js";
import { addSelectBox } from "./events/addSelectBox.js";
import { addNumberDragging } from "./events/addNumberDragging.js";
import { download } from "./events/download.js"

import esprima from 'https://cdn.skypack.dev/esprima';
import acorn from 'https://cdn.skypack.dev/acorn';
import { generate } from 'https://cdn.skypack.dev/astring';
import { walk } from 'https://cdn.skypack.dev/esprima-walk';

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
		  dispatch("RUN");

      const string = state.codemirror.view.state.doc.toString();
      const stringToParse = `()=>{${string}}`; // remember to subtract 5 from indices
      const esprimaAST = esprima.parseScript(stringToParse, { range: true });
      // console.log("esprimaAST:", esprimaAST);
      const mainBody = esprimaAST.body[0].expression.body.body;
      // console.log(mainBody);
      const newScript = { type: 'Program', body: mainBody, sourceType: 'script' };
      // console.log(generate(newScript));
      let adds = [];
      walk(esprimaAST, node => {
        try {
          if (node.callee.type === "MemberExpression" && node.callee.property.name === "add") adds.push(node.arguments[1]);
        } catch (err) { }
      })

      // sort by first range
      const sortedAdds = adds.sort((a, b) => a.range[0] - b.range[0])

      // modify values here

      // generate
      console.log(generate(sortedAdds[0]));

      // reinsert
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


















