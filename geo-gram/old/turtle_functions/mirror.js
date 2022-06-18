import { flip } from "./flip.js";

export function mirror(turtle) {
	let newTurtle = turtle.copy();
	newTurtle.reverse();
	newTurtle.flip("y");

	const { x, y } = turtle.end;
	newTurtle.translate({ x, y }, newTurtle.start);
	newTurtle.rotate(turtle.angle*2, newTurtle.start);
	newTurtle.points.forEach((p, i) => {
		if (i > 0) turtle.addPoint(p)
	});
	turtle.alignHead();
	return turtle;
}