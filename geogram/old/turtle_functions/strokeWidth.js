export function strokeWidth(width, turtle) {
	// turtle.path.forEach(p => p.strokeWidth = width);
	turtle.pathMap(p => p.strokeWidth = width);
	return turtle;
}