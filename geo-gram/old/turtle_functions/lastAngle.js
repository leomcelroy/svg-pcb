export function lastAngle(turtle) {
	let angle;
	if (turtle.points.length > 1) {
		let lastPoint = turtle.pointsFromLast(0);
		let secondLastPoint = turtle.pointsFromLast(1);

		let x = lastPoint.x - secondLastPoint.x;
		let y = lastPoint.y - secondLastPoint.y;

		angle = Math.atan2(y, x) * 180 / Math.PI;
	} else {
		angle = 0;
	}

	return angle;
}