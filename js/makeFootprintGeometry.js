import { pathD, translate, scale, outline, width, height, getPoint } from "../geogram/index.js";

export function makeFootprintGeometry(footprintObj) {
   const t =  [];

  for (const padName in footprintObj) {
    const pad = footprintObj[padName];

    if (!pad.layers.includes("F.Cu")) continue;

    let offset = [pad.pos[0], pad.pos[1]];

    if (pad.origin != undefined) {
      offset[0] = pad.origin[0];
      offset[1] = pad.origin[1];
    }

    // const [ dx, dy ] = pad.pos;

    t.push(...translate(pathD([], pad.shape), offset));
  }


  const w = width(t);
  const h = height(t);
  const center = getPoint(t, "cc");

  const maxDim = Math.max(w, h);

  translate(t, getPoint(t, "cc"), [-25, -25]);
  scale(t, [40/maxDim, 40/maxDim], getPoint(t, "cc"));

  return t;

}