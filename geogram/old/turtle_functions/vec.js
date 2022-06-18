export function vec([x, y], down, turtle) {
	// guard statement
	// if distance is zero then we just get stacked points so let's just not
	if (x === 0 && y === 0) return turtle;

	const {x: lx, y: ly} = turtle.end;
	turtle.addPoint({x: lx + x, y: ly + y}, down);
	turtle.angle = Math.atan2(y, x) * 180 / Math.PI;
	
	return turtle;
}