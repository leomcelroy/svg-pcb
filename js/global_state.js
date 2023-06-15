import { MM_PER_INCH } from "./constants";
import { KiCadPadPrimitiveShape, KiCadPadShapeType } from "./events/downloadKiCad";

export const global_state = {
  version: "v0.1.0",
  codemirror: undefined,
  pcb: undefined,
  heldKeys: new Set(),
  transforming: false,
  transformUpdate: () => {},

  selectBox: {},

  footprints: {},
  wires: [],
  shapes: [],

  idToName: {},

  limits: {
    x: [0, 1],
    y: [0, 1]
  },
  mm_per_unit: MM_PER_INCH,
  background: "#00000000",

  // -- grid --
  grid: false,
  gridSize: 0.05,
  adaptiveGrid: false,
  snapToPad: true,
  snapToPadRadius: 0.025,

  viewHandles: true,
  panZoomParams: undefined,
  previewFootprint: null,
  vimMode: false,

  preview: null,

  // these are added through renderpath
  paths: [],

  cubicHandleManipulation: "symmetric",

  selectedPathIndex: -1,
  selectedPath: null, // { from, to, args }
  // these are added through path(...)
  selectablePaths: [],
  pts: [],
  layers: [],
  inputs: [],

  componentMenu: false,
  componentSearch: "",
  downloadGerberModal: false,
  downloadKiCadModal: false,

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
  },

  downloadKiCadOptions: {
    footprintLibraryName: "SvgPcb",
    padShapeType: KiCadPadShapeType.POLYGON,
    padPrimitiveShape: KiCadPadPrimitiveShape.RECTANGLE
  }
}
