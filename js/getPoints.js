import * as esprima from 'esprima';
import { syntaxTree, ensureSyntaxTree } from "@codemirror/language";
import { walk } from "./walk.js";

export function getPoints(state) {
  const doc = state.codemirror.view.state.doc;
  const string = doc.toString();
  const ast = ensureSyntaxTree(state.codemirror.view.state, doc.length, 10000);

  let texts = [];
  const cursor = ast.cursor()
  do {
    // console.log(`Node ${cursor.name} from ${cursor.from} to ${cursor.to} with value ${string.slice(cursor.from, cursor.to)}`, cursor);
    const value = string.slice(cursor.from, cursor.to);

    if (cursor.name !== "CallExpression" || value.slice(0, 2) !== "pt") continue;

    texts.push([ cursor.from, cursor.to ]);

  } while (cursor.next())

  const result = texts;

  // console.log(result);

  return result;
}