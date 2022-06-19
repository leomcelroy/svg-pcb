import { extrema } from "./extrema.js";

export const getPoint = (shape, target) => {
  if (shape.length === 0) shape.push([ { x:0, y:0 } ]);
  if (target === "start") return shape[0][0];
  else if (target === "end") return shape.at(-1).at(-1);

  let {
    xMax,
    xMin,
    yMax,
    yMin
  } = extrema(shape);

  let middX = (xMax + xMin) / 2;
  let middY = (yMax + yMin) / 2;

  if (target === "cc") return { x: middX, y: middY };
  else if (target === "lb") return { x: xMin, y: yMin };
  else if (target === "rt") return { x: xMax, y: yMax };
  else if (target === "lc") return {
    x: xMin,
    y: middY
  };
  else if (target === "lt") return {
    x: xMin,
    y: yMax
  };
  else if (target === "cb") return {
    x: middX,
    y: yMin
  };
  else if (target === "ct") return {
    x: middX,
    y: yMax
  };
  else if (target === "rb") return {
    x: xMax,
    y: yMin
  };
  else if (target === "rc") return {
    x: xMax,
    y: middY
  };

  // interesting that "origin" is the url
  else throw "\"" + target + "\"" + ` is not an origin point. "right" or "left" come first then "bottom" or "top"`
}