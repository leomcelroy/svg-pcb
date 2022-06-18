export function addPoint(point, down, turtle) {
	const lastPath = turtle.lastPath();
	const lastPathPoints = lastPath.points;

	if (down) lastPathPoints.push(point);
	else if (lastPathPoints.length === 1) lastPath.points = [point];
	else {  // TODO this is wrong, should be nested next to last path
		turtle.path.push({
			points: [point],
			fillColor: "none",
			strokeWidth: 1,
			strokeColor: "black",
			construction: false,
			linecap: "butt", // "round" | "square"
			linejoin: "mitre", // "round" | "bevel"
		});
	}

	return turtle;
}