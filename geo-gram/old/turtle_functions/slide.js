 

 export function slide(angle, distance, turtle) {
 	turtle.path = turtle.pointMap(point => ({
		x: point.x + distance*Math.cos(angle/180*Math.PI),
		y: point.y + distance*Math.sin(angle/180*Math.PI)
 	}))

 	return turtle;
 }