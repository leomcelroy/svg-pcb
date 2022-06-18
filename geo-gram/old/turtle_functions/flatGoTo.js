
// https://stackoverflow.com/questions/1571294/line-equation-with-angle#:~:text=m%20can%20be%20calculated%20by,then%20you%20can%20find%20n.&text=If%20you%20want%20to%20draw,y%20(we%20solved%20it).

export function flatGoTo(point, axis, turtle) {
	const { x, y } = point;
	
	const angle = turtle.angle;
	const end = turtle.end;
	// go forward till y value == y value of point
	// y = m*x + b
	// m = tan(angle) in rad
	const m = Math.tan(angle*Math.PI/180);
	const b = end.y - m*end.x;
	if (axis === "x") {
		const nextX = (y - b)/m;
		turtle.goTo( {x: nextX, y } )
	} else if (axis === "y") {
		const nextY = m*x + b;
		turtle.goTo( { x, y: nextY } )
	}
	
	turtle.goTo( {x, y} );
	return turtle;
}
