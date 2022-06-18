import { group } from "../group.js";

// function overlapping(p0, p1) {
//   const EPSILON = 0.0001;
//   return Math.abs(p0.x - p1.x) < EPSILON && Math.abs(p0.y-p1.y) < EPSILON;
// }

export function placeAlong(turtle, ogTurtle) {
	const fp = turtle.start; // first point
	const lp = turtle.end; // last point

	const newTurtles = turtle.points
		.reduce((acc, cur, i) => {
			const newTurtle = ogTurtle
				.copy()
				.translate(ogTurtle.cc, cur);

			// return overlapping(fp, lp) && i === turtle.points.length - 1 ? acc : acc.concat(newTurtle);
			return acc.concat(newTurtle);
		}, [])

	const grouped = group(...newTurtles);

	ogTurtle.path = grouped.path;
	// ogTurtle.angle = angle;
	return ogTurtle;
}