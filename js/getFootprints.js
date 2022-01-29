import esprima from 'esprima';
import { generate } from 'astring';

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

  return footprints;
}