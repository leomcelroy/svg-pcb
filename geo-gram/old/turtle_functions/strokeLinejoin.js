export function strokeLinejoin(type, turtle) {
	const TYPES = ["round", "mitre", "bevel"]
	if (!TYPES.includes(type)) throw "Unrecognized type: " + type;

	// turtle.path.forEach(p => p.linejoin = type);
	turtle.pathMap(p => p.linejoin = type);

	return turtle;
}