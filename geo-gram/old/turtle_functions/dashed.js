export function dashed(num, turtle) {
	turtle.pathMap(p => p.dashed = num);
	
	return turtle;
}