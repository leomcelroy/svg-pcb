import Shape from "../../libs/simple-clipper.js";
import { group } from "../group.js";

export function intersect(turtle, args) {
	turtle = args.length > 0 ? group(turtle, group(...args)) : turtle;
	
	const [subjectPaths, clipPaths] =  turtle.getBooleanForm();
	if (clipPaths === undefined || subjectPaths === undefined) return turtle;

	const subject = new Shape(subjectPaths, true);
	const clip = new Shape(clipPaths, true);
	const result = subject.intersect(clip);
	turtle.setBooleanForm(result);                  
	return turtle;
}