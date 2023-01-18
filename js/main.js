import { init } from "./init.js";
import PathKitInit from '../PathKit/pathkit.js';


window.addEventListener("load", async () => {
	const PathKit = await PathKitInit({ 
		locateFile: (file) => {
			return "../PathKit/" + file 
		}
	});

	console.log(PathKit);

	let path = PathKit.FromSVGString('M150 0 L75 200 L225 200 Z');
	let pathOne = PathKit.NewPath().moveTo(0, 20).lineTo(10, 10).lineTo(20, 20).close();
	let pathTwo = PathKit.NewPath().moveTo(10, 20).lineTo(20, 10).lineTo(30, 20).close();
	let mountains = PathKit.MakeFromOp(path, pathTwo, PathKit.PathOp.UNION);
	
	console.log(mountains.toCmds());
	console.log(mountains.toSVGString());

	init();
});