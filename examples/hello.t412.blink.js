const FTDI = (() => { return pcb.kicadToObj(
`(module fab:fab-1X06SMD (layer F.Cu) (tedit 200000)
  (attr smd)
  (fp_text reference >NAME (at -2.54 0 90) (layer F.SilkS)
    (effects (font (size 1.27 1.27) (thickness 0.1016)))
  )
  (fp_text value "" (at 0 0) (layer F.SilkS)
    (effects (font (size 1.27 1.27) (thickness 0.15)))
  )
  (pad GND smd rect (at 0 -6.35) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad CTS smd rect (at 0 -3.81) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad VCC smd rect (at 0 -1.27) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad TX smd rect (at 0 1.27) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad RX smd rect (at 0 3.81) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad RTS smd rect (at 0 6.35) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
)
`)})()
const C1206 = (() => { return pcb.kicadToObj(
`(module fab:fab-C1206FAB (layer F.Cu) (tedit 200000)
  (attr smd)
  (fp_text reference >NAME (at 0.762 -1.778) (layer F.SilkS)
    (effects (font (size 1.016 1.016) (thickness 0.1524)))
  )
  (fp_text value >VALUE (at 1.27 1.778) (layer F.SilkS)
    (effects (font (size 1.016 1.016) (thickness 0.1524)))
  )
  (fp_line (start -2.032 -1.016) (end 2.032 -1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start 2.032 -1.016) (end 2.032 1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start 2.032 1.016) (end -2.032 1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start -2.032 1.016) (end -2.032 -1.016) (layer B.SilkS) (width 0.127))
  (pad 1 smd rect (at -1.651 0) (size 1.27 1.905) (layers F.Cu F.Paste F.Mask))
  (pad 2 smd rect (at 1.651 0) (size 1.27 1.905) (layers F.Cu F.Paste F.Mask))
)
`)})()
const LED1206 = (() => { return pcb.kicadToObj(
`(module fab:fab-LED1206FAB (layer F.Cu) (tedit 200000)
  (descr "LED1206 FAB STYLE (SMALLER PADS TO ALLOW TRACE BETWEEN)")
  (tags "LED1206 FAB STYLE (SMALLER PADS TO ALLOW TRACE BETWEEN)")
  (attr smd)
  (fp_text reference >NAME (at 0.762 -1.778) (layer F.SilkS)
    (effects (font (size 1.016 1.016) (thickness 0.1524)))
  )
  (fp_text value >VALUE (at 1.27 1.778) (layer F.SilkS)
    (effects (font (size 1.016 1.016) (thickness 0.1524)))
  )
  (fp_line (start -2.032 -1.016) (end 2.032 -1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start 2.032 -1.016) (end 2.032 1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start 2.032 1.016) (end -2.032 1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start -2.032 1.016) (end -2.032 -1.016) (layer B.SilkS) (width 0.127))
  (pad 1 smd rect (at -1.651 0) (size 1.27 1.905) (layers F.Cu F.Paste F.Mask))
  (pad 2 smd rect (at 1.651 0) (size 1.27 1.905) (layers F.Cu F.Paste F.Mask))
)
`)})()
const R1206 = (() => { return pcb.kicadToObj(
`(module fab:fab-R1206FAB (layer F.Cu) (tedit 200000)
  (attr smd)
  (fp_text reference >NAME (at 0.762 -1.778) (layer F.SilkS)
    (effects (font (size 1.016 1.016) (thickness 0.1524)))
  )
  (fp_text value >VALUE (at 1.27 1.778) (layer F.SilkS)
    (effects (font (size 1.016 1.016) (thickness 0.1524)))
  )
  (fp_line (start -2.032 -1.016) (end 2.032 -1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start 2.032 -1.016) (end 2.032 1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start 2.032 1.016) (end -2.032 1.016) (layer B.SilkS) (width 0.127))
  (fp_line (start -2.032 1.016) (end -2.032 -1.016) (layer B.SilkS) (width 0.127))
  (pad 1 smd rect (at -1.651 0) (size 1.27 1.905) (layers F.Cu F.Paste F.Mask))
  (pad 2 smd rect (at 1.651 0) (size 1.27 1.905) (layers F.Cu F.Paste F.Mask))
)
`)})()
const SOIC8 = (() => { return pcb.kicadToObj(
`(module fab-SOIC-8_3.9x4.9mm_P1.27mm (layer F.Cu) (tedit 5EABE866)
  (descr "SOIC, 8 Pin, fab version")
  (tags "SOIC fab")
  (attr smd)
  (fp_text reference REF** (at 0 -3.4) (layer F.SilkS)
    (effects (font (size 1 1) (thickness 0.15)))
  )
  (fp_line (start -1.95 -1.475) (end -0.975 -2.45) (layer F.Fab) (width 0.1))
  (fp_line (start -1.95 2.45) (end -1.95 -1.475) (layer F.Fab) (width 0.1))
  (fp_line (start 1.95 2.45) (end -1.95 2.45) (layer F.Fab) (width 0.1))
  (fp_line (start 1.95 -2.45) (end 1.95 2.45) (layer F.Fab) (width 0.1))
  (fp_line (start -0.975 -2.45) (end 1.95 -2.45) (layer F.Fab) (width 0.1))
  (fp_line (start 0 -2.56) (end -3.45 -2.56) (layer F.SilkS) (width 0.12))
  (fp_line (start 0 -2.56) (end 1.95 -2.56) (layer F.SilkS) (width 0.12))
  (fp_line (start 0 2.56) (end -1.95 2.56) (layer F.SilkS) (width 0.12))
  (fp_line (start 0 2.56) (end 1.95 2.56) (layer F.SilkS) (width 0.12))
  (pad 8 smd rect (at 2.475 -1.905) (size 2 0.6) (layers F.Cu))
  (pad 7 smd rect (at 2.475 -0.635) (size 2 0.6) (layers F.Cu))
  (pad 6 smd rect (at 2.475 0.635) (size 2 0.6) (layers F.Cu))
  (pad 5 smd rect (at 2.475 1.905) (size 2 0.6) (layers F.Cu))
  (pad 4 smd rect (at -2.475 1.905) (size 2 0.6) (layers F.Cu))
  (pad 3 smd rect (at -2.475 0.635) (size 2 0.6) (layers F.Cu))
  (pad 2 smd rect (at -2.475 -0.635) (size 2 0.6) (layers F.Cu))
  (pad 1 smd rect (at -2.475 -1.905) (size 2 0.6) (layers F.Cu))
  (model {KISYS3DMOD}/Package_SO.3dshapes/SOIC-8_3.9x4.9mm_P1.27mm.wrl
    (at (xyz 0 0 0))
    (scale (xyz 1 1 1))
    (rotate (xyz 0 0 0))
  )
)
`)})()

// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import

// output selection, choose from:
//  - interior
//  - exterior
//  - top traces
//  - bottom traces reversed
//  - top, bottom and exterior
//  - top, bottom, labels and exterior
let output = "top, bottom and exterior";

// board definition
const border = 0.07;
const width = 0.8;
const height = 0.7;
const x = 1;
const y = 1;
const zt = 0;
const zb = -0.06;
const w = 0.018;
const mask = .004;

let board = new PCB();

// add parts
let ic1 = board.add(SOIC8, {translate:  [x+0.22, y+0.38], name: "t412"});
let c1 = board.add(C1206, {translate: [ic1.posX, ic1.padY("1")+0.12], rotate:0, name: "C1"});
let r1 = board.add(R1206, {translate: [ic1.posX, ic1.padY("4")-0.12], rotate:0, name: "R1"});
let led1 = board.add(LED1206, {translate: [r1.posX, r1.posY-0.12], rotate:0, name: "LED1"});
let j1 = board.add(FTDI, {translate: [x+width-0.2, ic1.posY-0.05], name: "J1"});
let r2 = board.add(R1206, {translate: [j1.posX-.12, j1.padY("TX")-0.05], rotate:  90, name: "R2"});

// add wires
board.wire([ic1.pad("1"),
            [ic1.padX("1"), c1.padY("1")],
            c1.pad("1")], w)

