import * as esprima from 'esprima';

const FUNCTIONS_STATIC_INFO = [
  "pt", 
  "path", 
  "input", 
  "footprint",
];

export function astAnalysis(string, ast) {
  const inserts = [];

  const componentDeclarations = getComponentDeclarations(string, ast);
  const layers = getLayers(string, ast);

  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  // Reset cursor as there might be another analysis pass before this.
  cursor.moveTo(0);

  do {
    const value = getValue();

    if (cursor.name === "CallExpression") {
      const [ name, args, from, to ] = getCall(cursor, getValue);
      if (FUNCTIONS_STATIC_INFO.includes(name)) {
        let variableName = "";
        cursor.prev();
        if (cursor.name === "Equals") {
          cursor.prev();
          variableName = getValue();
          cursor.next();
        }
        cursor.next();

        inserts.push({
          functionName: name,
          from: from,
          to: to,
          snippet: args,
          variableName
        });
      }

    }

  } while (cursor.next());

  return { 
    inserts,
    layers, 
    componentDeclarations
  };
}

function getComponentDeclarations(string, ast) {
  const componentDeclarations = [];
  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  cursor.moveTo(0);

  const boardNameRe = /(const|let|var)([\s\S]*)=\s*new\s+PCB\(\)/;

  let boardName = string.match(boardNameRe);
  boardName = boardName ? boardName[2].trim() : "";

  if (boardName === "") return [];

  const callRegExAssign = new RegExp(String.raw`(const|let|var)([\s\S]*)=\s*${boardName}\s*\.\s*add\s*(\([\s\S]*\))`);
  const callRegEx = new RegExp(String.raw`${boardName}\.\s*add\s*(\([\s\S]*\))`);

  do {
    const start = cursor.from;

    if (cursor.name === "VariableDeclaration") {
      const snippet = getValue();
      const match = snippet.match(callRegExAssign);
      if (!match) continue;
      const variableName = match[2].trim();
      const args = match[3];
      const index = snippet.indexOf(args);
      const from = index + start;
      const to = index + args.length + start;

      componentDeclarations.push({
        from,
        to,
        variableName
      })
    }

  } while (cursor.next());
  
  return componentDeclarations;
}

function getLayers(string, ast) {
  
  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  cursor.moveTo(0);

  let layers = [];

  do {
    const value = getValue();
    // BUG: This causes infinite loop when layerColors not present
    if (cursor.name === "CallExpression" && value.slice(0, 9) === "renderPCB" && value.includes("layerColors")) {
     
      while (getValue() !== "layerColors" && cursor.next()) cursor.next();

      const tree = makeTree(cursor, getValue);

      layers = tree[1].slice(1);
    }
  } while (cursor.next());

  return layers;
}

function getCall(cursor, getValue) {
  const start = cursor.from;
  cursor.next();
  const name = getValue();
  cursor.next();
  const args = getValue();
  const from = cursor.from;
  const to = cursor.to;

  cursor.moveTo(start, 1);

  return [name, args, from, to];
}


function makeTree(cursor, getValue, func = null) {
  const start = cursor.from;

  const final = [];
  let stack = [ final ];

  const enter = node => {
    const value = getValue();
    if (["}", "{", "(", ")", ";", ":", ",", "[", "]"].includes(value)) return false;
    const newArr = [];
    stack.at(-1).push(newArr);
    stack.push(newArr);
    const raw = { name: node.name, from: node.from, to: node.to, value };
    const processed = func
      ? func(raw)
      : raw;
    stack.at(-1).push(processed);
  }

  const leave = () => {
    stack.pop();
  }

  cursor.iterate(enter, leave);

  cursor.moveTo(start, 1);
  return final;
}