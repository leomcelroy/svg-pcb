export function height(turtle) {
	const {yMin, yMax} = turtle.extrema();
	return Math.abs(yMin - yMax);
}