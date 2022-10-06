const SAMD11C = {"A05":{"shape":"M 0.03,0.015L -0.03,0.015L -0.0305,0.015L -0.031,0.015L -0.0321,0.0149L -0.0331,0.0147L -0.0336,0.0146L -0.0347,0.0142L -0.0356,0.0139L -0.0361,0.0137L -0.0366,0.0135L -0.0371,0.0132L -0.0375,0.013L -0.038,0.0127L -0.0384,0.0125L -0.0392,0.0118L -0.0396,0.0115L -0.0401,0.0112L -0.0412,0.0101L -0.0415,0.0096L -0.0418,0.0092L -0.0425,0.0084L -0.0427,0.008L -0.043,0.0075L -0.0432,0.0071L -0.0435,0.0066L -0.0437,0.0061L -0.0439,0.0056L -0.0442,0.0047L -0.0446,0.0036L -0.0447,0.0031L -0.0449,0.0021L -0.045,0.001L -0.045,-0.001L -0.0449,-0.0021L -0.0447,-0.0031L -0.0446,-0.0036L -0.0442,-0.0047L -0.0439,-0.0056L -0.0437,-0.0061L -0.0435,-0.0066L -0.0432,-0.0071L -0.043,-0.0075L -0.0427,-0.008L -0.0425,-0.0084L -0.0418,-0.0092L -0.0415,-0.0096L -0.0412,-0.0101L -0.0401,-0.0112L -0.0396,-0.0115L -0.0392,-0.0118L -0.0384,-0.0125L -0.038,-0.0127L -0.0375,-0.013L -0.0371,-0.0132L -0.0366,-0.0135L -0.0361,-0.0137L -0.0356,-0.0139L -0.0347,-0.0142L -0.0336,-0.0146L -0.0331,-0.0147L -0.0321,-0.0149L -0.031,-0.015L 0.03,-0.015L 0.03,0.015","pos":[-0.11,0.15],"layers":["F.Cu"],"index":1},"A08":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.1],"layers":["F.Cu"],"index":2},"A09":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.05],"layers":["F.Cu"],"index":3},"A14":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0],"layers":["F.Cu"],"index":4},"A15":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.05],"layers":["F.Cu"],"index":5},"RST":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.1],"layers":["F.Cu"],"index":6},"CLK":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.15],"layers":["F.Cu"],"index":7},"DIO":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.15],"layers":["F.Cu"],"index":8},"24-":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.1],"layers":["F.Cu"],"index":9},"25+":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.05],"layers":["F.Cu"],"index":10},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0],"layers":["F.Cu"],"index":11},"VDD":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.05],"layers":["F.Cu"],"index":12},"A02":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.1],"layers":["F.Cu"],"index":13},"A04":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.15],"layers":["F.Cu"],"index":14}};
const header_SWD = {"VCC":{"shape":"M -0.047,-0.015L 0.0481,-0.015L 0.0491,-0.0149L 0.0496,-0.0148L 0.0506,-0.0146L 0.0512,-0.0144L 0.0516,-0.0142L 0.0521,-0.0141L 0.0526,-0.0139L 0.0536,-0.0135L 0.055,-0.0127L 0.0554,-0.0125L 0.0562,-0.0118L 0.0566,-0.0115L 0.057,-0.0112L 0.0574,-0.0108L 0.0582,-0.0101L 0.0597,-0.008L 0.06,-0.0075L 0.0603,-0.0071L 0.0607,-0.0061L 0.0609,-0.0056L 0.0611,-0.0051L 0.0613,-0.0047L 0.0616,-0.0036L 0.0617,-0.0031L 0.0618,-0.0026L 0.0618,-0.0021L 0.0619,-0.0016L 0.062,-0.001L 0.062,0.001L 0.0619,0.0016L 0.0618,0.0021L 0.0618,0.0026L 0.0617,0.0031L 0.0616,0.0036L 0.0613,0.0047L 0.0611,0.0051L 0.0609,0.0056L 0.0607,0.0061L 0.0603,0.0071L 0.06,0.0075L 0.0597,0.008L 0.0582,0.0101L 0.0574,0.0108L 0.057,0.0112L 0.0566,0.0115L 0.0562,0.0118L 0.0554,0.0125L 0.055,0.0127L 0.0536,0.0135L 0.0526,0.0139L 0.0521,0.0141L 0.0516,0.0142L 0.0512,0.0144L 0.0506,0.0146L 0.0496,0.0148L 0.0491,0.0149L 0.0481,0.015L 0.0475,0.015L 0.047,0.015L -0.047,0.015L -0.047,-0.015","pos":[0.077,-0.1],"layers":["F.Cu"],"index":1},"DIO":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,-0.1],"layers":["F.Cu"],"index":2},"GND1":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,-0.05],"layers":["F.Cu"],"index":3},"GND2":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0],"layers":["F.Cu"],"index":5},"GND3":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0.1],"layers":["F.Cu"],"index":9},"CLK":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,-0.05],"layers":["F.Cu"],"index":4},"SWO":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0],"layers":["F.Cu"],"index":6},"KEY":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[0.077,0.05],"layers":["F.Cu"],"index":7},"NC":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0.05],"layers":["F.Cu"],"index":8},"RST":{"shape":"M -0.047,0.015L 0.047,0.015L 0.047,-0.015L -0.047,-0.015L -0.047,0.015","pos":[-0.077,0.1],"layers":["F.Cu"],"index":10}};
const USB_A_plug = {"5V":{"shape":"M -0.05,0.02L 0.242,0.02L 0.242,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,0.138],"layers":["F.Cu"],"index":1},"D-":{"shape":"M -0.05,0.02L 0.202,0.02L 0.202,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,0.039],"layers":["F.Cu"],"index":2},"D+":{"shape":"M -0.05,0.02L 0.202,0.02L 0.202,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,-0.039],"layers":["F.Cu"],"index":3},"GND":{"shape":"M -0.05,0.02L 0.242,0.02L 0.242,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,-0.138],"layers":["F.Cu"],"index":4}};
const regulator_SOT23 = {"out":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,0.0375],"layers":["F.Cu"],"index":1},"in":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,-0.0375],"layers":["F.Cu"],"index":2},"gnd":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[0.045,0],"layers":["F.Cu"],"index":3}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const LED_1206 = {"A":{"shape":"M -0.037,0.034L 0.027,0.034L 0.027,-0.034L -0.037,-0.034L -0.037,0.034","pos":[-0.055,0],"layers":["F.Cu"],"index":1},"C":{"shape":"M -0.027,0.034L 0.037,0.034L 0.037,-0.034L -0.027,-0.034L -0.027,0.034","pos":[0.055,0],"layers":["F.Cu"],"index":2}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .76 // board width
const height = 1.14 // board height
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
let IC1 = board.add(SAMD11C, {translate: pt(x+.47, y+.55), name: 'IC1\nD11'});
let J1 = board.add(header_SWD, {translate: pt(IC1.posX, IC1.padY("CLK")-.2), rotate: 90, name: 'J1 SWD'});
let J2 = board.add(USB_A_plug, {translate: pt(IC1.posX, y+height-.29), rotate: 90, name: 'J2\nUSB'});
let IC2 = board.add(regulator_SOT23, {translate: pt(IC1.padX("A05")-.27, IC1.padY("CLK")-.06), rotate: -90, name: 'IC2\n3.3V'});
let C1 = board.add(C_1206, {translate: pt(IC2.posX, IC2.posY-.2), rotate: 90, name: 'C1\n1uF'});
let R1 = board.add(R_1206, {translate: pt(J1.padX("VCC")+.07, J1.posY), rotate: 90, name: 'R1\n0'});
let R2 = board.add(R_1206, {translate: pt(IC1.padX("A08")-.1, IC1.padY("A08")-.03), rotate: 90, name: 'R2\n1k'});
let LED1 = board.add(LED_1206, {translate: pt(R2.posX-.1, R2.posY), rotate: 90, name: 'LED1'});

geo.difference(interior, geo.rotate(geo.translate(geo.rectangle(1.05, 9.76), [0.475+J2.posX, 5.12+J2.posY]), 90.00000001, J2.pos));
geo.difference(interior, geo.rotate(geo.translate(geo.rectangle(1.05, 9.76), [0.475+J2.posX, -5.12+J2.posY]), 90.00000001, J2.pos));

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([J1.pad("GND1"),
            J1.pad("GND2")], w);

board.wire([J1.pad("CLK"),
            pt(J1.padX("CLK"), J1.posY),
            pt(IC1.padX("CLK")-.05, J1.posY),
            pt(IC1.padX("CLK")-.05, IC1.padY("CLK")),
            IC1.pad("CLK")], w);

board.wire([J1.pad("GND2"),
            pt(J1.padX("GND2"), J1.padY("GND2")+.08),
            pt(J1.padX("GND3"), J1.padY("GND2")+.08),
            J1.pad("GND3")], w);

board.wire([J1.pad("RST"),
            pt(IC1.padX("RST")-.08, J1.padY("RST")),
            pt(IC1.padX("RST")-.08, IC1.padY("RST")),
            IC1.pad("RST")], w);

board.wire([J2.pad("D-"),
            pt(IC1.posX-.015, J2.padY("D-")-.08),
            pt(IC1.posX-.015, IC1.padY("24-")),
            IC1.pad("24-")], w);

board.wire([J2.pad("D+"),
            pt(IC1.posX+.015, J2.padY("D+")-.08),
            pt(IC1.posX+.015, IC1.padY("25+")),
            IC1.pad("25+")], w);

board.wire([J2.pad("GND"),
            pt(J2.padX("GND"), J2.padY("GND")-.11),
            pt(IC1.posX+.045, J2.padY("GND")-.11),
            pt(IC1.posX+.045, IC1.padY("GND")),
            IC1.pad("GND")], w);

board.wire([IC2.pad("in"),
            pt(IC2.padX("in"), J2.padY("5V")-.08),
            pt(J2.padX("5V"), J2.padY("5V")-.08),
            J2.pad("5V")], w);

board.wire([IC2.pad("gnd"),
            pt(IC2.posX, J2.padY("GND")-.11),
            pt(IC1.posX-.045, J2.padY("GND")-.11),
            pt(IC1.posX-.045, IC1.padY("CLK")),
            pt(J1.padX("GND2"), IC1.padY("CLK")),
            J1.pad("GND2")], w);

board.wire([C1.pad("1"),
            pt(C1.posX+.06, C1.padY("1")),
            pt(C1.posX+.06, IC2.padY("in")),
            IC2.pad("out")], w);

board.wire([C1.pad("2"),
            IC2.pad("gnd")], w);

board.wire([R1.pad("1"),
            pt(R1.posX, J1.padY("DIO")),
            J1.pad("DIO")], w);

board.wire([R1.pad("2"),
            pt(R1.posX, IC1.padY("DIO")),
            IC1.pad("DIO")], w);

board.wire([J1.pad("VCC"),
            pt(J1.padX("VCC"), J1.posY),
            pt(R1.posX+.06, J1.posY),
            pt(R1.posX+.06, IC1.padY("VDD")),
            IC1.pad("VDD")], w);

board.wire([C1.pad("2"),
            pt(C1.posX-.06, C1.padY("2")),
            pt(C1.posX-.06, J1.padY("DIO")-.1),
            pt(R1.posX+.09, J1.padY("DIO")-.1),
            pt(R1.posX+.09, J2.padY("GND")-.11),
            pt(J2.padX("GND"), J2.padY("GND")-.11),
            J2.pad("GND")], w);

board.wire([C1.pad("1"),
            pt(C1.posX+.06, C1.padY("1")),
            pt(C1.posX+.06, J1.padY("DIO")-.07),
            pt(R1.posX+.06, J1.padY("DIO")-.07),
            pt(R1.posX+.06, IC1.padY("VDD")),
            IC1.pad("VDD")], w);

board.wire([R2.pad("2"),
            pt(R2.posX, IC1.padY("A05")),
            IC1.pad("A05")], w);

board.wire([LED1.pad("A"),
            R2.pad("1")], w);

board.wire([LED1.pad("C"),
            pt(IC2.posX, LED1.padY("C")),
            IC2.pad("gnd")], w);


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
