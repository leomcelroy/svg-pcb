import { Turtle } from "../libs/gram-js.js";

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

Turtle.prototype.circle = circle;
Turtle.prototype.rectangle = rectangle;

function subdivide(curve) {
   var firstMidpoints = midpoints(curve);
   var secondMidpoints = midpoints(firstMidpoints);
   var thirdMidpoints = midpoints(secondMidpoints);

   return [[curve[0], firstMidpoints[0], secondMidpoints[0], thirdMidpoints[0]],
          [thirdMidpoints[0], secondMidpoints[1], firstMidpoints[2], curve[3]]];
}

function midpoints(pointList) {
   var midpoint = function(p, q) {
      return [(p[0] + q[0]) / 2.0, (p[1] + q[1]) / 2.0];
   };

   var midpointList = new Array(pointList.length - 1);
   for (var i = 0; i < midpointList.length; i++) {
      midpointList[i] = midpoint(pointList[i], pointList[i+1]);
   }

   return midpointList;
}

function isFlat(curve) { // curves is 4 pts
   var tol = 10; // anything below 50 is roughly good-looking

   var ax = 3.0*curve[1][0] - 2.0*curve[0][0] - curve[3][0]; ax *= ax;
   var ay = 3.0*curve[1][1] - 2.0*curve[0][1] - curve[3][1]; ay *= ay;
   var bx = 3.0*curve[2][0] - curve[0][0] - 2.0*curve[3][0]; bx *= bx;
   var by = 3.0*curve[2][1] - curve[0][1] - 2.0*curve[3][1]; by *= by;

   return (Math.max(ax, bx) + Math.max(ay, by) <= tol);
}

// Example: lerp(0.5, 0.0, 1.0) == 0.5
const lerp = (t, p1, p2) => [
	(1 - t) * p1[0] + t * p2[0],
	(1 - t) * p1[1] + t * p2[1],
]

// Example: reduce(0.5, ...[0.0, 1.0, 2.0, 3.0]) == [0.5, 1.5, 2.5]
const reduce = (t, p1, p2, ...ps) => ps.length > 0
    ? [lerp(t, p1, p2), ...reduce(t, p2, ...ps)]
    : [lerp(t, p1, p2)];

// Example: deCasteljau(0.5, [0.0, 1.0, 2.0, 3.0]) == 1.5
const deCasteljau = (t, ps) => ps.length > 1
    ? deCasteljau(t, reduce(t, ...ps))
    : ps[0];

function bezier(ps, turtle) {
	const pts = [];
	for (let t = 0; t <= 1; t += 1/64 ) {
		const pt = deCasteljau(t, [ [ turtle.end.x, turtle.end.y ] , ...ps ]);
		pts.push(pt);
	}

	pts.forEach(pt => {
		turtle.goTo(pt);
	})

  return turtle;
}


Turtle.prototype.pathD = Turtle.prototype.bezier;
Turtle.prototype.bezier = function (...ps) {
	return bezier(ps, this);
}

export { Turtle }