board.wire([ic1.pad("8"),
            [ic1.padX("8"), c1.posY],
            c1.pad("2")], w)

board.wire([ic1.pad("5"),
            [ic1.padX("5"), r1.posY],
            r1.pad("2")], w)

board.wire([led1.pad("1"),
            [ic1.padX("1")-0.08, led1.padY("1")],
            [ic1.padX("1")-0.08, ic1.padY("1")],
            ic1.pad("1")], w)

board.wire([led1.pad("2"),
            led1.pos,
            r1.pos,
            r1.pad("1")], w)

board.wire([j1.pad("GND"),
            [c1.padX("2"), j1.padY("GND")],
            c1.pad("2")], w)

board.wire([c1.pad("1"),
            [c1.padX("1"), j1.padY("GND")+0.08],
            [j1.posX+0.1, j1.padY("GND")+0.08],
            [j1.posX+0.1, j1.padY("VCC")],
            j1.pad("VCC")], w)

board.wire([ic1.pad("6"),
            [ic1.padX("6")+0.08, ic1.padY("6")],
            [ic1.padX("6")+0.08, r2.padY("1")],
            r2.pad("1")], w)

board.wire([r2.pad("1"),
            [r2.padX("1"), j1.padY("RX")],
            j1.pad("RX")], w)

board.wire([r2.pad("2"),
            [r2.padX("2"), j1.padY("TX")],
            j1.pad("TX")], w)

board.addFrep("interior", frep.rectangle(x, x+width, y, y+height));
board.addFrep("exterior", frep.subtract("true", board.getLayer("interior")));

let functions = [];

if (output == "interior") {
  functions = [
    {f: board.getLayer("interior"), color: [1, 1, 1, 1]}
  ];
} else if (output == "exterior") {
  functions = [
    {f: board.getLayer("exterior"), color: [1, 1, 1, 1]}
  ];
} else if (output == "top traces") {
  functions = [
    {f: board.getLayer("F.Cu"), color: [1, 1, 1, 1]}
  ];
} else if (output == "bottom traces reversed") {
  functions = [
    {f: frep.reflect_x(board.getLayer("B.Cu"), 2*x+width), color: [1, 1, 1, 1]}
  ];
} else if (output == "top, bottom and exterior") {
  functions = [
    {f: board.getLayer("drill"), color: [0.3, 0.7, 1, 0.9]},
    {f: board.getLayer("F.Cu"), color: [0.7, .5, 0.29, .7]},
    {f: board.getLayer("B.Cu"), color: [0.0, 1.0, 0.5, .5]},
    {f: board.getLayer("interior"), color: [0, 0, 0, 1]},
    {f: board.getLayer("exterior"), color: [1, 1, 1, 1]}
  ];
} else if (output == "top, bottom, labels and exterior") {
  functions = [
    {f: board.getLayer("componentLabels"), color: [0.1, 1, 0.1, .7]},
    {f: board.getLayer("padLabels"), color: [1, 0.27, 0.07, .8]},
    {f: board.getLayer("drill"), color: [0.3, 0.7, 1, 0.9]},
    {f: board.getLayer("F.Cu"), color: [0.7, .5, 0.29, .7]},
    {f: board.getLayer("B.Cu"), color: [0.0, 1.0, 0.5, .5]},
    {f: board.getLayer("interior"), color: [0, 0, 0, 1]},
    {f: board.getLayer("exterior"), color: [1, 1, 1, 1]}
  ];
} else {
  functions = [];
}

return {
  functions: functions,
  limits: {
    x: [x-border, x+width+border],
    y: [y-border, y+height+border]
  },
  mm_per_unit: 25.4
}
