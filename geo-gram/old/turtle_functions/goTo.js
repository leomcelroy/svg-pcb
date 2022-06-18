export function goTo(point, down, turtle) {
	const end = turtle.end;
	const {x, y} = point;
	turtle.addPoint({ x, y }, down);
	turtle.angle = (Math.atan2(end.y - y, end.x - x) * 180 / Math.PI) + 180;
	return turtle;
}	