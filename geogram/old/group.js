import { Turtle } from "./Turtle.js";

export function group() {
	const turtles = arguments;

  let path = [];
  for (const turtle of turtles) {
    if (turtle.points.length === 1) continue;
    path = turtle.path.length === 1 
      ? [...path, ...turtle.path] 
      : [...path, turtle.path];
  };

  const final = new Turtle();
  if (path.length > 0) final.path = path;
  final.angle = turtles[turtles.length - 1].angle;

  return final;
}