import { group } from "../group.js";

export function copyPaste(num, transformations, turtle) {
	let newTurtles = [];
	let lastTurtle = turtle.copy();

	let angle;
	for (let i = 0; i < num; i++) {
		transformations(lastTurtle);
		newTurtles.push(lastTurtle);
		lastTurtle = lastTurtle.copy();

		angle = lastTurtle.angle;
	}

	let path = [...turtle.path];
	for (const newTurtle of newTurtles) {
		path = [...path, ...newTurtle.path];
	};

	turtle.path = path;
	turtle.angle = angle;

	return turtle;
}