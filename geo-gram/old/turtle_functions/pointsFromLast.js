export function pointsFromLast(i, turtle) {
	return turtle.lastPath().points.slice((-1) - i)[0];
}