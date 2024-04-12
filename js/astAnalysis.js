const FUNCTIONS_STATIC_INFO = [
  "pt", 
  "path", 
  "input", 
  "footprint",
  "renderPCB"
];

const variableNameRegEx = /(const|let|var)([^=]+)/
const callRegEx = /([^\(]+)/

export function astAnalysis(string, ast) {
  const inserts = [];

  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  // Reset cursor as there might be another analysis pass before this.
  cursor.moveTo(0);

  const boardNameRe = /(const|let|var)([^=]*)=\s*new\s+PCB\s*\(\s*\)/;

  let boardName = string.match(boardNameRe);
  boardName = boardName ? boardName[2].trim() : null;

  if (boardName) FUNCTIONS_STATIC_INFO.push(`${boardName}.add`);
  if (boardName) FUNCTIONS_STATIC_INFO.push(`${boardName}.wire`);

  do {
    const value = getValue();

    if (cursor.name === "CallExpression") {
     
      // need to improve this to work with call being expression
      const { name, args, from, to } = getCall(cursor, string);

      if (FUNCTIONS_STATIC_INFO.includes(name)) {
        let variableName = "";

        const isVariableDeclaration = cursor.node?.parent?.name === "VariableDeclaration";

        if (isVariableDeclaration) {
          const parent = cursor.node.parent;

          variableName = string
            .slice(parent.from, parent.to)
            .match(variableNameRegEx)
            [2]
            .trim();
        }

        // OLD GET VARIABLE NAME, BAD

        // cursor.prev();
        // if (cursor.name === "Equals") {
        //   cursor.prev();
        //   variableName = getValue();
        //   cursor.next();
        // }
        // cursor.next();

        inserts.push({
          functionName: name === `${boardName}.add` ? "component" : name,
          from: from,
          to: to,
          snippet: args,
          variableName
        });
      }

    }

  } while (cursor.next());

  return { 
    inserts
  };
}

function getCall(cursor, string) {
  const node = cursor.node;
  const fullCall = string.slice(node.from, node.to);
  const name = fullCall.match(callRegEx)[1];
  const from = node.from+name.length;
  const to = node.to;
  const args = string.slice(from, to);
  const trimmedName = name.trim();
  const trimmedArgs = args.trim(); 
  
  return {
    name: trimmedName,
    args: trimmedArgs,
    from,
    to
  }
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