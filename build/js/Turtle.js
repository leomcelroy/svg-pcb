import { Turtle } from "../libs/gram-js.js";

function getPath(merge = true) {
	let result = [];
	const pls = this.polylines();

	for (let i = 0; i < pls.length; i++) {
		for (let j = 0; j < pls[i].pts.length; j++) {
			let pt = pls[i].pts[j];
			if (j === 0) result.push(`M ${pt.x} ${pt.y}`);
			else result[result.length-1] += `L ${pt.x} ${pt.y}`;
		}
	}

	return merge ? result.join(" ") : result;
}

function circle(radius) {
  return new Turtle()
    .arc(360, radius)
    .originate()
}

function rectangle(width, height) { 
	return new Turtle() 
	  .forward(width)
	  .right(90)
	  .forward(height)
	  .right(90)
	  .repeat(1)
	  .originate()
}

// const wire = ([x0, y0], [x1, y1], width, turtle) => { // z comparison with float is off
//     let dx = x1 - x0;
//     let dy = y1 - y0;
//     let L = Math.sqrt(dx * dx + dy * dy);
//     let nx = dx / L;
//     let ny = dy / L;

//     let r0X = x0 + nx * width / 2;
// 	let r0Y = y0 + ny * width / 2;
// 	let r1X = x0 - nx * width / 2;
// 	let r1Y = y0 - ny * width / 2;
// 	let r2X = x1 + nx * width / 2;
// 	let r2Y = y1 + ny * width / 2;
// 	let r3X = x1 - nx * width / 2;
// 	let r3Y = y1 - ny * width / 2;

//    	return new Turtle()
//     	.goTo([ r0X, r0Y ], false)
//     	.goTo([ r1X, r2Y ])
//     	.goTo([ r2X, r2Y ])
//     	.goTo([ r3X, r3Y ])
// }

Turtle.prototype.getPath = getPath;
Turtle.prototype.circle = circle;
Turtle.prototype.rectangle = rectangle;
// Turtle.prototype.wire = wire;

export { Turtle }