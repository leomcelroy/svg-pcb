const header_FTDI = footprint({"GND":{"shape":"M 0.05,0.025L -0.05,0.025L -0.0509,0.025L -0.0517,0.025L -0.0535,0.0248L -0.0552,0.0244L -0.056,0.0243L -0.0578,0.0237L -0.0593,0.0232L -0.0602,0.0229L -0.061,0.0225L -0.0618,0.0221L -0.0625,0.0216L -0.0633,0.0212L -0.064,0.0208L -0.0654,0.0197L -0.0661,0.0191L -0.0668,0.0186L -0.0686,0.0168L -0.0691,0.0161L -0.0697,0.0154L -0.0708,0.014L -0.0712,0.0133L -0.0716,0.0125L -0.0721,0.0118L -0.0725,0.011L -0.0729,0.0102L -0.0732,0.0093L -0.0737,0.0078L -0.0743,0.006L -0.0744,0.0052L -0.0748,0.0035L -0.075,0.0017L -0.075,0.0009L -0.075,0L -0.075,-0.0009L -0.075,-0.0017L -0.0748,-0.0035L -0.0744,-0.0052L -0.0743,-0.006L -0.0737,-0.0078L -0.0732,-0.0093L -0.0729,-0.0102L -0.0725,-0.011L -0.0721,-0.0118L -0.0716,-0.0125L -0.0712,-0.0133L -0.0708,-0.014L -0.0697,-0.0154L -0.0691,-0.0161L -0.0686,-0.0168L -0.0668,-0.0186L -0.0661,-0.0191L -0.0654,-0.0197L -0.064,-0.0208L -0.0633,-0.0212L -0.0625,-0.0216L -0.0618,-0.0221L -0.061,-0.0225L -0.0602,-0.0229L -0.0593,-0.0232L -0.0578,-0.0237L -0.056,-0.0243L -0.0552,-0.0244L -0.0535,-0.0248L -0.0517,-0.025L 0.05,-0.025L 0.05,0.025","pos":[0,0.25],"layers":["F.Cu","F.Mask"],"index":1},"CTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu","F.Mask"],"index":2},"VCC":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu","F.Mask"],"index":3},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu","F.Mask"],"index":4},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu","F.Mask"],"index":5},"RTS":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.25],"layers":["F.Cu","F.Mask"],"index":6}});
const regulator_SOT223 = footprint({"G":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[-0.09,-0.12],"layers":["F.Cu","F.Mask"],"index":1},"O":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[0,-0.12],"layers":["F.Cu","F.Mask"],"index":2},"I":{"shape":"M -0.02,0.03L 0.02,0.03L 0.02,-0.03L -0.02,-0.03L -0.02,0.03","pos":[0.09,-0.12],"layers":["F.Cu","F.Mask"],"index":3},"out":{"shape":"M -0.065,0.03L 0.065,0.03L 0.065,-0.03L -0.065,-0.03L -0.065,0.03","pos":[0,0.12],"layers":["F.Cu","F.Mask"],"index":4}});
const C_1206 = footprint({"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu","F.Mask"],"index":2}});
const ESP32_WROOM = footprint({"GND1":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0.3],"layers":["F.Cu","F.Mask"],"index":1},"GND2":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[-0.225,-0.3894],"layers":["F.Cu","F.Mask"],"index":15},"GND3":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0.3],"layers":["F.Cu","F.Mask"],"index":38},"3V3":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0.25],"layers":["F.Cu","F.Mask"],"index":2},"EN":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0.2],"layers":["F.Cu","F.Mask"],"index":3},"VP":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0.15],"layers":["F.Cu","F.Mask"],"index":4},"VN":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0.1],"layers":["F.Cu","F.Mask"],"index":5},"IO34":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0.05],"layers":["F.Cu","F.Mask"],"index":6},"IO35":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,0],"layers":["F.Cu","F.Mask"],"index":7},"IO32":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.05],"layers":["F.Cu","F.Mask"],"index":8},"IO33":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.1],"layers":["F.Cu","F.Mask"],"index":9},"IO25":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.15],"layers":["F.Cu","F.Mask"],"index":10},"IO26":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.2],"layers":["F.Cu","F.Mask"],"index":11},"IO27":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.25],"layers":["F.Cu","F.Mask"],"index":12},"IO14":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.3],"layers":["F.Cu","F.Mask"],"index":13},"IO12":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[-0.3346,-0.35],"layers":["F.Cu","F.Mask"],"index":14},"IO13":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[-0.175,-0.3894],"layers":["F.Cu","F.Mask"],"index":16},"SHD":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[-0.125,-0.3894],"layers":["F.Cu","F.Mask"],"index":17},"SWP":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[-0.075,-0.3894],"layers":["F.Cu","F.Mask"],"index":18},"SCS":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[-0.025,-0.3894],"layers":["F.Cu","F.Mask"],"index":19},"SCK":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[0.025,-0.3894],"layers":["F.Cu","F.Mask"],"index":20},"SDO":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[0.075,-0.3894],"layers":["F.Cu","F.Mask"],"index":21},"SDI":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[0.125,-0.3894],"layers":["F.Cu","F.Mask"],"index":22},"IO15":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[0.175,-0.3894],"layers":["F.Cu","F.Mask"],"index":23},"IO2":{"shape":"M -0.0157,0.0394L 0.0157,0.0394L 0.0157,-0.0394L -0.0157,-0.0394L -0.0157,0.0394","pos":[0.225,-0.3894],"layers":["F.Cu","F.Mask"],"index":24},"IO0":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.35],"layers":["F.Cu","F.Mask"],"index":25},"IO4":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.3],"layers":["F.Cu","F.Mask"],"index":26},"IO16":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.25],"layers":["F.Cu","F.Mask"],"index":27},"IO17":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.2],"layers":["F.Cu","F.Mask"],"index":28},"IO5":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.15],"layers":["F.Cu","F.Mask"],"index":29},"IO18":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.1],"layers":["F.Cu","F.Mask"],"index":30},"IO19":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,-0.05],"layers":["F.Cu","F.Mask"],"index":31},"NC":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0],"layers":["F.Cu","F.Mask"],"index":32},"IO21":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0.05],"layers":["F.Cu","F.Mask"],"index":33},"RX0":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0.1],"layers":["F.Cu","F.Mask"],"index":34},"TX0":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0.15],"layers":["F.Cu","F.Mask"],"index":35},"IO22":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0.2],"layers":["F.Cu","F.Mask"],"index":36},"IO23":{"shape":"M -0.0394,0.0157L 0.0394,0.0157L 0.0394,-0.0157L -0.0394,-0.0157L -0.0394,0.0157","pos":[0.3346,0.25],"layers":["F.Cu","F.Mask"],"index":37}});
const slide_switch = footprint({"1":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[-0.098,0.1],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[0,0.1],"layers":["F.Cu","F.Mask"],"index":2},"3":{"shape":"M -0.0195,0.0235L 0.0195,0.0235L 0.0195,-0.0235L -0.0195,-0.0235L -0.0195,0.0235","pos":[0.098,0.1],"layers":["F.Cu","F.Mask"],"index":3}});
const button_6mm = footprint({"L1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,0.08],"layers":["F.Cu","F.Mask"],"index":1},"R1":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[-0.125,-0.08],"layers":["F.Cu","F.Mask"],"index":2},"R2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,-0.08],"layers":["F.Cu","F.Mask"],"index":3},"L2":{"shape":"M -0.04,0.03L 0.04,0.03L 0.04,-0.03L -0.04,-0.03L -0.04,0.03","pos":[0.125,0.08],"layers":["F.Cu","F.Mask"],"index":4}});
const R_1206 = footprint({"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu","F.Mask"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu","F.Mask"],"index":2}});


// @version: v0.1.0
// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = 1.45 // board width
const height = 1.2 // board height
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
let J1 = board.add(header_FTDI, {translate: pt(x+width-.22, y+.5), rotate: 0, label: 'J1 FTDI\n3.3V'});
let IC1 = board.add(regulator_SOT223, {translate: pt(J1.posX-.25, J1.posY), label: 'IC1\n3.3V'});
let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.posY-.25), label: 'C1 10uF'});
let C2 = board.add(C_1206, {translate: pt(IC1.posX, IC1.posY+.25), label: 'C2 1uF'});
let IC2 = board.add(ESP32_WROOM, {translate: pt(x+.35, y+.69), rotate: 90, label: 'IC2\nESP32-WROOM'});
let S1 = board.add(slide_switch, {translate: pt(IC1.posX, IC1.padY("out")+.4), rotate: 180, label: 'prog run'});
let S2 = board.add(button_6mm, {translate: pt(IC2.posX, IC2.padY("EN")-.2), label: 'reset'});
let R1 = board.add(R_1206, {translate: pt(S2.padX("L2")+.15, S2.posY), rotate: 90, label: 'R1\n10k'});
let C3 = board.add(C_1206, {translate: pt(R1.posX+.12, R1.posY), rotate: 90, label: 'C3\n.1uF'});

