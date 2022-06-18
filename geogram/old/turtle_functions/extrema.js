// locations
export function extrema(turtle) {
	let xMin = Number.POSITIVE_INFINITY;
	let xMax = Number.NEGATIVE_INFINITY;
	let yMin = Number.POSITIVE_INFINITY;
	let yMax = Number.NEGATIVE_INFINITY;

	turtle.points.forEach(p => {
		if (xMin > p.x) xMin = p.x;
		if (xMax < p.x) xMax = p.x;
		if (yMin > p.y) yMin = p.y;
		if (yMax < p.y) yMax = p.y;
	});

	return {
		xMin,
		xMax,
		yMin,
		yMax
	};
}