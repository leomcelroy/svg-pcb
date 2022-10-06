const SAMD11C = {"A05":{"shape":"M 0.03,0.015L -0.03,0.015L -0.0305,0.015L -0.031,0.015L -0.0321,0.0149L -0.0331,0.0147L -0.0336,0.0146L -0.0347,0.0142L -0.0356,0.0139L -0.0361,0.0137L -0.0366,0.0135L -0.0371,0.0132L -0.0375,0.013L -0.038,0.0127L -0.0384,0.0125L -0.0392,0.0118L -0.0396,0.0115L -0.0401,0.0112L -0.0412,0.0101L -0.0415,0.0096L -0.0418,0.0092L -0.0425,0.0084L -0.0427,0.008L -0.043,0.0075L -0.0432,0.0071L -0.0435,0.0066L -0.0437,0.0061L -0.0439,0.0056L -0.0442,0.0047L -0.0446,0.0036L -0.0447,0.0031L -0.0449,0.0021L -0.045,0.001L -0.045,-0.001L -0.0449,-0.0021L -0.0447,-0.0031L -0.0446,-0.0036L -0.0442,-0.0047L -0.0439,-0.0056L -0.0437,-0.0061L -0.0435,-0.0066L -0.0432,-0.0071L -0.043,-0.0075L -0.0427,-0.008L -0.0425,-0.0084L -0.0418,-0.0092L -0.0415,-0.0096L -0.0412,-0.0101L -0.0401,-0.0112L -0.0396,-0.0115L -0.0392,-0.0118L -0.0384,-0.0125L -0.038,-0.0127L -0.0375,-0.013L -0.0371,-0.0132L -0.0366,-0.0135L -0.0361,-0.0137L -0.0356,-0.0139L -0.0347,-0.0142L -0.0336,-0.0146L -0.0331,-0.0147L -0.0321,-0.0149L -0.031,-0.015L 0.03,-0.015L 0.03,0.015","pos":[-0.11,0.15],"layers":["F.Cu"],"index":1},"A08":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.1],"layers":["F.Cu"],"index":2},"A09":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0.05],"layers":["F.Cu"],"index":3},"A14":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,0],"layers":["F.Cu"],"index":4},"A15":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.05],"layers":["F.Cu"],"index":5},"RST":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.1],"layers":["F.Cu"],"index":6},"CLK":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[-0.11,-0.15],"layers":["F.Cu"],"index":7},"DIO":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.15],"layers":["F.Cu"],"index":8},"24-":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.1],"layers":["F.Cu"],"index":9},"25+":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,-0.05],"layers":["F.Cu"],"index":10},"GND":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0],"layers":["F.Cu"],"index":11},"VDD":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.05],"layers":["F.Cu"],"index":12},"A02":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.1],"layers":["F.Cu"],"index":13},"A04":{"shape":"M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015","pos":[0.11,0.15],"layers":["F.Cu"],"index":14}};
const header_SWD_4_05 = {"CLK":{"shape":"M 0.043,0.015L -0.043,0.015L -0.043,0.015L -0.0435,0.015L -0.044,0.015L -0.0445,0.015L -0.045,0.015L -0.0461,0.0149L -0.0476,0.0146L -0.0481,0.0144L -0.0486,0.0142L -0.0491,0.0141L -0.0496,0.0139L -0.0506,0.0135L -0.0515,0.013L -0.0519,0.0127L -0.0524,0.0125L -0.0532,0.0118L -0.0537,0.0115L -0.054,0.0112L -0.0551,0.0101L -0.0555,0.0096L -0.0564,0.0084L -0.0567,0.008L -0.057,0.0075L -0.0572,0.0071L -0.0575,0.0066L -0.0577,0.0061L -0.0579,0.0056L -0.0581,0.0051L -0.0583,0.0047L -0.0584,0.0041L -0.0585,0.0036L -0.0587,0.0031L -0.0588,0.0026L -0.059,0.0005L -0.059,-0.0005L -0.0588,-0.0026L -0.0587,-0.0031L -0.0585,-0.0036L -0.0584,-0.0041L -0.0583,-0.0047L -0.0581,-0.0051L -0.0579,-0.0056L -0.0577,-0.0061L -0.0575,-0.0066L -0.0572,-0.0071L -0.057,-0.0075L -0.0567,-0.008L -0.0564,-0.0084L -0.0555,-0.0096L -0.0551,-0.0101L -0.054,-0.0112L -0.0537,-0.0115L -0.0532,-0.0118L -0.0524,-0.0125L -0.0519,-0.0127L -0.0515,-0.013L -0.0506,-0.0135L -0.0496,-0.0139L -0.0491,-0.0141L -0.0486,-0.0142L -0.0481,-0.0144L -0.0476,-0.0146L -0.0461,-0.0149L -0.045,-0.015L 0.043,-0.015L 0.043,0.015","pos":[-0.072,0.025],"layers":["F.Cu"],"index":1},"DIO":{"shape":"M -0.043,0.015L 0.043,0.015L 0.043,-0.015L -0.043,-0.015L -0.043,0.015","pos":[0.072,0.025],"layers":["F.Cu"],"index":2},"RST":{"shape":"M -0.043,0.015L 0.043,0.015L 0.043,-0.015L -0.043,-0.015L -0.043,0.015","pos":[-0.072,-0.025],"layers":["F.Cu"],"index":3},"GND":{"shape":"M -0.043,0.015L 0.043,0.015L 0.043,-0.015L -0.043,-0.015L -0.043,0.015","pos":[0.072,-0.025],"layers":["F.Cu"],"index":4}};
const USB_A_plug = {"5V":{"shape":"M -0.05,0.02L 0.242,0.02L 0.242,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,0.138],"layers":["F.Cu"],"index":1},"D-":{"shape":"M -0.05,0.02L 0.202,0.02L 0.202,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,0.039],"layers":["F.Cu"],"index":2},"D+":{"shape":"M -0.05,0.02L 0.202,0.02L 0.202,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,-0.039],"layers":["F.Cu"],"index":3},"GND":{"shape":"M -0.05,0.02L 0.242,0.02L 0.242,-0.02L -0.05,-0.02L -0.05,0.02","pos":[0,-0.138],"layers":["F.Cu"],"index":4}};
const regulator_SOT23 = {"out":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,0.0375],"layers":["F.Cu"],"index":1},"in":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,-0.0375],"layers":["F.Cu"],"index":2},"gnd":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[0.045,0],"layers":["F.Cu"],"index":3}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const Hall_SOT23 = {"Vcc":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,0.0375],"layers":["F.Cu"],"index":1},"out":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,-0.0375],"layers":["F.Cu"],"index":2},"gnd":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[0.045,0],"layers":["F.Cu"],"index":3}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = .82 // board width
const height = 1.01 // board height
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
let IC1 = board.add(SAMD11C, {translate: pt(x+.5, y+.41), name: 'IC1\nD11C'});
let J1 = board.add(header_SWD_4_05, {translate: pt(IC1.posX, IC1.padY("CLK")-.11), name: 'J1 SWD'});
let J2 = board.add(USB_A_plug, {translate: pt(IC1.posX, y+height-.29), rotate: 90, name: 'J2\nUSB'});
let IC2 = board.add(regulator_SOT23, {translate: pt(IC1.padX("A05")-.18, IC1.padY("A08")), rotate: -90, name: 'IC2\n3.3'});
let C1 = board.add(C_1206, {translate: pt(IC2.posX-.04, IC2.posY-.15), name: 'C1 1uF'});
let IC3 = board.add(Hall_SOT23, {translate: pt(IC2.posX-.13, IC2.posY), rotate: -90, name: 'IC3\n1324'});
let R1 = board.add(R_1206, {translate: pt(C1.posX, C1.posY-.1), name: 'R1 4.99k'});
let R2 = board.add(R_1206, {translate: pt(R1.posX, R1.posY-.1), name: 'R2 10k'});

