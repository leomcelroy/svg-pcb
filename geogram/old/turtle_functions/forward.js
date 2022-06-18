const degreesToRad = deg => (deg / 360) * 2 * Math.PI;

export function forward(distance, down, turtle) {
	// guard statement
	// if distance is zero then we just get stacked points so let's just not
	if (distance === 0) return turtle;

	const lastPoint = turtle.end;
	const angle = turtle.angle;
	const xCos = Math.cos(degreesToRad(angle));
	const ySin = Math.sin(degreesToRad(angle));
	const x = lastPoint.x + distance * xCos;
	const y = lastPoint.y + distance * ySin;

	turtle.addPoint( { x, y }, down);
	return turtle;
}