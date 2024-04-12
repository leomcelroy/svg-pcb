const header_FTDI = footprint({"GND":{"shape":"M 0.05,0.025L -0.05,0.025L -0.0509,0.025L -0.0517,0.025L -0.0535,0.0248L -0.0552,0.0244L -0.056,0.0243L -0.0578,0.0237L -0.0593,0.0232L -0.0602,0.0229L -0.061,0.0225L -0.0618,0.0221L -0.0625,0.0216L -0.0633,0.0212L -0.064,0.0208L -0.0654,0.0197L -0.0661,0.0191L -0.0668,0.0186L -0.0686,0.0168L -0.0691,0.0161L -0.0697,0.0154L -0.0708,0.014L -0.0712,0.0133L -0.0716,0.0125L -0.0721,0.0118L -0.0725,0.011L -0.0729,0.0102L -0.0732,0.0093L -0.0737,0.0078L -0.0743,0.006L -0.0744,0.0052L -0.0748,0.0035L -0.075,0.0017L -0.075,0.0009L -0.075,0L -0.075,-0.0009L -0.075,-0.0017L -0.0748,-0.0035L -0.0744,-0.0052L -0.0743,-0.006L -0.0737,-0.0078L -0.0732,-0.0093L -0.0729,-0.0102L -0.0725,-0.011L -0.0721,-0.0118L -0.0716,-0.0125L -0.0712,-0.0133L -0.0708,-0.014L -0.0697,-0.0154L -0.0691,-0.0161L -0.0686,-0.0168L -0.0668,-0.0186L -0.0661,-0.0191L -0.0654,-0.0197L -0.064,-0.0208L -0.0633,-0.0212L -0.0625,-0.0216L -0.0618,-0.0221L -0.061,-0.0225L -0.0602,-0.0229L -0.0593,-0.0232L -0.0578,-0.0237L -0.056,-0.0243L -0.0552,-0.0244L -0.0535,-0.0248L -0.0517,-0.025L 0.05,-0.025L 0.05,0.025","pos":[0,0.25],"layers":["F.Cu","F.Mask"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu","F.Mask"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu","F.Mask"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu","F.Mask"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu","F.Mask"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu","F.Mask"],"index":6}});
const regulator_SOT23 = footprint({"out":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,0.0375],"layers":["F.Cu","F.Mask"],"index":1},"in":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[-0.045,-0.0375],"layers":["F.Cu","F.Mask"],"index":2},"gnd":{"shape":"M -0.02,0.012L 0.02,0.012L 0.02,-0.012L -0.02,-0.012L -0.02,0.012","pos":[0.045,0],"layers":["F.Cu","F.Mask"],"index":3}});
const C_1206 = footprint({"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu","F.Mask"],"index":2}});
const RN4871 = footprint({"BT_RF":{"shape":"M -0.0197,0.0138L 0.0394,0.0138L 0.0394,-0.0138L -0.0197,-0.0138L -0.0197,0.0138","pos":[-0.1772,-0.0315],"layers":["F.Cu","F.Mask"],"index":1},"GND1":{"shape":"M -0.0197,0.0138L 0.0394,0.0138L 0.0394,-0.0138L -0.0197,-0.0138L -0.0197,0.0138","pos":[-0.1772,-0.0787],"layers":["F.Cu","F.Mask"],"index":2},"GND2":{"shape":"M -0.0394,0.0138L 0.0197,0.0138L 0.0197,-0.0138L -0.0394,-0.0138L -0.0394,0.0138","pos":[0.1772,-0.1732],"layers":["F.Cu","F.Mask"],"index":13},"P1_2":{"shape":"M -0.0197,0.0138L 0.0394,0.0138L 0.0394,-0.0138L -0.0197,-0.0138L -0.0197,0.0138","pos":[-0.1772,-0.126],"layers":["F.Cu","F.Mask"],"index":3},"P1_3":{"shape":"M -0.0197,0.0138L 0.0394,0.0138L 0.0394,-0.0138L -0.0197,-0.0138L -0.0197,0.0138","pos":[-0.1772,-0.1732],"layers":["F.Cu","F.Mask"],"index":4},"P1_7":{"shape":"M -0.0197,0.0138L 0.0394,0.0138L 0.0394,-0.0138L -0.0197,-0.0138L -0.0197,0.0138","pos":[-0.1772,-0.2205],"layers":["F.Cu","F.Mask"],"index":5},"P1_6":{"shape":"M -0.0138,0.0394L 0.0138,0.0394L 0.0138,-0.0197L -0.0138,-0.0197L -0.0138,0.0394","pos":[-0.1181,-0.2953],"layers":["F.Cu","F.Mask"],"index":6},"RX":{"shape":"M -0.0138,0.0394L 0.0138,0.0394L 0.0138,-0.0197L -0.0138,-0.0197L -0.0138,0.0394","pos":[-0.0709,-0.2953],"layers":["F.Cu","F.Mask"],"index":7},"TX":{"shape":"M -0.0138,0.0394L 0.0138,0.0394L 0.0138,-0.0197L -0.0138,-0.0197L -0.0138,0.0394","pos":[-0.0236,-0.2953],"layers":["F.Cu","F.Mask"],"index":8},"P3_6":{"shape":"M -0.0138,0.0394L 0.0138,0.0394L 0.0138,-0.0197L -0.0138,-0.0197L -0.0138,0.0394","pos":[0.0236,-0.2953],"layers":["F.Cu","F.Mask"],"index":9},"RST_N":{"shape":"M -0.0138,0.0394L 0.0138,0.0394L 0.0138,-0.0197L -0.0138,-0.0197L -0.0138,0.0394","pos":[0.0709,-0.2953],"layers":["F.Cu","F.Mask"],"index":10},"P0_0":{"shape":"M -0.0138,0.0394L 0.0138,0.0394L 0.0138,-0.0197L -0.0138,-0.0197L -0.0138,0.0394","pos":[0.1181,-0.2953],"layers":["F.Cu","F.Mask"],"index":11},"P0_2":{"shape":"M -0.0394,0.0138L 0.0197,0.0138L 0.0197,-0.0138L -0.0394,-0.0138L -0.0394,0.0138","pos":[0.1772,-0.2205],"layers":["F.Cu","F.Mask"],"index":12},"VBAT":{"shape":"M -0.0394,0.0138L 0.0197,0.0138L 0.0197,-0.0138L -0.0394,-0.0138L -0.0394,0.0138","pos":[0.1772,-0.126],"layers":["F.Cu","F.Mask"],"index":14},"P2_7":{"shape":"M -0.0394,0.0138L 0.0197,0.0138L 0.0197,-0.0138L -0.0394,-0.0138L -0.0394,0.0138","pos":[0.1772,-0.0787],"layers":["F.Cu","F.Mask"],"index":15},"P2_0":{"shape":"M -0.0394,0.0138L 0.0197,0.0138L 0.0197,-0.0138L -0.0394,-0.0138L -0.0394,0.0138","pos":[0.1772,-0.0315],"layers":["F.Cu","F.Mask"],"index":16}});
const R_1206 = footprint({"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu","F.Mask"],"index":2}});


