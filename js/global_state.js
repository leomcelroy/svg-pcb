export const global_state = {
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
  mm_per_unit: 25.4,
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

  name: "",
  error: ""
  // how do you know what point values are and how they map to concrete syntax tree
}