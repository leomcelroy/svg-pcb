import { dispatch } from "../dispatch.js";

export function addVerticalBarDrag(state, listenBody) {
	let moveVerticalBar = false;

	listenBody("mousedown", "#vertical-bar", e => {
		moveVerticalBar = true;
	})

	listenBody("mousemove", "", (e) => {
		if (!moveVerticalBar) return;

		let x = e.clientX/window.innerWidth * 100;
		if (x === 0) return;

		const minX = 1;
		const maxX = 99;

		if (x < minX) x = minX;
		if (x > maxX) x = maxX;

		document.documentElement.style.setProperty("--vertical-bar", `${x}%`);

		pauseEvent(e);
	})

	listenBody("mouseup", "", e => {
		if (moveVerticalBar) dispatch("RENDER");
		moveVerticalBar = false;
	})
}