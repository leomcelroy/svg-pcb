import { generate } from 'astring';
import esprima from 'esprima';


export function getWires(string) {

  const esprimaAST = esprima.parseScript(string, { range: true, comment: true });

  console.log("getting wires", esprimaAST);

  const wires = [];

  const isWire = (term) => {
    let match = false;


    if (term.type !== "ExpressionStatement") return false;

    return term?.expression?.callee?.property?.name === "wire";;
  }

  esprimaAST.body.forEach( x => {


    if (!isWire(x)) return;

    // if both numbers (literal) then put handle at numbers
    // chamfer
    // fillet
    // bezier
  })



  return wires;
}