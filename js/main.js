import { dispatch } from "./dispatch.js";

export { PCB } from "./pcb.js";
export { kicadToObj } from "./ki_cad_parser.js"
export { Turtle } from "./Turtle.js";

window.dispatch = dispatch;

window.addEventListener("load", () => {
	dispatch("INIT");
});