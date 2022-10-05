const ATtiny45_SOIC = {"RST":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[-0.14,0.075],"layers":["F.Cu"],"index":1},"PB3":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[-0.14,0.025],"layers":["F.Cu"],"index":2},"PB4":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[-0.14,-0.025],"layers":["F.Cu"],"index":3},"GND":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[-0.14,-0.075],"layers":["F.Cu"],"index":4},"PB0":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[0.14,-0.075],"layers":["F.Cu"],"index":5},"PB1":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[0.14,-0.025],"layers":["F.Cu"],"index":6},"PB2":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[0.14,0.025],"layers":["F.Cu"],"index":7},"VCC":{"shape":"M -0.041,0.015L 0.041,0.015L 0.041,-0.015L -0.041,-0.015L -0.041,0.015","pos":[0.14,0.075],"layers":["F.Cu"],"index":8}};
const header_ISP = {"MISO":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0.107,-0.1],"layers":["F.Cu"],"index":1},"V":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[-0.107,-0.1],"layers":["F.Cu"],"index":2},"SCK":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0.107,0],"layers":["F.Cu"],"index":3},"MOSI":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[-0.107,0],"layers":["F.Cu"],"index":4},"RST":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0.107,0.1],"layers":["F.Cu"],"index":5},"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[-0.107,0.1],"layers":["F.Cu"],"index":6}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const header_FTDI = {"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.25],"layers":["F.Cu"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu"],"index":6}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = 1.2 // board width
const height = .65 // board height
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
let IC1 = board.add(ATtiny45_SOIC, {translate: pt(x+.53, y+.3), rotate: -90, name: 'IC1\nt45'});
let J1 = board.add(header_ISP, {translate: pt(IC1.posX-.31, IC1.posY-.02), rotate: 0, name: 'J1\nISP'});
let R1 = board.add(R_1206, {translate: pt(IC1.padX("RST")+.09, IC1.posY), rotate: 90, name: 'R1\n10k'});
let C1 = board.add(C_1206, {translate: pt(R1.posX+.1, R1.posY), rotate: 90, name: 'C1\n1uF'});
let R2 = board.add(R_1206, {translate: pt((R1.posX+C1.posX)/2, R1.padY("1")-.1), name: 'R2 1k'});
let J2 = board.add(header_FTDI, {translate: pt(x+width-.23, C1.posY+.05), name: 'J2 FTDI\n5V'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([J1.pad("MISO"),
            pt(J1.padX("MISO"), J1.padY("MISO")+.05),
            pt(IC1.padX("PB1"), J1.padY("MISO")+.05),
            IC1.pad("PB1")], w);

board.wire([J1.pad("V"),
            pt(J1.padX("MOSI")-.08, J1.padY("V")),
            pt(J1.padX("MOSI")-.08, J1.padY("MOSI")+.05),
            pt(IC1.padX("VCC"), J1.padY("MOSI")+.05),
            IC1.pad("VCC")], w);

board.wire([J1.pad("SCK"),
            pt(IC1.padX("PB2"), J1.padY("SCK")),
            IC1.pad("PB2")], w);

board.wire([IC1.pad("PB0"),
            pt(IC1.padX("PB0"), IC1.padY("PB0")-.035),
            pt(J1.posX, IC1.padY("PB0")-.035),
            pt(J1.posX, J1.posY),
            J1.pad("MOSI")], w);

board.wire([IC1.pad("RST"),
            pt(IC1.padX("RST"), IC1.padY("RST")-.07),
            pt(J1.padX("RST"), IC1.padY("RST")-.07),
            J1.pad("RST")], w);

board.wire([IC1.pad("GND"),
            pt(J1.padX("GND"), IC1.padY("GND")),
            J1.pad("GND")], w);

board.wire([R1.pad("1"),
            pt(IC1.padX("VCC"), R1.padY("1")),
            IC1.pad("VCC")], w);

board.wire([R1.pad("2"),
            pt(R1.posX, IC1.padY("RST")),
            IC1.pad("RST")], w);

board.wire([C1.pad("1"),
            R1.pad("1")], w);

board.wire([R2.pad("1"),
            pt(R2.padX("1"), IC1.padY("PB2")-.08),
            pt(IC1.padX("PB2"), IC1.padY("PB2")-.08),
            IC1.pad("PB2")], w);

board.wire([J2.pad("GND"),
            pt(C1.posX, J2.padY("GND")),
            C1.pad("2")], w);

board.wire([J2.pad("GND"),
            pt(J1.padX("GND"), J2.padY("GND")),
            J1.pad("GND")], w);

board.wire([J2.pad("VCC"),
            pt(C1.posX+.07, J2.padY("VCC")),
            pt(C1.posX+.07, C1.padY("1")),
            C1.pad("1")], w);

board.wire([J2.pad("Tx"),
            pt(C1.posX+.1, J2.padY("Tx")),
            pt(C1.posX+.1, R2.posY),
            R2.pad("2")], w);

board.wire([J2.pad("Rx"),
            pt(J2.padX("Rx")+.1, J2.padY("Rx")),
            pt(J2.padX("Rx")+.1, IC1.padY("PB1")-.12),
            pt(IC1.padX("PB1"), IC1.padY("PB1")-.12),
            IC1.pad("PB1")], w);


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
