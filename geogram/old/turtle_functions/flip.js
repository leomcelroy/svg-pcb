export function flip(direction, turtle) {
	const center = turtle.point("cc");

	let xDist, yDist;
	turtle.path = turtle.pointMap(p => {
		xDist = Math.abs(center.x - p.x);
		yDist = Math.abs(center.y - p.y);

		if (direction.includes("y")) {
			p.x = p.x < center.x ? p.x + 2 * xDist : p.x - 2 * xDist;
		}

		if (direction.includes("x")) {
			p.y = p.y < center.y ? p.y + 2 * yDist : p.y - 2 * yDist;
		}

		return p
	})

	return turtle;
}