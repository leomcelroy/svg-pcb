import { extrema } from "./extrema.js";

export const getPoint = (shape, target) => {
  if (shape.length === 0) shape.push([ 0, 0 ]);
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

  if (target === "cc") return [ middX, middY ];
  else if (target === "lb") return [ xMin, yMin ];
  else if (target === "rt") return [ xMax, yMax ];
  else if (target === "lc") return [
    xMin,
    middY
  ];
  else if (target === "lt") return [
    xMin,
    yMax
  ];
  else if (target === "cb") return [
    middX,
    yMin
  ];
  else if (target === "ct") return [
    middX,
    yMax
  ];
  else if (target === "rb") return [
    xMax,
    yMin
  ];
  else if (target === "rc") return [
    xMax,
    middY
  ];

  // interesting that "origin" is the url
  else throw "\"" + target + "\"" + ` is not an origin point. "right" or "left" come first then "bottom" or "top"`
}