
export function strokeColor(color, turtle) {
	// turtle.path.flat().forEach(p => p.strokeColor = color);
	turtle.pathMap(p => p.strokeColor = color);

	return turtle;
}