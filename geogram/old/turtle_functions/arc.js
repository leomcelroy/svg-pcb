export function arc(angle, radius, down, turtle) {

	const chord = (r, theta) => 2 * r * Math.sin(theta*Math.PI/360)
	const newPoint = (curAngle, curPoint, distance) => {
		const xCos = Math.cos(curAngle*Math.PI/180);
		const ySin = Math.sin(curAngle*Math.PI/180);
		const x = curPoint.x + distance * xCos;
		const y = curPoint.y + distance * ySin;

		return { x, y };
	}

	if (angle < 0) radius = -radius;
	const endPoint = turtle.end;
	const ogAngle = turtle.angle;
	// max angle is angle
	// do so in 20 steps
	// stepsize is angle/20
	const res = Math.abs(Math.floor(angle/2));
	[...Array(res).keys()].forEach(step => {
		const ang = (180 - (360-angle/res*(step+1))/2 + ogAngle);
		const { x, y } = newPoint(ang, endPoint, chord(radius, angle/res*(step+1)));
		turtle.goTo( { x, y }, down );
	})

	turtle.setAngle(angle + ogAngle);

	return turtle;
}