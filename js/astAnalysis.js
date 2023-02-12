import { makeFootprintGeometry } from "./getSemanticInfo.js";
import { global_state } from "./global_state.js";

const FOOTPRINTS = {};

const getObjKeys = (cursor, getValue) => {
  const props = [];

  const start = cursor.from;

  cursor.firstChild();
  cursor.nextSibling();
  cursor.firstChild();
  const prop0 = getValue();

  props.push({ key: prop0, from: cursor.from, to: cursor.to });

  while (
    cursor.parent() 
    && cursor.nextSibling() 
    && cursor.nextSibling()
    && cursor.firstChild()) props.push({ key: getValue(), from: cursor.from, to: cursor.to });

  cursor.moveTo(start, 1);
  
  // props will be wrapped in "..."
  return props.map(x => x.key.trim().slice(1, -1));
}

const getObj = (cursor, getValue) => {
  const obj = [];

  const start = cursor.from;
  cursor.firstChild();
  cursor.nextSibling();
  cursor.firstChild();
  const key = getValue();
  const keyFrom = cursor.from;
  const keyTo = cursor.to;
  cursor.nextSibling();
  cursor.nextSibling();
  const value = getValue();
  const valueFrom = cursor.from;
  const valueTo = cursor.to;

  obj.push({ key, value, keyFrom, keyTo, valueFrom, valueTo });

  while (
    cursor.parent() 
    && cursor.nextSibling() 
    && cursor.nextSibling()
    && cursor.firstChild()) {
      const key = getValue();
      const keyFrom = cursor.from;
      const keyTo = cursor.to;
      cursor.nextSibling();
      cursor.nextSibling();
      const value = getValue();
      const valueFrom = cursor.from;
      const valueTo = cursor.to;
      obj.push({ key, value, keyFrom, keyTo, valueFrom, valueTo });
  }

  cursor.moveTo(start, 1);
  
  return obj;
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

export function astAnalysis(string, ast) {
  const pts = [];
  const paths = [];
  const footprints = [];
  const inputs = [];
  let layers = [];

  const cursor = ast.cursor()
  const getValue = () => string.slice(cursor.from, cursor.to);

  do {
    // console.log(`Node ${cursor.name} from ${cursor.from} to ${cursor.to} with value ${string.slice(cursor.from, cursor.to)}`, cursor);
    const value = getValue();
    const startFrom = cursor.from;

    checkfootprint: if (cursor.name === "VariableDeclaration") {

      // We want to know the variable names of components added via PCB.add()
      if (value.includes(".add(")){

        // Find variable name of the component to be added via PCB.add()
        cursor.firstChild();
        cursor.next();
        const varName = getValue();

        // Add component variable name at a position defined by CallExpression statement
        global_state.componentVarNames[global_state.componentCounter] = varName;
        break checkfootprint;
      }

      cursor.firstChild();
      cursor.next();
      const name = getValue();

      cursor.next();
      cursor.next();

      if (cursor.name !== "ObjectExpression") {
        cursor.moveTo(startFrom, 1);
        break checkfootprint;
      }

      const footprintString = getValue();

      cursor.firstChild();
      cursor.next();
      cursor.firstChild();
      cursor.next();
      cursor.next();

      if (cursor.name !== "ObjectExpression") {
        cursor.moveTo(startFrom, 1);
        break checkfootprint;
      }

      const props = getObjKeys(cursor, getValue);

      if (!["shape", "pos", "layers"].every(key => props.includes(key))) {
        cursor.moveTo(startFrom, 1);
        break checkfootprint;
      }

      footprints.push(name);

      if (name in FOOTPRINTS && FOOTPRINTS[name].footprintString === footprintString) {
        cursor.moveTo(startFrom, 1);
        break checkfootprint;
      }

      try {
        const footprintObj = JSON.parse(footprintString);
        const footprint = {
          name,
          footprintString,
          footprintObj,
          geo: makeFootprintGeometry(footprintObj)
        }

        FOOTPRINTS[name] = footprint;
      } catch (err) { }
      
    }

    if (cursor.name === "CallExpression" && value.slice(0, 9) === "renderPCB") {
      while (getValue() !== "layerColors" && cursor.next()) cursor.next();

      // const tree0 = getObj(cursor, getValue);
      const tree = makeTree(cursor, getValue);

      // const layers = tree[1].slice(1).map(x => [ 
      //   x[1][0].value, 
      //   x[2][0].value,
      //   x[2][0].from,
      //   x[2][0].to,
      // ]);

      layers = tree[1].slice(1);
    }

    if (cursor.name === "CallExpression" && value.slice(0, 2) === "pt") {
      cursor.next();
      cursor.next();
      pts.push({
        from: cursor.from,
        to: cursor.to,
        snippet: getValue()
      });
    }

    if (cursor.name === "CallExpression" && value.slice(0, 5) === "input") {
      cursor.next();
      cursor.next();
      const start = cursor.from;
      const end = cursor.to;
      cursor.next();
      cursor.next();
      const tree = makeTree(cursor, getValue)[0];
      tree.slice(1).forEach(node => {
        const propKey = node[1][0];
        if (propKey.value === "value") {
          const propValue = node[2][0];
          const valueIndices = { 
            from: propValue.from, 
            to: propValue.to,
            start,
            end
          }
          inputs.push(valueIndices);
        }
      })
    }

    if (cursor.name === "CallExpression" && value.slice(0, 4) === "path") {
      cursor.next();
      cursor.next();
      paths.push({
        from: cursor.from,
        to: cursor.to,
      });
    }

    // Increase component counter for each PCB.add() call.
    if (cursor.name === "CallExpression" && value.includes(".add(")) {
      global_state.componentCounter++;
    }

  } while (cursor.next());

  // Reset component counter before PCB.add() calls start coming in
  global_state.componentCounter = 0;
  const fps = [];

  for (const fp in FOOTPRINTS) {
    if (!footprints.includes(fp)) {
      delete FOOTPRINTS[fp];
      continue;
    }

    const value = FOOTPRINTS[fp];

    fps.push([
      fp,
      value.footprintObj,
      value.geo
    ])
  }

  // console.log(layers);

  return { 
    pts, 
    paths, 
    footprints: fps, 
    layers, 
    inputs 
  };
}