
function updateSelectedPath(state) {
  const doc = state.codemirror.view.state.doc;
  let string = doc.toString();
  const ast = ensureSyntaxTree(state.codemirror.view.state, doc.length, 10000);

  const paths = getPaths(string, ast);

  let selectedPath = null;
  paths.forEach(path => {
    const { from: pathStart, to: pathEnd } = path;
    const selections = global_state.codemirror.view.state.selection.ranges;
    
    const tempSelectedPath = selections.some(selection => {
      const { from, to } = selection;
      // if selection greater than pathStart and less than path end
      return from > pathStart && to < pathEnd;
    })

    if (tempSelectedPath) {
      selectedPath = {
        pathStart,
        pathEnd,
        str: string.substr(pathStart, pathEnd - pathStart),
      };
    }
  })


  global_state.selectedPath = selectedPath;

  dispatch("RENDER");
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

function getPaths(string, ast) {
  const paths = [];

  const cursor = ast.cursor()
  const getValue = () => string.slice(cursor.from, cursor.to);

  do {
    // console.log(`Node ${cursor.name} from ${cursor.from} to ${cursor.to} with value ${string.slice(cursor.from, cursor.to)}`, cursor);
    const startFrom = cursor.from;
    const value = getValue();

    if (cursor.name === "CallExpression" && value.slice(0, 4) === "path") {
      cursor.next();
      cursor.next();
      paths.push({
        from: cursor.from,
        to: cursor.to,
      });
    }

  } while (cursor.next());

 

  return paths
}








