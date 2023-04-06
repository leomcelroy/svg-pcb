import { makeFootprintGeometry } from "./makeFootprintGeometry.js";

const FUNCTIONS_STATIC_INFO = [
  "pt", 
  "path", 
  "input", 
  // "footprint"
];

export function astAnalysis(string, ast) {
  const inserts = [];

  const footprints = getFootprints(string, ast);
  const componentDeclarations = getComponentDeclarations(string, ast);
  const layers = getLayers(string, ast);

  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  // Reset cursor as there might be another analysis pass before this.
  cursor.moveTo(0);

  do {
    const value = getValue();

    // if (cursor.name === "CallExpression") {
    //   const p0 = performance.now();
    //   const tree = makeTree(cursor, getValue)[0];
    //   const p1 = performance.now();
    //   treeMakingTime += (p1-p0);
    //   const functionName = tree[1][0].value;
    //   if (FUNCTIONS_STATIC_INFO.includes(functionName)) {
    //     const argList = tree[2][0];
    //     inserts.push({
    //       functionName,
    //       tree,
    //       from: argList.from,
    //       to: argList.to,
    //       snippet: argList.value
    //     });
    //   }

    // }

    if (cursor.name === "CallExpression") {
      // const p0 = performance.now();
      const [ name, args, from, to ] = getCall(cursor, getValue);
      // const p1 = performance.now();
      // treeMakingTime += (p1-p0);
      if (FUNCTIONS_STATIC_INFO.includes(name)) {
        inserts.push({
          functionName: name,
          from: from,
          to: to,
          snippet: args
        });
      }

    }

  } while (cursor.next());

  return { 
    inserts,
    footprints, 
    layers, 
    componentDeclarations
  };
}

function getComponentDeclarations(string, ast) {
  const componentDeclarations = [];
  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  cursor.moveTo(0);

  const re = /(const|let|var)([\s\S]*)=(.*)\.add\((.*),\s*({[\s\S]*})\s*\)/;

  do {
    const start = cursor.from;

    if (cursor.name === "VariableDeclaration") {
      const val = getValue();
      const match = val.match(re);
      if (match !== null) {
        const variableName = match[2].trim();
        const options = match[5];
        const indexCurly = val.indexOf(options) + start;

        componentDeclarations.push({ variableName, indexCurly })
      };
    }

  } while (cursor.next());
  
  return componentDeclarations;
}

const FOOTPRINTS = {};

function getFootprints(string, ast) {
  const footprints = [];
  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  cursor.moveTo(0);

  do {

    if (cursor.name === "VariableDeclaration") {

      cursor.firstChild();
      cursor.next();
      const name = getValue();

      cursor.next();
      cursor.next();

      if (cursor.name !== "ObjectExpression") continue;

      const footprintString = getValue();

      cursor.firstChild();
      cursor.next();
      cursor.firstChild();
      cursor.next();
      cursor.next();

      if (cursor.name !== "ObjectExpression") continue;

      const props = getObjKeys(cursor, getValue);

      if (!["shape", "pos", "layers"].every(key => props.includes(key))) continue;

      footprints.push(name);

      if (name in FOOTPRINTS && FOOTPRINTS[name].footprintString === footprintString) continue;

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

  } while (cursor.next());

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
  
  return fps;
}

function getLayers(string, ast) {
  
  const footprints = [];
  const cursor = ast.cursor();
  const getValue = () => string.slice(cursor.from, cursor.to);

  // const start = string.indexOf("renderPCB");
  // cursor.moveTo(start);

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