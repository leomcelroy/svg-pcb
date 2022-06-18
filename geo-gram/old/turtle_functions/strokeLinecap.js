export function strokeLinecap(type, turtle) {
	const TYPES = ["round", "butt", "square"]
	if (!TYPES.includes(type)) throw "Unrecognized type: " + type;

	// turtle.path.flat().forEach(p => p.linecap = type);
	turtle.pathMap(p => p.linecap = type);

	return turtle;
}