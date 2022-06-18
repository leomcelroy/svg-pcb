
export function setBooleanForm(clippedPaths, turtle, scale) {

	let newPaths = Object.values(clippedPaths.paths).map(p => {
		p = p.map( ({X, Y}) => ({x: X/scale, y: Y/scale}) );
		// I automatically close the paths
		const points = [ ...p, p[0] ];

		return { points, fillColor: "none", strokeWidth: 1, strokeColor: "black", construction: false };
	})


	turtle.path = newPaths;

	return turtle; 
};