const header_FTDI = footprint({"GND":{"shape":"M 0.05,0.025L -0.05,0.025L -0.0509,0.025L -0.0517,0.025L -0.0535,0.0248L -0.0552,0.0244L -0.056,0.0243L -0.0578,0.0237L -0.0593,0.0232L -0.0602,0.0229L -0.061,0.0225L -0.0618,0.0221L -0.0625,0.0216L -0.0633,0.0212L -0.064,0.0208L -0.0654,0.0197L -0.0661,0.0191L -0.0668,0.0186L -0.0686,0.0168L -0.0691,0.0161L -0.0697,0.0154L -0.0708,0.014L -0.0712,0.0133L -0.0716,0.0125L -0.0721,0.0118L -0.0725,0.011L -0.0729,0.0102L -0.0732,0.0093L -0.0737,0.0078L -0.0743,0.006L -0.0744,0.0052L -0.0748,0.0035L -0.075,0.0017L -0.075,0.0009L -0.075,0L -0.075,-0.0009L -0.075,-0.0017L -0.0748,-0.0035L -0.0744,-0.0052L -0.0743,-0.006L -0.0737,-0.0078L -0.0732,-0.0093L -0.0729,-0.0102L -0.0725,-0.011L -0.0721,-0.0118L -0.0716,-0.0125L -0.0712,-0.0133L -0.0708,-0.014L -0.0697,-0.0154L -0.0691,-0.0161L -0.0686,-0.0168L -0.0668,-0.0186L -0.0661,-0.0191L -0.0654,-0.0197L -0.064,-0.0208L -0.0633,-0.0212L -0.0625,-0.0216L -0.0618,-0.0221L -0.061,-0.0225L -0.0602,-0.0229L -0.0593,-0.0232L -0.0578,-0.0237L -0.056,-0.0243L -0.0552,-0.0244L -0.0535,-0.0248L -0.0517,-0.025L 0.05,-0.025L 0.05,0.025","pos":[0,0.25],"layers":["F.Cu","F.Mask"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu","F.Mask"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu","F.Mask"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu","F.Mask"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu","F.Mask"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu","F.Mask"],"index":6}});
const regulator_SOT223 = footprint({"G":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[-0.09,-0.12],"layers":["F.Cu","F.Mask"],"index":1},"O":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[0,-0.12],"layers":["F.Cu","F.Mask"],"index":2},"I":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[0.09,-0.12],"layers":["F.Cu","F.Mask"],"index":3},"out":{"shape":"M -0.065,0.03L 0.065,0.03L 0.065,-0.03L -0.065,-0.03L -0.065,0.03","pos":[0,0.12],"layers":["F.Cu","F.Mask"],"index":4}});
const C_1206 = footprint({"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu","F.Mask"],"index":2}});
const ESP_01 = footprint({"GND":{"shape":"M 0.0375,-0.0182L 0.0378,-0.0181L 0.039,-0.0176L 0.0403,-0.0169L 0.0408,-0.0165L 0.0414,-0.0162L 0.0431,-0.015L 0.044,-0.014L 0.0446,-0.0135L 0.045,-0.0131L 0.0454,-0.0125L 0.0467,-0.0109L 0.047,-0.0103L 0.0474,-0.0097L 0.0477,-0.0092L 0.048,-0.0086L 0.0483,-0.008L 0.0486,-0.0073L 0.0488,-0.0067L 0.049,-0.0061L 0.0493,-0.0054L 0.0494,-0.0047L 0.0496,-0.0041L 0.0497,-0.0034L 0.05,-0.0007L 0.05,0.0007L 0.0497,0.0034L 0.0496,0.0041L 0.0494,0.0047L 0.0493,0.0054L 0.049,0.0061L 0.0488,0.0067L 0.0486,0.0073L 0.0483,0.008L 0.048,0.0086L 0.0477,0.0092L 0.0474,0.0097L 0.047,0.0103L 0.0467,0.0109L 0.0454,0.0125L 0.045,0.0131L 0.0446,0.0135L 0.044,0.014L 0.0431,0.015L 0.0414,0.0162L 0.0408,0.0165L 0.0403,0.0169L 0.039,0.0176L 0.0378,0.0181L 0.0375,0.0182L 0.0375,0.02L -0.0375,0.02L -0.0375,-0.02L 0.0375,-0.02L 0.0375,-0.0182","pos":[0.1175,0.15],"layers":["F.Cu","F.Mask"],"index":1},"Tx":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[-0.1175,0.15],"layers":["F.Cu","F.Mask"],"index":2},"IO2":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[0.1175,0.05],"layers":["F.Cu","F.Mask"],"index":3},"EN":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[-0.1175,0.05],"layers":["F.Cu","F.Mask"],"index":4},"IO0":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[0.1175,-0.05],"layers":["F.Cu","F.Mask"],"index":5},"RST":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[-0.1175,-0.05],"layers":["F.Cu","F.Mask"],"index":6},"Rx":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[0.1175,-0.15],"layers":["F.Cu","F.Mask"],"index":7},"VCC":{"shape":"M -0.0375,0.02L 0.0375,0.02L 0.0375,-0.02L -0.0375,-0.02L -0.0375,0.02","pos":[-0.1175,-0.15],"layers":["F.Cu","F.Mask"],"index":8}});
const R_1206 = footprint({"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu","F.Mask"],"index":2}});
const button_6mm = footprint({"L1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,0.08],"layers":["F.Cu","F.Mask"],"index":1},"R1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,-0.08],"layers":["F.Cu","F.Mask"],"index":2},"R2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,-0.08],"layers":["F.Cu","F.Mask"],"index":3},"L2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,0.08],"layers":["F.Cu","F.Mask"],"index":4}});
const slide_switch = footprint({"1":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[-0.098,0.1],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[0,0.1],"layers":["F.Cu","F.Mask"],"index":2},"3":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[0.098,0.1],"layers":["F.Cu","F.Mask"],"index":3}});


