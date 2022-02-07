import esprima from 'esprima';
import { generate } from 'astring';
import { Turtle } from "./Turtle.js";

function makeSvgFootprint(footprintObj) {
  
  let svg = "";

  for (const padName in footprintObj) {
    const pad = footprintObj[padName];

    if (!pad.layers.includes("F.Cu")) continue;

    const [ dx, dy ] = pad.pos;

    svg += `<path d="${pad.shape}" style="transform: translate(${dx}px, ${dy}px);"></path>`
  }


  return `<g>${svg}</g>`;

}

function makeFootprintTurtle(footprintObj) {
  
   const t =  new Turtle();

  for (const padName in footprintObj) {
    const pad = footprintObj[padName];

    if (!pad.layers.includes("F.Cu")) continue;

    // const [ dx, dy ] = pad.pos;

    t.group(new Turtle().bezier(pad.shape).translate(pad.pos));
  }

  const w = t.width;
  const h = t.height;
  const center = t.cc;

  const maxDim = Math.max(w, h);

  return t
    .translate(t.cc, [-25, -25])
    .scale([40/maxDim, 40/maxDim], t.cc)
    .flatten();

}


export function getFootprints(string) {

  const esprimaAST = esprima.parseScript(string, { range: true, comment: true });

  const footprints = [];

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

  esprimaAST.body.forEach( x => {
    if (x.type !== "VariableDeclaration") return;
    // it's a variable declaration


    x.declarations.forEach(dec => {
      if (dec.type !== "VariableDeclarator") return;

      if (isFootprint(dec.init)) {
        const footprintString = generate(dec.init);

        try {
          const footprintObj = JSON.parse(footprintString);
          footprints.push([ dec.id.name, footprintObj ]);
        } catch (err) {}
        
      };
    })
  })



  return footprints.map(
    footprint => [...footprint, makeFootprintTurtle(footprint[1])]
  );
}