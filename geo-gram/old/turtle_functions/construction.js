export function construction(turtle) {
	turtle.pathMap(p => p.construction = true);
	
	return turtle;
}