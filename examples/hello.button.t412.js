const ATtiny412 = {"VCC":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.075],"layers":["F.Cu"],"index":1},"PA6":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.025],"layers":["F.Cu"],"index":2},"PA7":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.025],"layers":["F.Cu"],"index":3},"PA1":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.075],"layers":["F.Cu"],"index":4},"PA2":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.075],"layers":["F.Cu"],"index":5},"UPDI":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.025],"layers":["F.Cu"],"index":6},"PA3":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.025],"layers":["F.Cu"],"index":7},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.075],"layers":["F.Cu"],"index":8}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const header_FTDI = {"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.25],"layers":["F.Cu"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu"],"index":6}};
const header_UPDI = {"UPDI":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":1},"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":2}};
const button_6mm = {"L1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,0.08],"layers":["F.Cu"],"index":1},"R1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,-0.08],"layers":["F.Cu"],"index":2},"R2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,-0.08],"layers":["F.Cu"],"index":3},"L2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,0.08],"layers":["F.Cu"],"index":4}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .93 // board width
const height = .68 // board height
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
let IC1 = board.add(ATtiny412, {translate: pt(x+.45, y+.44), name: 'IC1\nt412'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.padY("VCC")+.08), name: 'C1 1uF'});
let J1 = board.add(header_FTDI, {translate: pt(x+width-.23, IC1.posY-.1), name: 'J1\nserial\n5V'});
let J2 = board.add(header_UPDI, {translate: pt(IC1.posX, y+.23), rotate: 90, name: 'J2\nUPDI'});
let S1 = board.add(button_6mm, {translate: pt(J2.posX-.27, y+.2), rotate: 0, name: 'S1'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([C1.pad("1"),
            pt(IC1.padX("VCC"), C1.posY),
            IC1.pad("VCC")], w);

board.wire([J1.pad("GND"),
            pt(IC1.padX("GND"), J1.padY("GND")),
            IC1.pad("GND")], w);

board.wire([C1.pad("1"),
            pt(C1.padX("1"), C1.padY("1")+.06),
            pt(J1.posX+.1, C1.padY("1")+.06),
            pt(J1.posX+.1, J1.padY("VCC")),
            J1.pad("VCC")], w);

board.wire([pt(C1.padX("2"), J1.padY("GND")),
            pt(IC1.padX("GND"), J1.padY("GND")),
            IC1.pad("GND")], w);

board.wire([J2.pad("UPDI"),
            pt(IC1.posX+.03, J2.posY),
            pt(IC1.posX+.03, IC1.padY("UPDI")),
            IC1.pad("UPDI")], w);

board.wire([J2.pad("GND"),
            pt(IC1.posX, J2.posY),
            pt(IC1.posX, IC1.padY("GND")),
            IC1.pad("GND")], w);

board.wire([IC1.pad("PA6"),
            pt(IC1.padX("PA6")-.16, IC1.padY("PA6")),
            pt(IC1.padX("PA6")-.16, J2.posY-.2),
            pt(J1.posX-.08, J2.posY-.2),
            pt(J1.posX-.08, J1.padY("Rx")),
            J1.pad("Rx")], w);

board.wire([IC1.pad("PA7"),
            pt(IC1.padX("PA7")-.13, IC1.padY("PA7")),
            pt(IC1.padX("PA7")-.13, J2.posY-.17),
            pt(J1.posX-.11, J2.posY-.17),
            pt(J1.posX-.11, J1.padY("Tx")),
            J1.pad("Tx")], w);

board.wire([S1.pad("R2"),
            pt(J2.padX("GND"), S1.padY("R1")),
            J2.pad("GND")], w);

board.wire([S1.pad("L2"),
            pt(S1.padX("L2"), IC1.padY("PA1")),
            IC1.pad("PA1")], w);


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
