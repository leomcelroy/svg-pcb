import Shape from "../../libs/simple-clipper.js";

const pointAdjust = (p, scale) => {
	const temp = {};
	temp["X"] = Math.round(p.x*scale);
	temp["Y"] = Math.round(p.y*scale);
	return temp;
}

export function flatten(turtle) {
	const pls = turtle.polylines();
	const adjustedPls = pls.map(x => x.pts.map(p => pointAdjust(p, turtle.booleanScale)));
	const [ first, ...rest ] = adjustedPls;
	let subject = new Shape( [ first ], true);

	rest.forEach(pl => {
		const clip = new Shape( [ pl ], true);
		subject = subject.union(clip);
	})
                 
	return turtle.setBooleanForm(subject);
}