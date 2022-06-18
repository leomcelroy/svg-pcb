
export function repeat(num, turtle) {
	let ogTurtle = turtle.copy();
	let start = ogTurtle.start;
	let startAngle = turtle.angle;

	let newTurtle, end;
	for (let i = 0; i < num; i++) {
		newTurtle = ogTurtle.copy();
		end = turtle.end;
		newTurtle.translate([end.x - start.x, end.y - start.y]);
		newTurtle.rotate(startAngle * (i + 1), newTurtle.start);
		newTurtle.points.forEach((p, i) => {
			if (i !== 0) turtle.addPoint(p)
			// turtle.addPoint(p)
		});
	}

	turtle.angle = startAngle * (num + 1);

	return turtle;
}