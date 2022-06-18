import { drawTurtle } from "../drawTurtle.js";
import { render as  litRender } from "../../libs/lit-html.js";

export function render(id, turtle) {
	const svgs = drawTurtle(turtle);
	litRender(svgs, document.getElementById(id));

	return turtle;
}