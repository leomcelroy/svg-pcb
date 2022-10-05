const ATtiny412 = {"VCC":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.075],"layers":["F.Cu"],"index":1},"PA6":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.025],"layers":["F.Cu"],"index":2},"PA7":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.025],"layers":["F.Cu"],"index":3},"PA1":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.075],"layers":["F.Cu"],"index":4},"PA2":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.075],"layers":["F.Cu"],"index":5},"UPDI":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.025],"layers":["F.Cu"],"index":6},"PA3":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.025],"layers":["F.Cu"],"index":7},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.075],"layers":["F.Cu"],"index":8}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const header_UPDI_3 = {"UPDI":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.1],"layers":["F.Cu"],"index":1},"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.1],"layers":["F.Cu"],"index":3}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const LED_1206 = {"A":{"shape":"M -0.037,0.034L 0.027,0.034L 0.027,-0.034L -0.037,-0.034L -0.037,0.034","pos":[-0.055,0],"layers":["F.Cu"],"index":1},"C":{"shape":"M -0.027,0.034L 0.037,0.034L 0.037,-0.034L -0.027,-0.034L -0.027,0.034","pos":[0.055,0],"layers":["F.Cu"],"index":2}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .47 // board width
const height = .65 // board height
const x = 1 // x origin
const y = 1 // y origin
const zt = 0 // top z
const zb = -0.06 // bottom z
const w = .015 // wire width
const mask = .004 // solder mask size
const border = 0.05 // rendering border


/* -- DECLARE_PCB -- */
let board = new PCB();

let interior = geo.translate(geo.rectangle(width, height), [x+width/2, y+height/2]);


/* -- ADD_COMPONENTS -- */
let IC1 = board.add(ATtiny412, {translate: pt(x+.18, y+.43), name: 'IC1\nt412'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.padY("VCC")+.08), name: 'C1 1uF'});
let J1 = board.add(header_UPDI_3, {translate: pt(IC1.posX, y+.23), rotate: 90, name: 'J1\nUPDI'});
let R1 = board.add(R_1206, {translate: pt(IC1.posX+.23, IC1.posY-.01), rotate: 90, name: 'R1\n1k'});
let LED1 = board.add(LED_1206, {translate: pt(R1.posX, R1.posY-.23), rotate: -90, name: 'LED1'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([C1.pad("1"),
            pt(IC1.padX("VCC"), C1.posY),
            IC1.pad("VCC")], w);

board.wire([C1.pad("2"),
            pt(IC1.padX("GND"), C1.posY),
            IC1.pad("GND")], w);

board.wire([IC1.pad("UPDI"),
            pt(IC1.posX+.03, IC1.padY("UPDI")),
            pt(IC1.posX+.03, IC1.padY("PA2")-.02),
            pt(J1.padX("UPDI"), IC1.padY("PA2")-.09),
            J1.pad("UPDI")], w);

board.wire([IC1.pad("GND"),
            pt(IC1.posX, IC1.padY("GND")),
            J1.pad("GND")], w);

board.wire([IC1.pad("VCC"),
            pt(IC1.posX-.03, IC1.padY("VCC")),
            pt(IC1.posX-.03, IC1.padY("PA1")-.02),
            pt(J1.padX("VCC"), IC1.padY("PA1")-.09),
            J1.pad("VCC")], w);

board.wire([IC1.pad("PA3"),
            pt(R1.posX, IC1.padY("PA3")),
            R1.pad("2")], w);

board.wire([J1.pad("GND"),
            pt(J1.padX("GND"), J1.posY-.1),
            pt(LED1.posX, J1.posY-.1)], w);

board.wire([LED1.pad("A"),
            R1.pad("1")], w);


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
