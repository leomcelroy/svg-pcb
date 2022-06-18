export function pointMap(f, turtle) {
	return turtle.pathMap( path => ({ ...path, points: path.points.map(f) }) );
}