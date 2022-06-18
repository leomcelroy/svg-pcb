export function pathMap(f, turtle) {
	return turtle.path.map(path => pathMapHelper(path, f));
}

function pathMapHelper(path, f) {
	return Array.isArray(path) ? path.map( p => pathMapHelper(p, f) ) : f(path);
}