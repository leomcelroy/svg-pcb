import { KiCadPadPrimitiveShape, KiCadPadShapeType } from "./events/downloadKiCad";
import { GerberDrillFormat } from "./events/downloadGerber";


export const global_state = {
  version: "v0.1.0", // need to do tagged release
  codemirror: undefined,
  pcb: undefined,
  heldKeys: new Set(),
  transforming: false,
  transformUpdate: () => {},

  fileHandle: null,
  needsSaving: false,

  selectBox: {},

  footprints: {},
  shapes: [],

  astInfo: {},

  idToName: {},

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
  layers: [], // TODO check type
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
      // ["F.Cu", true],
      // ["B.Cu", true],
      // ["F.Mask", true],
      // ["B.Mask", true],
      //["F.Silkscreen", false],
      //["B.Silkscreen", false],
      // ["Outline", true],
      // ["Drills", true]
    ]),
    includeOutline: true, // Include outline in all layers
    excellonMetric: true,
    protelFilenames: false,
    drillFormat: GerberDrillFormat.EXCELLON
  },

  downloadKiCadOptions: {
    footprintLibraryName: "SvgPcb",
    padShapeType: KiCadPadShapeType.POLYGON,
    padPrimitiveShape: KiCadPadPrimitiveShape.RECTANGLE
  },

  svgToModsOptions: {
    selectedMachine: undefined
  }
}
