export function fillColor(color, turtle) {
	// turtle.path.flat().forEach(p => p.fillColor = color);
	turtle.pathMap(p => p.fillColor = color);
	return turtle;
}
