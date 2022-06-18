import Shape from "../../libs/simple-clipper.js";

// const scale = (num, sigFigs = 2) => Math.round(num * 10**sigFigs);

// const getPath = path => path.map( ({x, y}) => ({ X: scale(x), Y: scale(y) }) )

// const to = upper => [...Array(upper).keys()];

function polygonArea(vertices) { 
    var area = 0;

    for (var i = 0; i < vertices.length; i++) {
        let j = (i + 1) % vertices.length;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[j].x * vertices[i].y;
    }
    return area / 2;
}

const clockwise = ps => polygonArea(ps) > 0;

export function floodFill(color, turtle) {
	turtle.xor();
	turtle.pathMap((p, i) => {
		let cw = clockwise(p.points);
		if (cw) p.fillColor = color;
		else p.fillColor = "white";
	})

	return turtle;
}