export const defaultText = `// Name: New Board
// Designer: you
// Created: today

/*
Load existing SVG-PCB board design by dragging & dropping
a SVG-PCB .js file into this browser window
*/

/* -- DECLARE_COMPONENTS -- */
// List of imported component footprints

const SAMD11C = {"A05":{"shape":"M 0.03,0.015L -0.03,0.015L -0.0305,0.015L -0.031,0.015L -0.0321,0.0149L -0.0331,0.0147L -0.0336,0.0146L -0.0347,0.0142L -0.0356,0.0139L -0.0361,0.0137L -0.0366,0.0135L -0.0371,0.0132L -0.0375,0.013L -0.038,0.0127L -0.0384,0.0125L -0.0392,0.0118L -0.0396,0.0115L -0.0401,0.0112L -0.0412,0.0101L -0.0415,0.0096L -0.0418,0.0092L -0.0425,0.0084L -0.0427,0.008L -0.043,0.0075L -0.0432,0.0071L -0.0435,0.0066L -0.0437,0.0061L -0.0439,0.0056L -0.0442,0.0047L -0.0446,0.0036L -0.0447,0.0031L -0.0449,0.0021L -0.045,0.001L -0.045,-0.001L -0.0449,-0.0021L -0.0447,-0.0031L -0.0446,-0.0036L -0.0442,-0.0047L -0.0439,-0.0056L -0.0437,-0.0061L -0.0435,-0.0066L -0.0432,-0.0071L -0.043,-0.0075L -0.0427,-0.008L -0.0425,-0.0084L -0.0418,-0.0092L -0.0415,-0.0096L -0.0412,-0.0101L -0.0401,-0.0112L -0.0396,-0.0115L -0.0392,-0.0118L -0.0384,-0.0125L -0.038,-0.0127L -0.0375,-0.013L -0.0371,-0.0132L -0.0366,-0.0135L -0.0361,-0.0137L -0.0356,-0.0139L -0.0347,-0.0142L -0.0336,-0.0146L -0.0331,-0.0147L -0.0321,-0.0149L -0.031,-0.015L 0.03,-0.015L 0.03,0.015","pos":[-0.11,0.15],"layers":["F.Cu"],"index":1},"A08":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.1],"layers":["F.Cu"],"index":2},"A09":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.05],"layers":["F.Cu"],"index":3},"A14":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0],"layers":["F.Cu"],"index":4},"A15":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.05],"layers":["F.Cu"],"index":5},"RST":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.1],"layers":["F.Cu"],"index":6},"CLK":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.15],"layers":["F.Cu"],"index":7},"DIO":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.15],"layers":["F.Cu"],"index":8},"24-":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.1],"layers":["F.Cu"],"index":9},"25+":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.05],"layers":["F.Cu"],"index":10},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0],"layers":["F.Cu"],"index":11},"VDD":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.05],"layers":["F.Cu"],"index":12},"A02":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.1],"layers":["F.Cu"],"index":13},"A04":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.15],"layers":["F.Cu"],"index":14}};

// constants
const width = 1;
const height = 1;

/* -- DECLARE_PCB -- */
// Circuit board size and shape

let board = new PCB();

let interior = path(
  pt(-0.5, 0.5),
  pt(0.5, 0.5),
  pt(0.5, -0.5),
  pt(-0.5, -0.5),
);

board.addShape("interior", interior);

/* -- ADD_COMPONENTS -- */

/*
List of components dragged and dropped 
from component footprint list onto the board

Tip: If a component's location is dependent on 
another component's location...put the dependent 
component below the reference component 
*/

/* -- ADD_WIRES -- */

/*
List of wire traces on the board
Tip: Use component pad names to create constrained 
connections between component pads
*/

board.wire(path(), 0.03); //copy and paste this generic wire command to make a new wire connection

/* -- RENDER_PCB -- */
// Define the size and shape of the export boundary...should be slightly bigger than and fully enclose your PCB design

const limit0 = pt(-0.55, -0.55);
const limit1 = pt(0.55, 0.55);
const xMin = Math.min(limit0[0], limit1[0]);
const xMax = Math.max(limit0[0], limit1[0]);
const yMin = Math.min(limit0[1], limit1[1]);
const yMax = Math.max(limit0[1], limit1[1]);

renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "B.Mask": "#00000000",
    "F.Mask": "#00000000",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [xMin, xMax],
    y: [yMin, yMax]
  },
  mm_per_unit: 25.4
});
`

