import Shape from "../../libs/simple-clipper.js";

export function xor(turtle) {
  const [subjectPaths, clipPaths] =  turtle.getBooleanForm();
  if (clipPaths === undefined || subjectPaths === undefined) return turtle;
  const subject = new Shape(subjectPaths, true);
  const clip = new Shape(clipPaths, true);
  const result = subject.xor(clip);
  turtle.setBooleanForm(result);                  
  return turtle;
}