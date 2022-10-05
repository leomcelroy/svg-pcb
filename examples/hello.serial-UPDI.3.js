const header_FTDI = {"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.25],"layers":["F.Cu"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu"],"index":6}};
const header_UPDI_3_reverse = {"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.1],"layers":["F.Cu"],"index":1},"GND":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0],"layers":["F.Cu"],"index":2},"UPDI":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.1],"layers":["F.Cu"],"index":3}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .66 // board width
const height = .61 // board height
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
let J1 = board.add(header_FTDI, {translate: pt(x+width-.23, y+height/2), name: 'J1\nserial'});
let J2 = board.add(header_UPDI_3_reverse, {translate: pt(x+.23, J1.padY("Rx")), name: 'J2\nUPDI'});
let R1 = board.add(R_1206, {translate: pt(J2.posX, J1.padY("CTS")-.03), rotate: 90, name: 'R1\n4.99k'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([J2.pad("VCC"),
            pt((J1.posX+J2.posX)/2, J2.padY("VCC")),
            pt((J1.posX+J2.posX)/2, J1.padY("VCC")),
            J1.pad("VCC")], w);

board.wire([J2.pad("GND"),
            pt(J2.posX-.12, J2.padY("GND")),
            pt(J2.posX-.12, J1.padY("GND")),
            J1.pad("GND")], w);

board.wire([R1.pad("1"),
            pt(R1.posX+.05, J1.padY("CTS")-.05),
            pt(J1.posX+.1, J1.padY("CTS")-.05),
            pt(J1.posX+.1, J1.padY("Tx")),
            J1.pad("Tx")], w);

board.wire([R1.pad("2"),
            pt(J2.posX-.09, R1.padY("2")),
            pt(J2.posX-.09, J2.padY("UPDI")),
            J2.pad("UPDI")], w);

board.wire([J1.pad("Rx"),
            pt(J1.posX+.13, J1.padY("Rx")),
            pt(J1.posX+.13, J1.padY("CTS")+.05),
            pt(R1.posX, J1.padY("CTS")+.05),
            R1.pad("2")], w);


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
