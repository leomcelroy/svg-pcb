const ATtiny1614 = {"VCC":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.15],"layers":["F.Cu"],"index":1},"PA4":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.1],"layers":["F.Cu"],"index":2},"PA5":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.05],"layers":["F.Cu"],"index":3},"PA6":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0],"layers":["F.Cu"],"index":4},"PA7":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.05],"layers":["F.Cu"],"index":5},"RB3":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.1],"layers":["F.Cu"],"index":6},"TB2":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.15],"layers":["F.Cu"],"index":7},"PB1":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.15],"layers":["F.Cu"],"index":8},"PB0":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.1],"layers":["F.Cu"],"index":9},"UPDI":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.05],"layers":["F.Cu"],"index":10},"PA1":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0],"layers":["F.Cu"],"index":11},"PA2":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.05],"layers":["F.Cu"],"index":12},"PA3":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.1],"layers":["F.Cu"],"index":13},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.15],"layers":["F.Cu"],"index":14}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const header_FTDI = {"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.25],"layers":["F.Cu"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu"],"index":6}};
const header_UPDI = {"UPDI":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":1},"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":2}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .68 // board width
const height = .82 // board height
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
let IC1 = board.add(ATtiny1614, {translate: pt(x+.21, y+.5), name: 'IC1\nt1614'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.padY("VCC")+.08), name: 'C1 1uF'});
let J1 = board.add(header_FTDI, {translate: pt(x+width-.23, IC1.posY-.05), name: 'J1\nFTDI'});
let J2 = board.add(header_UPDI, {translate: pt(IC1.posX, y+.23), rotate: 90, name: 'J2 UPDI'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([C1.pad("1"),
            pt(IC1.padX("VCC"), C1.posY),
            IC1.pad("VCC")], w);

board.wire([J1.pad("GND"),
            pt(IC1.padX("GND"), J1.padY("GND")),
            pt(IC1.padX("GND"), C1.posY),
            C1.pad("2")], w);

board.wire([J1.pad("GND"),
            pt(IC1.padX("GND"), J1.padY("GND")),
            IC1.pad("GND")], w);

board.wire([J1.pad("VCC"),
            pt(J1.posX+.1, J1.padY("VCC")),
            pt(J1.posX+.1, C1.posY+.06),
            pt(C1.padX("1"), C1.posY+.06),
            C1.pad("1")], w);

board.wire([J2.pad("UPDI"),
            pt(IC1.posX+.02, J2.padY("UPDI")+.08),
            pt(IC1.posX+.02, IC1.padY("UPDI")),
            IC1.pad("UPDI")], w);

board.wire([J2.pad("GND"),
            pt(IC1.posX-.02, J2.padY("GND")+.08),
            pt(IC1.posX-.02, IC1.padY("GND")),
            IC1.pad("GND")], w);

board.wire([IC1.pad("TB2"),
            pt(IC1.padX("TB2"), J2.posY-.1),
            pt(IC1.padX("GND"), J2.posY-.1),
            pt(IC1.padX("GND"), J1.padY("Rx")),
            J1.pad("Rx")], w);

board.wire([IC1.pad("RB3"),
            pt(IC1.padX("RB3")-.07, IC1.padY("RB3")),
            pt(IC1.padX("RB3")-.07, J2.posY-.13),
            pt(J1.posX+.1, J2.posY-.13),
            pt(J1.posX+.1, J1.padY("Tx")),
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
