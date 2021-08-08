const header_UPDI_3 = (() => { return pcb.kicadToObj(
`(module fab:fab-1X06SMD (layer F.Cu) (tedit 200000)
  (attr smd)
  (fp_text reference >NAME (at -2.54 0 90) (layer F.SilkS)
    (effects (font (size 1.27 1.27) (thickness 0.1016)))
  )
  (fp_text value "" (at 0 0) (layer F.SilkS)
    (effects (font (size 1.27 1.27) (thickness 0.15)))
  )
  (pad 1 smd rect (at 0 2.54) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad 2 smd rect (at 0 0) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
  (pad 3 smd rect (at 0 -2.54) (size 2.54 1.1) (layers F.Cu F.Paste F.Mask))
)
`)})()
const C_1206 = (() => { return pcb.kicadToObj(
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
const LED_1206 = (() => { return pcb.kicadToObj(
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
const R_1206 = (() => { return pcb.kicadToObj(
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
const ATtiny412 = (() => { return pcb.kicadToObj(
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
let output = "top, bottom, labels and exterior";

// constants
const width = .47 // board width
const height = .65 // board height
const x = 1 // x origin
const y = 1 // y origin
const zt = 0 // top z
const zb = -0.06 // bottom z
const w = .015 // wire width
const mask = .004 // solder mask size
const border = 0.05 // rendering border

// board shape
let board = new PCB();
board.addFrep("interior", frep.rectangle(x, x + width, y, y + height));
board.addFrep("exterior", frep.subtract("true", board.getLayer("interior")));

// add parts
let IC1 = board.add(ATtiny412, {translate: [x+.18, y+.43], name: 'IC1'});
let C1 = board.add(C_1206, {translate: [IC1.posX, IC1.padY("1")+.08], name: 'C1'});
let J1 = board.add(header_UPDI_3, {translate: [IC1.posX, y+.23], rotate: 90, name: 'J1'});
let R1 = board.add(R_1206, {translate: [IC1.posX+.23, IC1.posY-.01], rotate: 90, name: 'R1'});
let LED1 = board.add(LED_1206, {translate: [R1.posX, R1.posY-.23], rotate: -90, name: 'LED1'});

// add wires
board.wire([C1.pad("1"),
            [IC1.padX("1"),C1.posY],
            IC1.pad("1")], w)

board.wire([C1.pad("2"),
            [IC1.padX("8"),C1.posY],
            IC1.pad("8")], w)

board.wire([IC1.pad("6"),
            [IC1.posX+.03,IC1.padY("6")],
            [IC1.posX+.03,IC1.padY("5")-.02],
            [J1.padX("1"),IC1.padY("5")-.09],
            J1.pad("1")], w)

board.wire([IC1.pad("8"),
            [IC1.posX,IC1.padY("8")],
            J1.pad("2")], w)

board.wire([IC1.pad("1"),
            [IC1.posX-.03,IC1.padY("1")],
            [IC1.posX-.03,IC1.padY("4")-.02],
            [J1.padX("3"),IC1.padY("4")-.09],
            J1.pad("3")], w)

board.wire([IC1.pad("7"),
            [R1.posX,IC1.padY("7")],
            R1.pad("2")], w)

board.wire([J1.pad("2"),
            [J1.padX("2"),J1.posY-.1],
            [LED1.posX,J1.posY-.1]], w)

board.wire([LED1.pad("1"),
            R1.pad("1")], w)

// rendering
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
