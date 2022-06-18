export function width(turtle) {
	const {xMin, xMax} = turtle.extrema();
	return Math.abs(xMin - xMax);
}