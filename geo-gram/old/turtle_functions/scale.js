export function scale([xScale, yScale], point, turtle) {	
	const { x, y } = point;
	turtle.path = turtle.pointMap(p => {

		let newPoint = {
			x: ((p.x-x) * xScale) + x,
			y: ((p.y-y) * yScale) + y
		};

		return newPoint;
	});

	turtle.alignHead();

	return turtle;
}