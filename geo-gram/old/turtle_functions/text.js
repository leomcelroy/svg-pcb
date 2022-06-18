// square distance between 2 points
function getSqDist(p1, p2) {

	var dx = p1[0] - p2[0],
		dy = p1[1] - p2[1];

	return dx * dx + dy * dy;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {

	var x = p1[0],
		y = p1[1],
		dx = p2[0] - x,
		dy = p2[1] - y;

	if (dx !== 0 || dy !== 0) {

		var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

		if (t > 1) {
			x = p2[0];
			y = p2[1];

		} else if (t > 0) {
			x += dx * t;
			y += dy * t;
		}
	}

	dx = p[0] - x;
	dy = p[1] - y;

	return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {

	var prevPoint = points[0],
		newPoints = [prevPoint],
		point;

	for (var i = 1, len = points.length; i < len; i++) {
		point = points[i];

		if (getSqDist(point, prevPoint) > sqTolerance) {
			newPoints.push(point);
			prevPoint = point;
		}
	}

	if (prevPoint !== point) newPoints.push(point);

	return newPoints;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
	var maxSqDist = sqTolerance,
		index;

	for (var i = first + 1; i < last; i++) {
		var sqDist = getSqSegDist(points[i], points[first], points[last]);

		if (sqDist > maxSqDist) {
			index = i;
			maxSqDist = sqDist;
		}
	}

	if (maxSqDist > sqTolerance) {
		if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
		simplified.push(points[index]);
		if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
	}
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, sqTolerance) {
	var last = points.length - 1;

	var simplified = [points[0]];
	simplifyDPStep(points, 0, last, sqTolerance, simplified);
	simplified.push(points[last]);

	return simplified;
}

// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {

	if (points.length <= 2) return points;

	var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

	points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
	points = simplifyDouglasPeucker(points, sqTolerance);

	return points;
}


function copy(out, a) {
	out[0] = a[0];
	out[1] = a[1];

	return out;
}


// chaikin's algorithm?
function smooth(points, pull = .9) {
	var output = [];
	const compPull = 1 - pull;

	if (points.length > 0) {
		output.push(copy([0, 0], points[0]));
	}

	for (var i = 0; i < points.length - 1; i++) {
		var p0 = points[i];
		var p1 = points[i + 1];
		var p0x = p0[0];
		var p0y = p0[1];
		var p1x = p1[0];
		var p1y = p1[1];


		output.push([pull * p0x + compPull * p1x, pull * p0y + compPull * p1y]);
		output.push([compPull * p0x + pull * p1x, compPull * p0y + pull * p1y]);
	}

	if (points.length > 1) {
		output.push(copy([0, 0], points[points.length - 1]));
	}

	return output;
};

function resize(canvas) {
	const { width: w, height: h } = canvas.getBoundingClientRect();
	canvas.width = w;
	canvas.height = h;

	return { w, h }
}

const getImgData = (canvas) => canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);

function draw(textString, canvas, resizeIt = true) {
	const { w, h } = resize(canvas);
	var ctx = canvas.getContext("2d");

	const padding = 0;

  	ctx.font = "100pt helvetica";
	ctx.textBaseline = 'middle';
	ctx.textAlign = "center";
	const mT = ctx.measureText(textString);
	const tw = mT.width + padding;
	const textHeight = mT.fontBoundingBoxAscent + mT.fontBoundingBoxDescent;

	if (resizeIt) {
		canvas.style.height = `${textHeight}px`;
		canvas.style.width = `${tw}px`;
	}

  	ctx.fillText(textString , tw/2, h/2);

	if (resizeIt) draw(textString, canvas, false);
}


//    0 --- side 0 --- 1
//    |                |
//    |                |
//  side 3           side 1
//    |                |
//    |                |
//    3 --- side 2 --- 2

// rule made in clockwise order

const ISO_VALUE = .5;

function interpolate(side, neighbors, step) {
	let y0, y1;
	if (side === 0) {
		y0 = neighbors[0];
		y1 = neighbors[1];
	} else if (side === 1) {
		y0 = neighbors[1];
		y1 = neighbors[2];
	} else if (side === 2) {
		y0 = neighbors[3];
		y1 = neighbors[2];
	} else if (side === 3) {
		y0 = neighbors[3];
		y1 = neighbors[0];
	}

	let x0 = -1;
	let x1 = 1;
	let m = (y1 - y0) / (x1 - x0)
	let b = y1 - m * x1;
	let pointFiveX = (ISO_VALUE - b) / m;
	return step * pointFiveX
}

