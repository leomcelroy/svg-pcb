// import { Bezier } from "../../libs/Bezier.js";
import { flattenPath } from "../../libs/path-to-points.js";


export function pathD(string, turtle) {
  // console.log(Bezier);
  const polylines = flattenPath(string, {maxError: 0.001}).map(x => x.points);
  polylines.forEach(pl => {
    pl.forEach((point, i) => turtle.goTo(point, i !== 0));
  })

  return turtle;
}