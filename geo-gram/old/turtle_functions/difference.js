import Shape from "../../libs/simple-clipper.js";
import { group } from "../group.js";

// should I pass the tool in as well
// I'll only be able to take part of the tool so it could be confusing
// better to always take part of one thing
// in this case believe that's the last thing
export function difference(turtle, args) {
	turtle = args.length > 0 ? group(turtle, group(...args)) : turtle;

	const [subjectPaths, clipPaths] =  turtle.getBooleanForm();
	if (clipPaths === undefined || subjectPaths === undefined) return turtle;

	const subject = new Shape(subjectPaths, true);
	const clip = new Shape(clipPaths, true);
	const result = subject.difference(clip);
	turtle.setBooleanForm(result);                  
	return turtle;
}