let interior = geo.path(path([x, y+height],
                             [x+width, y+height],
                             [x+width, y],
                             [x, y]));

board.addShape("interior", interior);


/* -- ADD_WIRES -- */
board.wire(path(IC1.pad("G"),
                [IC1.padX("G")-.05, IC1.padY("G")],
                [IC1.padX("G")-.05, J1.padY("GND")+.1],
                [J1.padX("GND"), J1.padY("GND")+.1],
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

board.wire(path(IC2.pad("GND1"),
                [IC2.padX("GND1"), IC2.padY("GND2")],
                IC2.pad("GND2"),), w);

board.wire(path(IC2.pad("GND1"),
                IC2.pad("GND3"),), w);

board.wire(path(IC2.pad("GND2"),
                [IC1.padX("G")-.05, IC2.padY("GND2")],
                [IC1.padX("G")-.05, IC1.padY("G")],
                IC1.pad("G"),), w);

board.wire(path(IC2.pad("RX0"),
                [IC2.padX("RX0"), IC2.padY("RX0")+.1],
                [J1.padX("Tx")+.1, IC2.padY("RX0")+.1],
                [J1.padX("Tx")+.1, J1.padY("Tx")],
                J1.pad("Tx"),), w);

board.wire(path(IC2.pad("TX0"),
                [IC2.padX("TX0"), IC2.padY("RX0")+.14],
                [J1.padX("Rx")+.14, IC2.padY("RX0")+.14],
                [J1.padX("Rx")+.14, J1.padY("Rx")],
                J1.pad("Rx"),), w);

board.wire(path(S1.pad("3"),
                [IC1.padX("G")-.05, S1.padY("3")],
                [IC1.padX("G")-.05, IC2.padY("IO0")],
                IC2.pad("IO0"),), w);

board.wire(path(S1.pad("2"),
                [S1.posX, J1.padY("GND")+.1],), w);

board.wire(path(S2.pad("L1"),
                S2.pad("L2"),), w);

board.wire(path(S2.pad("L1"),
                [IC2.padX("EN"), S2.padY("L1")],
                IC2.pad("EN"),), w);

board.wire(path(S2.pad("R1"),
                S2.pad("R2"),), w);

board.wire(path(S2.pad("R1"),
                [IC2.padX("GND1"), S2.padY("R1")],
                IC2.pad("GND1"),), w);

board.wire(path(IC2.pad("3V3"),
                [IC2.padX("3V3"), S2.posY],
                [IC1.padX("O"), S2.posY],
                IC1.pad("O"),), w);

board.wire(path(R1.pad("1"),
                [R1.posX, R1.posY],), w);

board.wire(path(R1.pad("2"),
                [R1.posX, S2.padY("L2")],
                S2.pad("L2"),), w);

board.wire(path(C3.pad("1"),
                [C3.posX, C3.posY],), w);

board.wire(path(C3.pad("2"),
                [C1.padX("1"), C3.padY("2")],
                C1.pad("1"),), w);


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
