
export function newStroke(start, type, turtle) { // could also do this where I start from turnForward location
	// type = "point" | "vec" | "turn forward"
	const {x, y} = turtle.end;
	if (Math.abs(start.x - x) < 0.00001 && Math.abs(start.y - y) < 0.00001) return turtle;

	const ps = turtle.points;
	if (ps.length === 1) {
		turtle.lastPath().points[0] = start
	} else { // TODO: does this change the layer?
		turtle.path.push({
			points: [start],
			fillColor: "none",
			strokeWidth: 1,
			strokeColor: "black",
			construction: false,
			linecap: "butt", // "round" | "square"
			linejoin: "mitre", // "round" | "bevel"
		});
		turtle.angle = 0;
	}

	return turtle;
}; 