// @version: v0.2.0
// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = 1.15 // board width
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



/* -- ADD_COMPONENTS -- */
let J1 = board.add(header_FTDI, {translate: pt(x+width-.22, y+height/2+.01), rotate: 0, id: 'J1 FTDI\n3.3V'});
let IC1 = board.add(regulator_SOT23, {translate: pt(J1.posX-.18, J1.padY("CTS")), rotate: 90, id: 'IC1\n3.3V'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX-.14, IC1.posY), rotate: 90, id: 'C1\n1uF'});
let RN = board.add(RN4871, {translate: pt(x, J1.posY), rotate: 90, id: '        RN4871'});
let R1 = board.add(R_1206, {translate: pt(C1.posX-.15, C1.padY("1")), id: 'R1\n10k'});

let outline = geo.path(path([x, y+height],
                             [x+width, y+height],
                             [x+width, y],
                             [x, y]));

board.addShape("outline", outline);


/* -- ADD_WIRES -- */
board.wire(path(J1.pad("GND"),
                [IC1.padX("gnd"), J1.padY("GND")],
                IC1.pad("gnd"),), w);

board.wire(path(J1.pad("VCC"),
                [IC1.padX("in"), J1.padY("VCC")],
                IC1.pad("in"),), w);

board.wire(path(C1.pad("1"),
                [IC1.padX("out"), C1.padY("1")],
                IC1.pad("out"),), w);

board.wire(path(C1.pad("2"),
                [IC1.padX("gnd"), C1.padY("2")],
                IC1.pad("gnd"),), w);

board.wire(path(RN.pad("GND1"),
                [RN.padX("GND1"), J1.padY("RTS")-.05],
                [J1.padX("GND")+.15, J1.padY("RTS")-.05],
                [J1.padX("GND")+.15, J1.padY("GND")],
                J1.pad("GND"),), w);

board.wire(path(RN.pad("RST_N"),
                [R1.padX("1"), RN.padY("RST_N")],
                R1.pad("1"),), w);

board.wire(path(C1.pad("1"),
                R1.pad("2"),), w);

board.wire(path(RN.pad("RX"),
                [R1.padX("1"), RN.padY("RX")],
                [R1.padX("1"), J1.padY("Rx")-.05],
                [J1.padX("Tx")+.1, J1.padY("Rx")-.05],
                [J1.padX("Tx")+.1, J1.padY("Tx")],
                J1.pad("Tx"),), w);

board.wire(path(RN.pad("TX"),
                [R1.padX("2"), RN.padY("TX")],
                [R1.padX("2"), J1.padY("Rx")],
                J1.pad("Rx"),), w);

board.wire(path([J1.padX("VCC")+.15, J1.padY("VCC")-.05],
                [C1.posX, J1.padY("VCC")-.05],
                [C1.posX, RN.padY("P3_6")],
                [R1.posX, RN.padY("P3_6")],
                [R1.posX, J1.padY("GND")-.02],
                [RN.padX("GND2"), J1.padY("GND")-.02],
                RN.pad("GND2"),), w);

board.wire(path(R1.pad("2"),
                [R1.padX("2"), J1.padY("GND")+.02],
                [RN.padX("VBAT"), J1.padY("GND")+.02],
                RN.pad("VBAT"),), w);


// rendering
renderPCB({
  pcb: board,
  layerColors: {
    "outline": "#002d00ff",
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
  mmPerUnit: 25.4
})
