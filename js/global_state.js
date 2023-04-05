import { MM_PER_INCH } from "./constants";

export const global_state = {
  version: "v0.0.1",
  codemirror: undefined,
  pcb: undefined,

  transforming: false,
  transformUpdate: () => {},
  
  selectBox: {},

  footprints: [],
  wires: [],
  shapes: [],

  limits: {
    x: [0, 1],
    y: [0, 1]
  },
  mm_per_unit: MM_PER_INCH,
  background: "#00000000",

  // -- grid --
  grid: true,
  gridSize: 0.05,
  adaptiveGrid: false,
  snapToPad: true,
  snapToPadRadius: 0.025,

  viewHandles: true,
  selectedPath: null,
  panZoomParams: undefined,
  previewFootprint: null,
  vimMode: false,
  
  paths: [],
  pts: [], 
  layers: [],
  inputs: [],

  componentMenu: false,
  componentSearch: "",
  downloadGerberModal: false,

  name: "",
  error: "",
  // how do you know what point values are and how they map to concrete syntax tree

  downloadGerberOptions: {
    layers: new Map([
      ["F.Cu", true],
      ["B.Cu", true],
      ["F.Mask", true],
      ["B.Mask", true],
      //["F.Silkscreen", false],
      //["B.Silkscreen", false],
      ["Outline", true],
      ["Drills", true]
    ]),
    includeOutline: true, // Include outline in all layers
    excellonMetric: true,
    protelFilenames: false
  }
}