// @version: v0.1.0
// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = 1.32 // board width
const height = .89 // board height
const x = 1 // x origin
const y = 1 // y origin
const zt = 0 // top z
const zb = -0.06 // bottom z
const w = .015 // wire width
const mask = .004 // solder mask size
const border = 0.05 // rendering border


/* -- DECLARE_PCB -- */
let board = new PCB();



/* -- ADD_COMPONENTS -- */
let J1 = board.add(header_FTDI, {translate: pt(x+width-.22, y+.48), rotate: 0, label: 'J1 serial\n5V power\n3.3V logic'});
let IC1 = board.add(regulator_SOT223, {translate: pt(J1.posX-.25, J1.posY), label: 'IC1\n3.3V'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.posY-.25), label: 'C1 10uF'});
let C2 = board.add(C_1206, {translate: pt(IC1.posX, IC1.posY+.25), label: 'C2 1uF'});
let J2 = board.add(ESP_01, {translate: pt(IC1.posX-.49, IC1.posY), rotate: 180, label: 'J2\nESP-01'});
let R1 = board.add(R_1206, {translate: pt(J2.padX("EN")+.11, J2.padY("IO0")), rotate: 90, label: 'R1\n10k'});
let S1 = board.add(button_6mm, {translate: pt(J2.padX("GND")+.12, J2.padY("GND")-.2), label: 'S1\nreset'});
let S2 = board.add(slide_switch, {translate: pt(S1.posX, J2.padY("VCC")+.21), rotate: 180, label: 'S2\nprog run'});
let R2 = board.add(R_1206, {translate: pt(J2.padX("IO0")-.11, J2.padY("IO0")), rotate: 90, label: 'R2\n10k'});

let interior = geo.path(path([1.000, 1.890],
                             [2.320, 1.890],
                             [2.320, 1.000],
                             [1.000, 1.000]));

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire(path(IC1.pad("G"),
                [IC1.padX("G")-.05, IC1.padY("G")],
                [IC1.padX("G")-.05, J1.padY("GND")+.07],
                [J1.padX("GND"), J1.padY("GND")+.07],
                J1.pad("GND"),), w);

