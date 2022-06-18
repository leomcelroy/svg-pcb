export function translate(toPoint, fromPoint, turtle) {
	const {x: x0, y: y0 } = fromPoint;
	const {x: x1, y: y1 } = toPoint;
	const x = x1 - x0;
	const y = y1 - y0;
	
	turtle.path = turtle.pointMap(point => ({
		x: point.x + x,
		y: point.y + y
	}));

	return turtle;
}