const RULES_INTERPOLATED = {
	"0000": ([x, y], step, neighbors) => [],
	"0001": ([x, y], step, neighbors) => [ // down
		[
			[x - step, y - interpolate(3, neighbors, step)],
			[x + interpolate(2, neighbors, step), y + step]
		]
	],
	"0010": ([x, y], step, neighbors) => [ // right
		[
			[x + interpolate(2, neighbors, step), y + step],
			[x + step, y + interpolate(1, neighbors, step)]
		]
	],
	"0100": ([x, y], step, neighbors) => [ // up
		[
			[x + step, y + interpolate(1, neighbors, step)],
			[x + interpolate(0, neighbors, step), y - step]
		]
	],
	"1000": ([x, y], step, neighbors) => [ // left
		[
			[x + interpolate(0, neighbors, step), y - step],
			[x - step, y - interpolate(3, neighbors, step)]
		]
	],
	"0011": ([x, y], step, neighbors) => [ // right
		[
			[x - step, y - interpolate(3, neighbors, step)],
			[x + step, y + interpolate(1, neighbors, step)]
		]
	],
	"0101": ([x, y], step, neighbors) => [ // sweep
		[
			[x - step, y - interpolate(3, neighbors, step)],
			[x + interpolate(0, neighbors, step), y - step]
		],
		[
			[x + step, y + interpolate(1, neighbors, step)],
			[x + interpolate(2, neighbors, step), y + step]
		]
	],
	"1001": ([x, y], step, neighbors) => [ // down
		[
			[x + interpolate(0, neighbors, step), y - step],
			[x + interpolate(2, neighbors, step), y + step]
		]
	],
	"0110": ([x, y], step, neighbors) => [ // up
		[
			[x + interpolate(2, neighbors, step), y + step],
			[x + interpolate(0, neighbors, step), y - step]
		]
	],
	"1010": ([x, y], step, neighbors) => [ // sweep
		[
			[x + interpolate(2, neighbors, step), y + step],
			[x - step, y - interpolate(3, neighbors, step)]
		],
		[
			[x + interpolate(0, neighbors, step), y - step],
			[x + step, y + interpolate(1, neighbors, step)]
		]
	],
	"1100": ([x, y], step, neighbors) => [ // left
		[
			[x + step, y + interpolate(1, neighbors, step)],
			[x - step, y - interpolate(3, neighbors, step)]
		]
	],
	"0111": ([x, y], step, neighbors) => [ // up
		[
			[x - step, y - interpolate(3, neighbors, step)],
			[x + interpolate(0, neighbors, step), y - step]
		]
	],
	"1011": ([x, y], step, neighbors) => [ // right
		[
			[x + interpolate(0, neighbors, step), y - step],
			[x + step, y + interpolate(1, neighbors, step)]
		]
	],
	"1110": ([x, y], step, neighbors) => [ // left
		[
			[x + interpolate(2, neighbors, step), y + step],
			[x - step, y - interpolate(3, neighbors, step)]
		]
	],
	"1101": ([x, y], step, neighbors) => [ // down
		[
			[x + step, y + interpolate(1, neighbors, step)],
			[x + interpolate(2, neighbors, step), y + step]
		]
	],
	"1111": ([x, y], step, neighbors) => [],
}

const DIRECTION = {
	"0000": undefined,
	"0001": "down",
	"0010": "right",
	"0100": "up",
	"1000": "left",
	"0011": "right",
	"0101": undefined,
	"1001": "down",
	"0110": "up",
	"1010": undefined,
	"1100": "left",
	"0111": "up",
	"1011": "right",
	"1110": "left",
	"1101": "down",
	"1111": undefined,
}

function marchImage( imgData ) {
	let {
		data: og,
		width: w,
		height: h
	} = imgData;

	const getGrey = (row, col) => og[((row * w) + col) * 4 + 3] / 255;

	const getNeighbors = (row, col) => [
		getGrey(row - 1, col - 1),
		getGrey(row - 1, col),
		getGrey(row, col),
		getGrey(row, col - 1),
	]

	const getCode = neighbors => neighbors.map(x => x >= ISO_VALUE ? 1 : 0).join("");

	const allLines = [];
	const seen = {};

	let last = [];

	for (let y = 1; y < h; y++) {
		for (let x = 1; x < w; x++) {
			if (seen[`${x},${y}`]) continue;
			let neighbors = getNeighbors(y, x);
			let string = getCode(neighbors);
			let rule = RULES_INTERPOLATED[string];
			let direction = DIRECTION[string];
			const lines = rule([x, y], .5, neighbors);
			seen[`${x},${y}`] = true;
			let newPoints = lines.flat();
			if (newPoints.length > 0) allLines.push(lines.flat())
			if (direction) {
				let last = [x, y];
				while (direction) {
					if (direction === "up") y -= 1;
					else if (direction === "down") y += 1;
					else if (direction === "right") x += 1;
					else if (direction === "left") x -= 1;
					if (seen[`${x},${y}`] === true) break;
					neighbors = getNeighbors(y, x);
					string = getCode(neighbors);
					rule = RULES_INTERPOLATED[string];
					direction = DIRECTION[string];
					seen[`${x},${y}`] = true;
					let lines = rule([x, y], .5, neighbors);
					let lastPolyLine = allLines[allLines.length - 1];
					lines.forEach(l => {
						lastPolyLine.push(l[1]);
					});
				}
				[x, y] = last;
			}
		}
	}
	return allLines
}

function textToPolylines(str) {
	const canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	// make canvas
	draw(str, canvas);
	const imgData = getImgData(canvas);

	let lines = marchImage(imgData);
	lines = lines.map(line => {
		line = simplify(line, .1);
		// for (let i = 0; i < 1; i++) line = smooth(line, .9);

		return line.reverse();
	});

	document.body.removeChild(canvas);

	return lines;
}

const cache = {};

export function text(string, turtle) {
	const polylines = cache[string] || textToPolylines(string);
	cache[string] = polylines;

	polylines.forEach( pl => {
		pl.forEach( (point, i) => turtle.goTo(point, i !== 0) )
	})
	turtle.flip("x");

	return turtle;
}