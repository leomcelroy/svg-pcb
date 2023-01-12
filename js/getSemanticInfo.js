import * as esprima from 'esprima';
import { generate } from 'astring';
import { walk } from "./walk.js";
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

const isFootprint = (dec) => {
  let match = false;

  if (dec.type !== "ObjectExpression") return false;

  dec.properties.forEach( prop => {
    if (prop.value.type !== "ObjectExpression") return;

    const valueKeys = prop.value.properties.map( x => x.key.value );

    match = match || ["shape", "pos", "layers"].every( x => {
      return valueKeys.includes(x);
    })
  })

  return match;
}

function getFootprints(x, footprints) {
  if (x.type !== "VariableDeclaration") return;
  // it's a variable declaration

  x.declarations.forEach(dec => {
    if (dec.type !== "VariableDeclarator") return;

    if (isFootprint(dec.init)) {
      const footprintString = generate(dec.init);

      try {

        const footprintObj = JSON.parse(footprintString);
        const footprint = [
          dec.id.name, 
          footprintObj,
          makeFootprintGeometry(footprintObj)
        ]

        footprints.push(footprint);
      } catch (err) {}

    };
  })
}

const getPts = (pts) => (node) => {
  if (node.type !== "CallExpression") return;

  const callee = node.callee.name;

  if (callee !== "pt") return;


  pts.push(node.range);
}

export function getSemanticInfo(string) {
  const esprimaAST = esprima.parseScript(string, { range: true, comment: true });
  const footprints = [];
  const layers = [];

  esprimaAST.body.forEach( x => {
    getFootprints(x, footprints);
  })

  return {
    footprints,
    // pts,
  }
}
