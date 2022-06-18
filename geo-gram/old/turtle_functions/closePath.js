export function closePath(turtle) {
	turtle.addPoint({ ...turtle.start });
	turtle.alignHead();

	return turtle;
}