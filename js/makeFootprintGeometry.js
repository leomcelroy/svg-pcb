import { pathD, translate, scale, outline, width, height, getPoint } from "../geogram/index.js";

export function makeFootprintGeometry(footprintObj) {
   const t =  [];

   console.log(footprintObj)

  for (const padName in footprintObj) {
    // if (padName === "metadata") continue; // TODO

    const pad = footprintObj[padName];


    // TODO: this could cause bugs when missing
    if (!["F.Cu", "B.Cu"].some(layer => pad.layers.includes(layer))) continue;

    let offset = [pad.pos[0], pad.pos[1]];

    if (pad.origin != undefined) {
      offset[0] = pad.origin[0];
      offset[1] = pad.origin[1];
    }

    // const [ dx, dy ] = pad.pos;

    t.push(...translate(pathD([], pad.shape), offset));

  }

  if (t.length === 0) return [];



  const w = width(t);
  const h = height(t);
  const center = getPoint(t, "cc");

  const maxDim = Math.max(w, h);

  translate(t, getPoint(t, "cc"), [-25, -25]);
  scale(t, [40/maxDim, 40/maxDim], getPoint(t, "cc"));

  return t;

}