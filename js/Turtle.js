import { Turtle } from "../libs/gram-js.js";

function circle(radius) {
  return new Turtle()
    .arc(360, radius)
    .originate()
}

function rectangle(width, height) { 
	return new Turtle() 
	  .forward(width)
	  .right(90)
	  .forward(height)
	  .right(90)
	  .repeat(1)
	  .originate()
}

Turtle.prototype.circle = circle;
Turtle.prototype.rectangle = rectangle;

export { Turtle }