export const basicSetup = `/* 
@version: v0.1.0

a basic starter design 
*/

/* -- DECLARE_PCB -- */
const board = new PCB();

/* -- DECLARE_COMPONENTS -- */
const SAMD11C = footprint({"A05":{"shape":"M 0.03,0.015L -0.03,0.015L -0.0305,0.015L -0.031,0.015L -0.0321,0.0149L -0.0331,0.0147L -0.0336,0.0146L -0.0347,0.0142L -0.0356,0.0139L -0.0361,0.0137L -0.0366,0.0135L -0.0371,0.0132L -0.0375,0.013L -0.038,0.0127L -0.0384,0.0125L -0.0392,0.0118L -0.0396,0.0115L -0.0401,0.0112L -0.0412,0.0101L -0.0415,0.0096L -0.0418,0.0092L -0.0425,0.0084L -0.0427,0.008L -0.043,0.0075L -0.0432,0.0071L -0.0435,0.0066L -0.0437,0.0061L -0.0439,0.0056L -0.0442,0.0047L -0.0446,0.0036L -0.0447,0.0031L -0.0449,0.0021L -0.045,0.001L -0.045,-0.001L -0.0449,-0.0021L -0.0447,-0.0031L -0.0446,-0.0036L -0.0442,-0.0047L -0.0439,-0.0056L -0.0437,-0.0061L -0.0435,-0.0066L -0.0432,-0.0071L -0.043,-0.0075L -0.0427,-0.008L -0.0425,-0.0084L -0.0418,-0.0092L -0.0415,-0.0096L -0.0412,-0.0101L -0.0401,-0.0112L -0.0396,-0.0115L -0.0392,-0.0118L -0.0384,-0.0125L -0.038,-0.0127L -0.0375,-0.013L -0.0371,-0.0132L -0.0366,-0.0135L -0.0361,-0.0137L -0.0356,-0.0139L -0.0347,-0.0142L -0.0336,-0.0146L -0.0331,-0.0147L -0.0321,-0.0149L -0.031,-0.015L 0.03,-0.015L 0.03,0.015","pos":[-0.11,0.15],"layers":["F.Cu"],"index":1},"A08":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.1],"layers":["F.Cu"],"index":2},"A09":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.05],"layers":["F.Cu"],"index":3},"A14":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0],"layers":["F.Cu"],"index":4},"A15":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.05],"layers":["F.Cu"],"index":5},"RST":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.1],"layers":["F.Cu"],"index":6},"CLK":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.15],"layers":["F.Cu"],"index":7},"DIO":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.15],"layers":["F.Cu"],"index":8},"24-":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.1],"layers":["F.Cu"],"index":9},"25+":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.05],"layers":["F.Cu"],"index":10},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0],"layers":["F.Cu"],"index":11},"VDD":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.05],"layers":["F.Cu"],"index":12},"A02":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.1],"layers":["F.Cu"],"index":13},"A04":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.15],"layers":["F.Cu"],"index":14}});

/* -- CONSTANTS -- */
const width = 1;
const height = 1;

/* -- ADD_COMPONENTS -- */
const ic = board.add(SAMD11C, { translate: pt(-0.2, 0.050), rotate: 0, label: "SAMD11C" })

/* -- BOARD_SIZE_SHAPE -- */
const interior = path(
  [-0.5, 0.5],
  [0.5, 0.5],
  [0.5, -0.5],
  [-0.5, -0.5],
);

board.addShape("interior", interior);

/* -- ADD_WIRES -- */
board.wire(path(), 0.03);

/* -- RENDER_PCB -- */
const limit0 = pt(-0.55, -0.55);
const limit1 = pt(0.55, 0.55);
const xMin = Math.min(limit0[0], limit1[0]);
const xMax = Math.max(limit0[0], limit1[0]);
const yMin = Math.min(limit0[1], limit1[1]);
const yMax = Math.max(limit0[1], limit1[1]);

renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "B.Mask": "#00000000",
    "F.Mask": "#00000000",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [xMin, xMax],
    y: [yMin, yMax]
  },
  mm_per_unit: 25.4
});

`
