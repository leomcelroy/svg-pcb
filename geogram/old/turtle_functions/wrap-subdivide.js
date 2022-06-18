import { Turtle } from "../Turtle.js"


const getDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
const getAngle = (p1, p2) => (180 / Math.PI) * Math.atan2(p2.y - p1.y, p2.x - p1.x);

export function wrap(newAxis, turtle) {
	// turtle.moveto("start", 0, 0);
	// turtle.rotate(-getAngle(turtle.start(), turtle.end()), "start")
	// let travelled = 0;
	// let i = 0;
	turtle.path = turtle.pathMap(p => {
		let travelled = 0;
		for (let i = 1; i < newAxis.points().length; i++) {
			const p1 = newAxis.pointsFromFirst(i - 1);
			const p2 = newAxis.pointsFromFirst(i);
			const d = getDistance(p1, p2);
			if (travelled + d >= p.x) {
				const tempTurtle = new Turtle()
					.addPoint(p1)
					.turn(getAngle(p1, p2))
					.forward(p.x - travelled)
					.turn(90)
					.forward(p.y);

				const tempPoint = tempTurtle.lastPoint();
				return tempPoint;
			}
			travelled += d;
		}

		// if (i > newAxis.points.length()) return;

		// while (travelled + d)
	});

	turtle.path = turtle.pathFilter(p => p !== undefined);
	// if (turtle.points().length === 0) turtle.addPoint({x: 0, y: 0});
	turtle.alignHead();

	return turtle;
}

const getDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
const getAngle = (p1, p2) => (180 / Math.PI) * Math.atan2(p2.y - p1.y, p2.x - p1.x);

export function subdivide(stepSize, turtle) {
	let min = Number.POSITIVE_INFINITY;

	let p = a.path;


	let l = p.length;

	if (l < 2) return [
		[0, a.angle]
	]

	let das = [];

	let debt = 0;
	p.slice(1).forEach((point, i) => {

		let p0 = p[i];
		let d = getDistance(p0, point);

		let a = getAngle(p0, point)
		if (i > 0) {
			a -= getAngle(p[i - 1], p[i])
		}

		if (Math.abs(d) < min && d !== 0) {
			min = d;
		}

		if (d !== 0) {
			das.push([d, a + debt]);
			debt = 0;
		} else {
			debt += a;
		}
	})

	min = min1;

	let split = das.map(([d, a]) => {
		let ds = [];

		for (let i = 0; i < Math.round(d / min); i++) {
			if (d >= min) ds.push(i === 0 ? [min, a] : [min, 0]);
		}

		return ds;
	}).flat();

	return split;
}