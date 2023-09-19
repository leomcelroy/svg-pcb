import { MM_PER_INCH } from "./constants.js";
import { global_state } from "./global_state.js";
import * as esprima from 'esprima';

const default_renderPCB_params = {
  pcb: null,
  layerColors: { "F.Cu": "#ff8c00cc" },
  limits: {
      x: [0, 1],
      y: [0, 1]
  },
  mm_per_unit: MM_PER_INCH,
  background: "#00000000"
}

export const renderPCB = flatten => (...args) => {
  let [
    [ { pcb, layerColors, limits, mm_per_unit, background } ], 
    staticInfo 
  ] = args;

  if (pcb === undefined) console.log("renderPCB must include pcb param");

  if (layerColors === undefined) layerColors = default_renderPCB_params.layerColors;
  if (limits === undefined) limits = default_renderPCB_params.limits;
  if (mm_per_unit === undefined) mm_per_unit = default_renderPCB_params.mm_per_unit;
  if (background === undefined) background = default_renderPCB_params.background;


  const shapes = [];
  for (const layer in layerColors) {
    const color = layerColors[layer];
    shapes.push({
      data: pcb.getLayer(layer, flatten), // could be pathData or text
      color,
      groupId: layer
    });
  }

  const referenceStr = getLayersString(staticInfo);

  // sort layers based on presence in 
  const tempLayers = [];
  for (const layer in pcb.layers) {
    let defaultColor = getValueForSubstring(referenceStr, layer);
    defaultColor = defaultColor ?? "#000000ff"; 
    const color = layerColors[layer] ?? defaultColor
    const visible = layer in layerColors;

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
  const range = findNode(tree, { type: "Identifier", name: "layerColors" } )
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

function getValueForSubstring(inputStr, targetSubstring) {
    const posOfSubstring = inputStr.indexOf(targetSubstring);
    
    if (posOfSubstring === -1) {
        return null;
    }

    const posOfColon = inputStr.indexOf(':', posOfSubstring);
    const posOfComma = inputStr.indexOf(',', posOfColon);

    // Extract the value between colon and comma, then trim it.
    const value = inputStr.substring(posOfColon + 1, posOfComma).trim();

    // Removing surrounding quotes if they exist.
    if (value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
    }
    return value;
}