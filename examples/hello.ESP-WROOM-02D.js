const header_FTDI = {"GND":{"shape":"M 0.05,0.025L -0.05,0.025L -0.0509,0.025L -0.0517,0.025L -0.0535,0.0248L -0.0552,0.0244L -0.056,0.0243L -0.0578,0.0237L -0.0593,0.0232L -0.0602,0.0229L -0.061,0.0225L -0.0618,0.0221L -0.0625,0.0216L -0.0633,0.0212L -0.064,0.0208L -0.0654,0.0197L -0.0661,0.0191L -0.0668,0.0186L -0.0686,0.0168L -0.0691,0.0161L -0.0697,0.0154L -0.0708,0.014L -0.0712,0.0133L -0.0716,0.0125L -0.0721,0.0118L -0.0725,0.011L -0.0729,0.0102L -0.0732,0.0093L -0.0737,0.0078L -0.0743,0.006L -0.0744,0.0052L -0.0748,0.0035L -0.075,0.0017L -0.075,0.0009L -0.075,0L -0.075,-0.0009L -0.075,-0.0017L -0.0748,-0.0035L -0.0744,-0.0052L -0.0743,-0.006L -0.0737,-0.0078L -0.0732,-0.0093L -0.0729,-0.0102L -0.0725,-0.011L -0.0721,-0.0118L -0.0716,-0.0125L -0.0712,-0.0133L -0.0708,-0.014L -0.0697,-0.0154L -0.0691,-0.0161L -0.0686,-0.0168L -0.0668,-0.0186L -0.0661,-0.0191L -0.0654,-0.0197L -0.064,-0.0208L -0.0633,-0.0212L -0.0625,-0.0216L -0.0618,-0.0221L -0.061,-0.0225L -0.0602,-0.0229L -0.0593,-0.0232L -0.0578,-0.0237L -0.056,-0.0243L -0.0552,-0.0244L -0.0535,-0.0248L -0.0517,-0.025L 0.05,-0.025L 0.05,0.025","pos":[0,0.25],"layers":["F.Cu"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu"],"index":6}};
const regulator_SOT223 = {"G":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[-0.09,-0.12],"layers":["F.Cu"],"index":1},"O":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[0,-0.12],"layers":["F.Cu"],"index":2},"I":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[0.09,-0.12],"layers":["F.Cu"],"index":3},"out":{"shape":"M -0.065,0.03L 0.065,0.03L 0.065,-0.03L -0.065,-0.03L -0.065,0.03","pos":[0,0.12],"layers":["F.Cu"],"index":4}};
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const ESP_WROOM_02D = {"3V3":{"shape":"M -0.0394,0.0148L -0.0394,0.0147L -0.0409,0.0136L -0.0414,0.0132L -0.0427,0.0119L -0.0431,0.0114L -0.0435,0.0109L -0.0439,0.0104L -0.0442,0.0099L -0.0446,0.0094L -0.0449,0.0088L -0.0452,0.0083L -0.0454,0.0078L -0.0457,0.0072L -0.046,0.0066L -0.0464,0.0055L -0.0467,0.0043L -0.0468,0.0037L -0.0471,0.0025L -0.0472,0.0012L -0.0472,-0.0012L -0.0471,-0.0025L -0.0468,-0.0037L -0.0467,-0.0043L -0.0464,-0.0055L -0.046,-0.0066L -0.0457,-0.0072L -0.0454,-0.0078L -0.0452,-0.0083L -0.0449,-0.0088L -0.0446,-0.0094L -0.0442,-0.0099L -0.0439,-0.0104L -0.0435,-0.0109L -0.0431,-0.0114L -0.0427,-0.0119L -0.0414,-0.0132L -0.0409,-0.0136L -0.0394,-0.0147L -0.0394,-0.0148L -0.0394,-0.0177L 0.0394,-0.0177L 0.0394,0.0177L -0.0394,0.0177L -0.0394,0.0148","pos":[-0.3445,0.2362],"layers":["F.Cu"],"index":1},"EN":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,0.1772],"layers":["F.Cu"],"index":2},"IO14":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,0.1181],"layers":["F.Cu"],"index":3},"IO12":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,0.0591],"layers":["F.Cu"],"index":4},"IO13":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,0],"layers":["F.Cu"],"index":5},"IO15":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,-0.0591],"layers":["F.Cu"],"index":6},"IO2":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,-0.1181],"layers":["F.Cu"],"index":7},"IO0":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,-0.1772],"layers":["F.Cu"],"index":8},"GND1":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[-0.3445,-0.2362],"layers":["F.Cu"],"index":9},"GND2":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,-0.0591],"layers":["F.Cu"],"index":13},"GND3":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,0.2362],"layers":["F.Cu"],"index":18},"GND4":{"shape":"M -0.0787,0.0787L 0.0787,0.0787L 0.0787,-0.0787L -0.0787,-0.0787L -0.0787,0.0787","pos":[0.0433,-0.024],"layers":["F.Cu"],"index":19},"IO4":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,-0.2362],"layers":["F.Cu"],"index":10},"RXD":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,-0.1772],"layers":["F.Cu"],"index":11},"TXD":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,-0.1181],"layers":["F.Cu"],"index":12},"IO5":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,0],"layers":["F.Cu"],"index":14},"RST":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,0.0591],"layers":["F.Cu"],"index":15},"TOUT":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,0.1181],"layers":["F.Cu"],"index":16},"IO16":{"shape":"M -0.0394,0.0177L 0.0394,0.0177L 0.0394,-0.0177L -0.0394,-0.0177L -0.0394,0.0177","pos":[0.3445,0.1772],"layers":["F.Cu"],"index":17}};
const slide_switch = {"1":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[-0.098,0.1],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[0,0.1],"layers":["F.Cu"],"index":2},"3":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[0.098,0.1],"layers":["F.Cu"],"index":3}};
const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}};
const button_6mm = {"L1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,0.08],"layers":["F.Cu"],"index":1},"R1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,-0.08],"layers":["F.Cu"],"index":2},"R2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,-0.08],"layers":["F.Cu"],"index":3},"L2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,0.08],"layers":["F.Cu"],"index":4}};


// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = 1.14 // board width
const height = 1.13 // board height
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
let J1 = board.add(header_FTDI, {translate: pt(x+width-.22, y+.39), rotate: 0, name: 'J1 serial\n5V power\n3.3V data'});
let IC1 = board.add(regulator_SOT223, {translate: pt(J1.posX-.2, J1.posY-.05), name: '\nIC1\n3.3V'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.posY-.25), name: 'C1\n10uF'});
let C2 = board.add(C_1206, {translate: pt(IC1.posX, IC1.posY+.25), name: 'C2\n1uF'});
let IC2 = board.add(ESP_WROOM_02D, {translate: pt(x+.28, J1.posY+.23), rotate: 90, name: "IC2\n \nESP-WROOM-02D"});
let S1 = board.add(slide_switch, {translate: pt(IC2.padX("GND1")-.06, y+.06), rotate: 0, name: 'prog run\nS1'});
let R1 = board.add(R_1206, {translate: pt(IC2.padX("IO12")-.05, IC2.padY("EN")-.15), name: 'R1 10k'});
let S2 = board.add(button_6mm, {translate: pt(IC2.padX("IO4")+.26, IC2.padY("IO4")-.05), rotate: 0, name: 'S2\nreset'});
let R2 = board.add(R_1206, {translate: pt(S2.posX+.25, S2.posY-.06), rotate: 90, name: 'R2\n10k'});

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire(path(IC1.pad("I"),
                pt(IC1.padX("I"), J1.padY("VCC")),
                J1.pad("VCC"),), w);

board.wire(path(IC1.pad("O"),
                IC1.pad("out"),), w);

board.wire(path(C1.pad("1"),
                pt(IC1.padX("G"), C1.padY("1")),
                IC1.pad("G"),), w);

board.wire(path(C1.pad("2"),
                pt(IC1.padX("I"), C1.padY("2")),
                IC1.pad("I"),), w);

