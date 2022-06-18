export function turnForward(turn, distance, turtle) {
	turtle.turn(turn);
	turtle.forward(distance);

	return turtle;
}