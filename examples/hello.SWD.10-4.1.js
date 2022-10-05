const header_SWD_4_1 = {"CLK":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[-0.107,0.05],"layers":["F.Cu"],"index":1},"DIO":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0.107,0.05],"layers":["F.Cu"],"index":2},"RST":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[-0.107,-0.05],"layers":["F.Cu"],"index":3},"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0.107,-0.05],"layers":["F.Cu"],"index":4}};
const header_SWD = {"VCC":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,-0.1],"layers":["F.Cu"],"index":1},"DIO":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,-0.1],"layers":["F.Cu"],"index":2},"GND1":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,-0.05],"layers":["F.Cu"],"index":3},"GND2":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0],"layers":["F.Cu"],"index":5},"GND3":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0.1],"layers":["F.Cu"],"index":9},"CLK":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,-0.05],"layers":["F.Cu"],"index":4},"SWO":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0],"layers":["F.Cu"],"index":6},"KEY":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0.05],"layers":["F.Cu"],"index":7},"NC":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0.05],"layers":["F.Cu"],"index":8},"RST":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0.1],"layers":["F.Cu"],"index":10}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .41 // board width
const height = .6 // board height
const x = 1 // x origin
const y = 1 // y origin
const zt = 0 // top z
const w = .015 // wire width
const mask = .004 // solder mask size
const border = 0.05 // rendering border


/* -- DECLARE_PCB -- */
let board = new PCB();

let interior = geo.translate(geo.rectangle(width, height), [x+width/2, y+height/2]);


/* -- ADD_COMPONENTS -- */
let J1 = board.add(header_SWD_4_1, {translate: pt(x+width/2+.005, y+.1), rotate: 180, name: 'J1 SWD'});
let J3 = board.add(header_SWD, {translate: pt(J1.posX, y+height-.19), rotate: -90, name: 'J3\ntarget'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([J3.pad("DIO"),
            pt(J1.padX("DIO")-.08, J3.padY("DIO")),
            pt(J1.padX("DIO")-.08, J1.padY("DIO")),
            J1.pad("DIO")], w);

board.wire([J3.pad("GND1"),
            pt(J3.padX("GND1"), J3.padY("GND1")-.09),
            pt(J3.posX, J3.padY("GND1")-.09),
            pt(J1.posX, J1.padY("GND")),
            J1.pad("GND")], w);

board.wire([J3.pad("CLK"),
            pt(J3.padX("CLK"), J3.padY("CLK")+.09),
            pt(J3.padX("RST")+.08, J3.padY("CLK")+.09),
            pt(J3.padX("RST")+.08, J1.padY("CLK")),
            J1.pad("CLK")], w);

board.wire([J3.pad("GND2"),
            pt(J1.posX, J1.padY("GND")),
            J1.pad("GND")], w);

board.wire([J3.pad("GND3"),
            pt(J3.padX("GND3"), J3.padY("GND3")-.09),
            pt(J3.posX, J3.padY("GND1")-.09),
            pt(J1.posX, J1.padY("GND")),
            J1.pad("GND")], w);

board.wire([J3.pad("RST"),
            pt(J3.padX("RST")+.05, J3.padY("RST")),
            pt(J3.padX("RST")+.05, J1.padY("RST")),
            J1.pad("RST")], w);


// rendering
renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "drill": "#ff3300e5",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [x-border, x+width+border],
    y: [y-border, y+height+border]
  },
  mm_per_unit: 25.4
})