board.wire(path(C2.pad("1"),
                pt(C2.padX("1"), J1.padY("GND")+.02),
                pt(J1.padX("GND"), J1.padY("GND")+.02),
                J1.pad("GND"),), w);

board.wire(path(C2.pad("2"),
                pt(C2.padX("2"), IC1.padY("out")),
                IC1.pad("out"),), w);

board.wire(path(IC2.pad("IO15"),
                pt(IC2.padX("IO15"), IC2.padY("GND4")),
                IC2.pad("GND4"),), w);

board.wire(path(IC2.pad("GND1"),
                pt(IC2.padX("GND1"), J1.padY("GND")+.02),
                pt(J1.padX("GND"), J1.padY("GND")+.02),
                J1.pad("GND"),), w);

board.wire(path(IC2.pad("GND1"),
                pt(IC2.padX("GND1"), IC2.padY("GND4")),
                IC2.pad("GND4"),), w);

board.wire(path(IC2.pad("RXD"),
                pt(IC2.padX("RXD"), IC2.padY("RXD")-.08),
                pt(IC2.padX("RXD"), J1.padY("GND")+.06),
                pt(J1.posX+.1, J1.padY("GND")+.06),
                pt(J1.posX+.1, J1.padY("Tx")),
                J1.pad("Tx"),), w);

board.wire(path(IC2.pad("TXD"),
                pt(IC2.padX("TXD"), IC2.padY("TXD")+.08),
                pt(IC2.padX("IO4")+.05, IC2.padY("TXD")+.08),
                pt(IC2.padX("IO4")+.05, J1.padY("GND")+.09),
                pt(J1.posX+.13, J1.padY("GND")+.09),
                pt(J1.posX+.13, J1.padY("Rx")),
                J1.pad("Rx"),), w);

board.wire(path(IC2.pad("GND2"),
                pt(IC2.padX("GND2"), IC2.padY("GND4")),
                IC2.pad("GND4"),), w);

board.wire(path(IC2.pad("GND3"),
                pt(IC2.padX("GND3"), IC2.padY("GND4")),
                IC2.pad("GND4"),), w);

board.wire(path(IC1.pad("G"),
                pt(IC2.padX("GND1"), IC1.padY("G")),
                pt(IC2.padX("GND1"), IC2.padY("GND4")),
                IC2.pad("GND4"),), w);

board.wire(path(S1.pad("1"),
                pt(S1.padX("1")+.04, S1.padY("1")+.04),
                pt(IC2.padX("IO0"), IC2.padY("IO0")-.05),
                IC2.pad("IO0"),), w);

board.wire(path(S1.pad("2"),
                pt(IC2.padX("GND1"), IC2.padY("GND1")-.05),
                IC2.pad("GND1"),), w);

board.wire(path(IC2.pad("3V3"),
                pt(IC2.padX("3V3"), S1.posY-.04),
                pt(IC1.padX("O"), S1.posY-.04),
                IC1.pad("O"),), w);

board.wire(path(R1.pad("1"),
                pt(IC2.padX("EN"), R1.posY),
                IC2.pad("EN"),), w);

board.wire(path(R1.pad("2"),
                pt(R1.padX("2"), S1.posY-.04),), w);

board.wire(path(S2.pad("R2"),
                pt(S2.posX, S2.padY("R2")),
                pt(S2.posX, IC2.padY("RST")+.11),
                pt(IC2.padX("RST"), IC2.padY("RST")+.11),
                IC2.pad("RST"),), w);

board.wire(path(S2.pad("L2"),
                pt(S2.padX("L2"), IC2.padY("RST")+.14),
                pt(IC2.padX("GND3"), IC2.padY("RST")+.14),
                IC2.pad("GND3"),), w);

board.wire(path(R2.pad("1"),
                pt(J1.posX+.16, R2.padY("1")),
                pt(J1.posX+.16, S1.posY-.04),
                pt(IC2.padX("3V3"), S1.posY-.04),
                IC2.pad("3V3"),), w);

board.wire(path(R2.pad("2"),
                pt(S2.padX("R2"), R2.padY("2")),
                S2.pad("R2"),), w);


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
