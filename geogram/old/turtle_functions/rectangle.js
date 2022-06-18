export function rectangle(width, height, turtle) {
	turtle.forward(width);
	turtle.turn(-90);
	turtle.forward(height);
	turtle.turn(-90);
	turtle.forward(width);
	turtle.turn(-90);
	turtle.forward(height);

	return turtle;
}