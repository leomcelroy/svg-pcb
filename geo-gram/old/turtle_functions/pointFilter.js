export function pointFilter(f, turtle) {
	return turtle.pathMap(shape => ({ ...shape,
		points: shape.points.filter(f)
	}));
}