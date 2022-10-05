const ATtiny412 = {"VCC":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.075],"layers":["F.Cu"],"index":1},"PA6":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.025],"layers":["F.Cu"],"index":2},"PA7":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.025],"layers":["F.Cu"],"index":3},"PA1":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.075],"layers":["F.Cu"],"index":4},"PA2":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.075],"layers":["F.Cu"],"index":5},"UPDI":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.025],"layers":["F.Cu"],"index":6},"PA3":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.025],"layers":["F.Cu"],"index":7},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.075],"layers":["F.Cu"],"index":8}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const LED_1206 = {"A":{"shape":"M -0.037,0.034L 0.027,0.034L 0.027,-0.034L -0.037,-0.034L -0.037,0.034","pos":[-0.055,0],"layers":["F.Cu"],"index":1},"C":{"shape":"M -0.027,0.034L 0.037,0.034L 0.037,-0.034L -0.027,-0.034L -0.027,0.034","pos":[0.055,0],"layers":["F.Cu"],"index":2}};
const header_FTDI = {"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.25],"layers":["F.Cu"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu"],"index":6}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .77 // board width
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
let IC1 = board.add(ATtiny412, {translate: pt(x+.19, y+.36), name: 'IC1\nt412'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.padY("VCC")+.08), name: 'C1 1uF'});
let R1 = board.add(R_1206, {translate: pt(IC1.posX, IC1.padY("PA1")-.08), name: 'R1 1k'});
let LED1 = board.add(LED_1206, {translate: pt(R1.posX, R1.posY-.1), name: 'LED1'});
let J1 = board.add(header_FTDI, {translate: pt(x+width-.23, IC1.posY-.05), name: 'J1\nFTDI'});
let R2 = board.add(R_1206, {translate: pt(J1.posX-.12, J1.padY("Tx")-.05), rotate: 90, name: 'R2\n4.99k'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([C1.pad("1"),
            pt(IC1.padX("VCC"), C1.posY),
            IC1.pad("VCC")], w);

board.wire([C1.pad("2"),
            pt(IC1.padX("GND"), C1.posY),
            IC1.pad("GND")], w);

board.wire([IC1.pad("PA2"),
            pt(IC1.padX("PA2"), R1.posY),
            R1.pad("2")], w);

board.wire([LED1.pad("A"),
            pt(IC1.padX("VCC")-.06, LED1.padY("A")),
            pt(IC1.padX("VCC")-.06, IC1.padY("VCC")),
            IC1.pad("VCC")], w);

board.wire([LED1.pad("C"),
            pt(LED1.posX, LED1.posY),
            pt(R1.posX, R1.posY),
            R1.pad("1")], w);

board.wire([J1.pad("GND"),
            pt(C1.padX("2"), J1.padY("GND")),
            C1.pad("2")], w);

board.wire([C1.pad("1"),
            pt(C1.padX("1"), J1.padY("GND")+.05),
            pt(J1.posX+.1, J1.padY("GND")+.05),
            pt(J1.posX+.1, J1.padY("VCC")),
            J1.pad("VCC")], w);

board.wire([IC1.pad("UPDI"),
            pt(IC1.padX("UPDI")+.06, IC1.padY("UPDI")),
            pt(IC1.padX("UPDI")+.06, R2.padY("1")),
            R2.pad("1")], w);

board.wire([R2.pad("1"),
            pt(R2.posX, J1.padY("Rx")),
            J1.pad("Rx")], w);

board.wire([R2.pad("2"),
            pt(R2.posX, J1.padY("Tx")),
            J1.pad("Tx")], w);


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
