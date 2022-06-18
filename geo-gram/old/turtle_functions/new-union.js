import { polygonClipping } from "../../libs/polygon-clipping.js";
import polybooljs from 'https://cdn.skypack.dev/polybooljs';
import * as martinez from 'https://cdn.skypack.dev/martinez-polygon-clipping';
import { gh } from "../../libs/greiner-hormann.js"
import dPolygonBoolean from 'https://cdn.skypack.dev/2d-polygon-boolean';

console.log(dPolygonBoolean);

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

const convert = (turtle) => flatten(turtle.path)
	.map(x => x.points
		.map(({x, y}) => [x, y])
		// .slice(0, x.points.length - 1)
	);

const convert2 = (turtle) => flatten(turtle.path).map(x => x.points.map(
		({x, y}) => [
			Math.round(x*1000)/1000, 
			Math.round(y*1000)/1000, 
			])
	.slice(0, x.points.length - 1)
);

export function newUnion(turtle, args) {
	const target = convert(turtle);
	const tools = [...args].map(convert);
	console.log({target, tools});
	let result = polygonClipping.union(target, tools);

	// polygonClipping.union(target, ...tools);
	// const result = polygonClipping.union(target, tools);
	// const result2 = polybooljs.union(
	// 	{
	// 		regions: target,
	// 		inverted: false
	// 	}, 
	// 	{
	// 		regions: tools,
	// 		inverted: false
	// 	}
	// )

	// const result3 = gh.union(target, tools);
	// const result4 = dPolygonBoolean(target[0], tools[0], 'and');

	console.log("r", result);
	let newPaths = result.flat().map(points => { // TODO: is this flatten depth correct
		return { points: points.map(p => ({x: p[0], y: p[1]})), fillColor: "none", strokeWidth: 1, strokeColor: "black", construction: false };
	})

	turtle.path = newPaths;

	return turtle; 

}
