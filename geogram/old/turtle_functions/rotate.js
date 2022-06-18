export function rotate(angle, point, turtle) {
	if (!point) point = turtle.centroid;
	
	turtle.path = turtle.pointMap(p => {

		let delta = (angle * 2 * Math.PI) / 360;

		let hereX = p.x - point.x;
		let hereY = p.y - point.y;

		let newPoint = {
			x: hereX * Math.cos(delta) - hereY * Math.sin(delta) + point.x,
			y: hereY * Math.cos(delta) + hereX * Math.sin(delta) + point.y
		};

		return newPoint;
	});

	turtle.angle = turtle.angle + angle;

	return turtle;
}
// this goes around origin
// a = 242 / 180 * Math.PI
// t = g
// 	.rectangle(10, 35)
// 	.transform([
// 		[Math.cos(a), -Math.sin(a), 0],
// 		[Math.sin(a), Math.cos(a), 0],
// 		[0, 0, 1]
// 	])
// 	.draw()

// https://math.stackexchange.com/questions/2093314/rotation-matrix-of-rotation-around-a-point-other-than-the-origin