board.wire(path(IC1.pad("I"),
                [IC1.padX("I"), J1.padY("VCC")],
                J1.pad("VCC"),), w);

board.wire(path(IC1.pad("O"),
                IC1.pad("out"),), w);

board.wire(path(C1.pad("1"),
                [IC1.padX("G"), C1.padY("1")],
                IC1.pad("G"),), w);

board.wire(path(C1.pad("2"),
                [IC1.padX("I"), C1.padY("2")],
                IC1.pad("I"),), w);

board.wire(path(C2.pad("1"),
                [IC1.padX("G")-.05, C2.padY("1")],), w);

board.wire(path(C2.pad("2"),
                [C2.padX("2"), IC1.padY("out")],
                IC1.pad("out"),), w);

board.wire(path(R1.pad("1"),
                [R1.posX, J2.padY("EN")],
                J2.pad("EN"),), w);

board.wire(path(R1.pad("2"),
                [R1.posX, J2.padY("VCC")],
                J2.pad("VCC"),), w);

board.wire(path(J2.pad("GND"),
                [J2.posX, J2.padY("GND")],
                [J2.posX, J2.padY("GND")+.05],
                [R1.posX+.04, J2.padY("GND")+.05],
                [R1.posX+.04, C1.posY-.1],
                [J1.posX-.11, C1.posY-.1],
                [J1.posX-.11, J1.padY("VCC")-.05],
                [J1.posX+.09, J1.padY("VCC")-.05],
                [J1.posX+.09, J1.padY("GND")],
                J1.pad("GND"),), w);

board.wire(path(J2.pad("Tx"),
                [R1.posX+.01, J2.padY("Tx")],
                [R1.posX+.01, C1.posY-.13],
                [J1.posX-.08, C1.posY-.13],
                [J1.posX-.08, J1.padY("Rx")],
                J1.pad("Rx"),), w);

board.wire(path(J2.pad("Rx"),
                [J2.posX+.04, J2.padY("Rx")],
                [J2.posX+.04, J2.padY("Rx")+.05],
                [R1.posX, J2.padY("Rx")+.05],
                [R1.posX, J1.padY("GND")+.1],
                [J1.posX+.12, J1.padY("GND")+.1],
                [J1.posX+.12, J1.padY("Tx")],
                J1.pad("Tx"),), w);

board.wire(path(J2.pad("VCC"),
                [R1.posX+.07, J2.padY("VCC")],
                [R1.posX+.07, C1.posY-.07],
                [C1.posX, C1.posY-.07],
                IC1.pad("O"),), w);

board.wire(path(S1.pad("R1"),
                [J2.posX, S1.padY("R1")],
                [J2.posX, J2.padY("GND")],
                J2.pad("GND"),), w);

board.wire(path(R2.pad("1"),
                [R2.posX, S1.padY("L1")],
                S1.pad("L1"),), w);

board.wire(path([R2.posX, J2.padY("RST")-.05],
                [J2.padX("RST"), J2.padY("RST")-.05],
                J2.pad("RST"),), w);

board.wire(path([R2.posX, J2.padY("VCC")-.05],
                [J2.padX("VCC"), J2.padY("VCC")-.05],
                J2.pad("VCC"),), w);

board.wire(path(J2.pad("IO0"),
                [R2.posX-.07, J2.padY("IO0")],
                [R2.posX-.07, J2.padY("Rx")+.05],
                [S2.padX("2"), J2.padY("Rx")+.05],
                S2.pad("2"),), w);

board.wire(path(S1.pad("R1"),
                [R2.posX-.1, S1.padY("R1")],
                [R2.posX-.1, S2.padY("3")],
                S2.pad("3"),), w);


// rendering
renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#be7a27cc",
    "B.Mask": "#ff814bff",
    "F.Mask": "#ffa50aff",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [x-border, x+width+border],
    y: [y-border, y+height+border]
  },
  mm_per_unit: 25.4
})
