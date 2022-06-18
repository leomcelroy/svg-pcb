export function point(target, turtle) {
	if (target === "start") return turtle.pointsFromFirst(0);
	else if (target === "end") return turtle.pointsFromLast(0);

	let {
		xMax,
		xMin,
		yMax,
		yMin
	} = turtle.extrema();

	let middX = (xMax + xMin) / 2;
	let middY = (yMax + yMin) / 2;

	if (target === "center" || target === "center center" || target === "cc") return { x: middX, y: middY };
	else if (target === "min" || target === "left bottom" || target === "lb") return { x: xMin, y: yMin };
	else if (target === "max" || target === "right top" || target === "rt") return { x: xMax, y: yMax };
	else if (target === "min center" || target === "left center" || target === "lc") return {
		x: xMin,
		y: middY
	};
	else if (target === "min max" || target === "left top" || target === "lt") return {
		x: xMin,
		y: yMax
	};
	else if (target === "center min" || target === "center bottom" || target === "cb") return {
		x: middX,
		y: yMin
	};
	else if (target === "center max" || target === "center top" || target === "ct") return {
		x: middX,
		y: yMax
	};
	else if (target === "max min" || target === "right bottom" || target === "rb") return {
		x: xMax,
		y: yMin
	};
	else if (target === "max center" || target === "right center" || target === "rc") return {
		x: xMax,
		y: middY
	};

	// interesting that "origin" is the url
	else throw "\"" + target + "\"" + ` is not an origin point. "right" or "left" come first then "bottom" or "top"`
}