geo.difference(interior, geo.rotate(geo.translate(geo.rectangle(1.05, 9.76), [0.475+J2.posX, 5.12+J2.posY]), 90.00000001, J2.pos));
geo.difference(interior, geo.rotate(geo.translate(geo.rectangle(1.05, 9.76), [0.475+J2.posX, -5.12+J2.posY]), 90.00000001, J2.pos));

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire([J1.pad("CLK"),
            pt(IC1.padX("CLK"), J1.padY("CLK")),
            IC1.pad("CLK")], w);

board.wire([J1.pad("DIO"),
            pt(IC1.padX("DIO"), J1.padY("DIO")),
            IC1.pad("DIO")], w);

board.wire([J1.pad("RST"),
            pt(IC1.padX("RST")-.06, J1.padY("RST")),
            pt(IC1.padX("RST")-.06, IC1.padY("RST")),
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

board.wire([IC2.pad("out"),
            pt(IC1.padX("RST")-.09, IC2.padY("out")),
            pt(IC1.padX("RST")-.09, J1.padY("RST")-.05),
            pt(IC1.padX("VDD")+.06, J1.padY("RST")-.05),
            pt(IC1.padX("VDD")+.06, IC1.padY("VDD")),
            IC1.pad("VDD")], w);

board.wire([IC2.pad("in"),
            pt(IC2.padX("in"), J2.padY("5V")-.08),
            pt(J2.padX("5V"), J2.padY("5V")-.08),
            J2.pad("5V")], w);

board.wire([IC2.pad("gnd"),
            pt(IC2.padX("gnd"), J2.padY("GND")-.11),
            pt(IC1.posX-.045, J2.padY("GND")-.11),
            pt(IC1.posX-.045, IC1.padY("CLK")),
            pt(J1.posX, IC1.padY("CLK")-.045),
            pt(J1.posX, J1.padY("GND")),
            J1.pad("GND")], w);

board.wire([IC2.pad("gnd"),
            pt(C1.posX, IC2.padY("gnd")),
            pt(C1.posX, C1.posY),
            C1.pad("1")], w);

board.wire([IC2.pad("out"),
            pt(IC1.padX("RST")-.09, IC2.padY("out")),
            pt(IC1.padX("RST")-.09, C1.posY),
            C1.pad("2")], w);

board.wire([IC2.pad("gnd"),
            pt(C1.posX, IC2.padY("gnd")),
            pt(C1.posX, J1.padY("RST")-.11),
            pt(IC1.padX("A04")+.12, J1.padY("RST")-.11),
            pt(IC1.padX("A04")+.12, J2.padY("5V")-.11),
            pt(J2.padX("GND"), J2.padY("5V")-.11),
            J2.pad("GND")], w);

board.wire([IC3.pad("Vcc"),
            IC2.pad("in")], w);

board.wire([IC3.pad("gnd"),
            IC2.pad("gnd")], w);

board.wire([R1.pad("1"),
            pt(IC3.padX("out"), R1.posY),
            IC3.pad("out")], w);

board.wire([R2.pad("1"),
            pt(R2.posX, R2.posY)], w);

board.wire([R1.pad("2"),
            R2.pad("2")], w);

board.wire([R2.pad("2"),
            pt(R2.padX("2"), J1.padY("RST")-.08),
            pt(IC1.padX("A02")+.09, J1.padY("RST")-.08),
            pt(IC1.padX("A02")+.09, IC1.padY("A02")),
            IC1.pad("A02")], w);


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
