import { MM_PER_INCH } from "./constants.js";
import { global_state } from "./global_state.js";
import * as esprima from 'esprima';

const default_renderPCB_params = {
  pcb: null,
  layers: [ 
    { name: "F.Cu", color: "#ff8c00cc" }
  ],
  limits: {
      x: [0, 1],
      y: [0, 1]
  },
  mm_per_unit: MM_PER_INCH,
  background: "#00000000"
}

export const renderPCB = flatten => (...args) => {
  let [
    [ { pcb, layers, limits, mm_per_unit, background } ], 
    staticInfo 
  ] = args;

  if (pcb === undefined) console.log("renderPCB must include pcb param");

  if (layers === undefined) layers = default_renderPCB_params.layers;
  if (limits === undefined) limits = default_renderPCB_params.limits;
  if (mm_per_unit === undefined) mm_per_unit = default_renderPCB_params.mm_per_unit;
  if (background === undefined) background = default_renderPCB_params.background;


  const shapes = [];
  for (const layer of layers) {
    const { color, name } = layer;
    shapes.push({
      data: pcb.getLayer(name, flatten), // could be pathData or text
      color,
      groupId: name
    });
  }

  const referenceStr = getLayersString(staticInfo);

  const colorMap = {};
  layers.forEach(({ name, color }) => colorMap[name] = color );

  // sort layers based on presence in 
  const tempLayers = [];
  for (const layer in pcb.layers) {
    let defaultColor = getColorByName(referenceStr, layer);
    defaultColor = defaultColor ?? "#000000ff"; 
    const color = colorMap[layer] ?? defaultColor
    const visible = layer in colorMap;

    const result = { color, visible, name: layer };
    tempLayers.push(result);
  }

  tempLayers.sort((a, b) => {
    a = a.name;
    b = b.name;
    
    return referenceStr.indexOf(a) - referenceStr.indexOf(b)
  });

  global_state.pcb = pcb;

  global_state.layers = tempLayers.flat();
  global_state.layersStaticInfo = staticInfo; // TODO

  global_state.shapes = shapes; // TODO ??? what should the shape format be { d: path data string, color: hex or valid svg color, classes: []}
  global_state.limits = limits;
  global_state.mm_per_unit = mm_per_unit;
  global_state.background = background;

  // renders the outline not the interior
}



const getLayersString = (staticInfo) => {
  const code = global_state.codemirror.view.state.doc.toString();
  const snippet = code.slice(staticInfo.from, staticInfo.to);

  const tree = esprima.parse(snippet, { range: true });
  const range = findNode(tree, { type: "Identifier", name: "layers" } )
    .getParent()
    .value
    .range;

  return snippet.slice(...range);
}

function findNode(ast, obj, parent = null) {
  if (typeof ast !== 'object' || ast === null) return null;

  // Add the getParent property to the current node
  Object.defineProperty(ast, 'getParent', {
      value: function() {
          return parent;
      },
      enumerable: false,  // To avoid this property showing up in loops or JSON.stringify
      writable: false
  });

  // Check if the current node matches the search object
  let isMatch = true;
  for (const key in obj) {
    if (ast[key] !== obj[key]) {
      isMatch = false;
      break;
    }
  }

  if (isMatch) return ast;

  // If not, continue searching its children
  for (const key in ast) {
    const childNode = findNode(ast[key], obj, ast);
    if (childNode) return childNode;
  }
  
  return null;
}

function getColorByName(inputStr, targetName) {
    const matches = inputStr
      .replaceAll(/\s/g, "")
      .match(/{[^}]+}/g);

    if (!matches) return null;

    for (let str of matches) {
        let obj;
        try {
            obj = strToObject(str);
        } catch {
            continue;
        }

        if (obj.name === targetName) {
            return obj.color;
        }
    }

    return null;
}

function strToObject(str) {
    try {
        // Add double quotes around keys to make it valid JSON
        const jsonFriendlyStr = str.replace(/(\w+):/g, '"$1":');
        return JSON.parse(jsonFriendlyStr);
    } catch (e) {
        console.error("Invalid string format");
        return null;
    }
}