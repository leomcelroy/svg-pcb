import { Turtle } from "../Turtle.js";

export function copy(turtle) {
	return new Turtle(JSON.parse(JSON.stringify({
		angle: turtle.angle,
		path: turtle.path
	})));
}