export function lastPath(turtle) {
	let last = turtle.path;
	while (Array.isArray(last)) {
		last = last[last.length - 1];
	}

	return last;
}

// export function lastPath(turtle) {
// 	return lastPathHelper(turtle.path);
// }

// function lastPathHelper(path) {
// 	const last = path[path.length - 1];
// 	return Array.isArray(last) ? lastPathHelper(last) : last;
// }