export function firstPath(turtle) {
	return firstPathHelper(turtle.path);
}

function firstPathHelper(path) {
	const first = path[0];
	return Array.isArray(first) ? firstPathHelper(first) : first;
}