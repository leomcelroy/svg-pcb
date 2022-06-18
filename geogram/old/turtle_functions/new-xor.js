import { polygonClipping } from "../../libs/polygon-clipping.js";

function flatten(items) {
  const flat = [];

  items.forEach(item => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
}

const convert = (turtle) => flatten(turtle.path).map(x => x.points.map(({x, y}) => [x, y]));

export function newXor(turtle, args) {
	const target = convert(turtle);
	const tools = [...args].map(convert);
	const result = target.reduce( 
		(acc, cur) => polygonClipping.xor( [cur], acc )
		,tools
	);
	let newPaths = result.flat().map(points => { // TODO: is this flatten depth correct
		return { points: points.map(p => ({x: p[0], y: p[1]})), fillColor: "none", strokeWidth: 1, strokeColor: "black", construction: false };
	})

	turtle.path = newPaths;

	return turtle; 

}
