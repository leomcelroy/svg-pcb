export function turn(turn, turtle) {
	const angle = turtle.angle + (turn % 360);
	turtle.angle = angle;

	return turtle;
}