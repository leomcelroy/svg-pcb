import * as esprima from 'esprima';
import { syntaxTree } from "@codemirror/language";
import { walk } from "./walk.js";

export function getPoints(state) {
  const string = state.codemirror.view.state.doc.toString();
  const ast = syntaxTree(state.codemirror.view.state);

  let texts = [];
  const cursor = ast.cursor()
  do {
    // console.log(`Node ${cursor.name} from ${cursor.from} to ${cursor.to} with value ${string.slice(cursor.from, cursor.to)}`, cursor);
    const value = string.slice(cursor.from, cursor.to);
    if (cursor.name !== "CallExpression" || value.slice(0, 2) !== "pt") continue;

    texts.push([ cursor.from, cursor.to ]);

  } while (cursor.next())

  const result = texts;;

  // console.log(result);

  return result;
}