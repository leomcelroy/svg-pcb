export function reverse(turtle) {
	turtle.path = turtle.path.map(x => ({ ...x,
		points: x.points.reverse()
	}));
	turtle.alignHead();

	return turtle;
}