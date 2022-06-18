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

export function bezier(ps, turtle) {
	const pts = [];
	for (let t = 0; t <= 1; t += 1/32 ) {
		const pt = deCasteljau(t, ps);
		pts.push(pt);
	}

	pts.forEach(pt => {
		turtle.goTo(pt);
	})
	
  return turtle;
}