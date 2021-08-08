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
const SOT23 = (() => { return pcb.kicadToObj(
`(module fab:fab-SOT-23 (layer F.Cu) (tedit 200000)
  (descr "SMALL OUTLINE TRANSISTOR")
  (tags "SMALL OUTLINE TRANSISTOR")
  (attr smd)
  (fp_text reference >NAME (at 1.778 -3.937) (layer F.SilkS)
    (effects (font (size 1.27 1.27) (thickness 0.127)))
  )
  (fp_text value >VALUE (at 2.413 -2.413) (layer F.SilkS)
    (effects (font (size 1.27 1.27) (thickness 0.127)))
  )
  (pad 1 smd rect (at 0.9906 -1.016) (size 0.65 1.2) (layers F.Cu F.Paste F.Mask))
  (pad 2 smd rect (at -0.9398 -1.016) (size 0.65 1.2) (layers F.Cu F.Paste F.Mask))
  (pad 3 smd rect (at 0.0254 1.3) (size 0.65 1.2) (layers F.Cu F.Paste F.Mask))
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
const USB_A_PCB = (() => { return pcb.kicadToObj(
`(module USB-A-PCB (layer F.Cu) (tedit 5FEB5DC1)
  (fp_text reference REF** (at -0.254 -5.2832) (layer F.SilkS)
    (effects (font (size 0.32 0.32) (thickness 0.015)))
  )
  (fp_text value USB-A-PCB (at 0.5588 4.8768) (layer F.Fab)
    (effects (font (size 0.32 0.32) (thickness 0.015)))
  )
  (fp_line (start -5 -6) (end 3.7 -6) (layer F.Fab) (width 0.127))
  (fp_line (start 3.7 -6) (end 3.7 6) (layer F.Fab) (width 0.127))
  (fp_line (start 3.7 6) (end -5 6) (layer F.Fab) (width 0.127))
  (fp_line (start -5 6) (end -5 -6) (layer F.Fab) (width 0.127))
  (pad 5V smd rect (at -0.2 3.5) (size 7.5 1.5) (layers F.Cu F.Paste F.Mask))
  (pad DM smd rect (at 0.3 1) (size 6.5 1) (layers F.Cu F.Paste F.Mask))
  (pad DP smd rect (at 0.3 -1) (size 6.5 1) (layers F.Cu F.Paste F.Mask))
  (pad GND smd rect (at -0.2 -3.5) (size 7.5 1.5) (layers F.Cu F.Paste F.Mask))
)
`)})()
const SOIC14 = (() => { return pcb.kicadToObj(
`(module fab-SOIC-14_3.9x8.7mm_P1.27mm (layer F.Cu) (tedit 5EABE9B1)
  (descr "SOIC, 14 Pin, fab version")
  (tags "SOIC fab")
  (attr smd)
  (fp_text reference REF** (at 0 -5.28) (layer F.SilkS)
    (effects (font (size 1 1) (thickness 0.15)))
  )
  (fp_line (start 0 4.435) (end 1.95 4.435) (layer F.SilkS) (width 0.12))
  (fp_line (start 0 4.435) (end -1.95 4.435) (layer F.SilkS) (width 0.12))
  (fp_line (start 0 -4.435) (end 1.95 -4.435) (layer F.SilkS) (width 0.12))
  (fp_line (start 0 -4.435) (end -3.45 -4.435) (layer F.SilkS) (width 0.12))
  (fp_line (start -0.975 -4.325) (end 1.95 -4.325) (layer F.Fab) (width 0.1))
  (fp_line (start 1.95 -4.325) (end 1.95 4.325) (layer F.Fab) (width 0.1))
  (fp_line (start 1.95 4.325) (end -1.95 4.325) (layer F.Fab) (width 0.1))
  (fp_line (start -1.95 4.325) (end -1.95 -3.35) (layer F.Fab) (width 0.1))
  (fp_line (start -1.95 -3.35) (end -0.975 -4.325) (layer F.Fab) (width 0.1))
  (pad 1 smd rect (at -2.475 -3.81) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 2 smd rect (at -2.475 -2.54) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 3 smd rect (at -2.475 -1.27) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 4 smd rect (at -2.475 0) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 5 smd rect (at -2.475 1.27) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 6 smd rect (at -2.475 2.54) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 7 smd rect (at -2.475 3.81) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 8 smd rect (at 2.475 3.81) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 9 smd rect (at 2.475 2.54) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 10 smd rect (at 2.475 1.27) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 11 smd rect (at 2.475 0) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 12 smd rect (at 2.475 -1.27) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 13 smd rect (at 2.475 -2.54) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (pad 14 smd rect (at 2.475 -3.81) (size 1.5 0.76) (layers F.Cu F.Paste F.Mask))
  (model {KISYS3DMOD}/Package_SO.3dshapes/SOIC-14_3.9x8.7mm_P1.27mm.wrl
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
const border = 0.05 // border
const width = .8    // board width
const height = 1.3  // board height
const x = 1         // x origin
const y = 1         // y origin
const zt = 0        // top z
const zb = -0.06    // bottom z
const rv = 0.017    // via size
const rp = 0.031    // pad size
const w = .015      // wire width
const mask = .004   // solder mask size

// additional footprints
const pad_header = frep.rectangle(-.043,.043,-.015,.015);

let SWD_4_05 = {
  "CLK": {
    "pos": [-0.072, 0.025],
    "shape": pad_header,
    "layers": ["F.Cu"]
  },
  "DIO": {
    "pos": [0.072, 0.025],
    "shape": pad_header,
    "layers": ["F.Cu"]
  },
  "RST": {
    "pos": [-0.072, -0.025],
    "shape": pad_header,
    "layers": ["F.Cu"]
  },
  "GND": {
    "pos": [0.072, -0.025],
    "shape": pad_header,
    "layers": ["F.Cu"]
  }
}

let VIA = {
  "1": {
    "pos": [0, 0],
    "shape": frep.circle(0, 0, rp),
    "layers": ["F.Cu", "B.Cu"]
  },
  "1_drill": {
    "pos": [0, 0],
    "shape": frep.circle(0, 0, rv),
    "layers": ["drill"]
  },
}

let board = new PCB();

// add parts
d11c = board.add(SOIC14, {translate: [x+0.42, y+0.72], name: "D11C"})
swd = board.add(SWD_4_05, {translate: [d11c.posX, d11c.padY("7")-0.12], name: "SWD"})
usb = board.add(USB_A_PCB, {translate: [d11c.posX, y+height-0.175], rotate: -90, name: "USB"})
vreg = board.add(SOT23, {translate: [d11c.posX-0.33, d11c.padY("1")-0.06], name: "VREG"})
c1 = board.add(C1206, {translate: [vreg.posX, d11c.padY("7")-0.08], rotate: 90, name: "C1"})
uart = board.add(FTDI, {translate: [d11c.posX, y+0.22], rotate: 90, name: "UART"})
v1 = board.add(VIA, {translate: [vreg.padX("2"), vreg.posY-0.14], name: "V1"})
v2 = board.add(VIA, {translate: [uart.padX("VCC"), uart.padY("VCC")-0.1], name: "V2"})
v3 = board.add(VIA, {translate: [d11c.padX("3")-0.08, d11c.padY("3")], name: "V3"})
v4 = board.add(VIA, {translate: [uart.padX("CTS"), uart.padY("CTS")-0.1], name: "V4"})

board.wire([swd.pad("CLK"),
            [d11c.padX("7"), swd.padY("CLK")],
            [d11c.padX("7"), swd.padY("CLK")],
            d11c.pad("7")], w);

board.wire([swd.pad("DIO"),
            [d11c.padX("8"), swd.padY("DIO")],
            [d11c.padX("8"), swd.padY("DIO")],
            d11c.pad("8")], w);

board.wire([swd.pad("RST"),
            [d11c.padX("6")-0.06, swd.padY("RST")],
            [d11c.padX("6")-0.06, d11c.padY("6")],
            d11c.pad("6")], w);

board.wire([usb.pad("DM"),
            [usb.padX("DM"), usb.padY("DM")-0.1],
            [d11c.posX-0.015, usb.padY("DM")-0.16],
            [d11c.posX-0.015, d11c.padY("9")],
            d11c.pad("9")], w);


board.wire([usb.pad("DP"),
            [usb.padX("DP"), usb.padY("DP")-0.1],
            [d11c.posX+0.015, usb.padY("DP")-0.16],
            [d11c.posX+0.015, d11c.padY("10")],
            d11c.pad("10")], w);

board.wire([usb.pad("GND"),
            [usb.padX("GND"), usb.padY("GND")-0.22],
            [d11c.posX+0.045, usb.padY("GND")-0.22],
            [d11c.posX+0.045, d11c.padY("11")],
            d11c.pad("11")], w);

board.wire([uart.pad("GND"),
            [uart.padX("GND"), uart.posY-0.16],
            [uart.padX("RTS")+0.08, uart.posY-0.16],
            [uart.padX("RTS")+0.08, usb.padY("GND")-0.22],
            [usb.padX("GND"), usb.padY("GND")-0.22],
            usb.pad("GND")], w);

board.wire([uart.pad("TX"),
            [uart.padX("TX"), uart.posY-0.13],
            [uart.padX("RTS")+0.05, uart.posY-0.13],
            [uart.padX("RTS")+0.05, d11c.padY("14")],
            d11c.pad("14")], w);

board.wire([uart.pad("RX"),
            [uart.padX("RX"), uart.posY+0.13],
            [d11c.padX("1")-0.14, uart.posY+0.13],
            [d11c.padX("1")-0.14, d11c.padY("1")],
            d11c.pad("1")], w);

board.wire([uart.pad("RTS"),
            [uart.padX("RTS"), d11c.padY("13")],
            d11c.pad("13")], w);

board.wire([vreg.pad("2"),
            [vreg.padX("2"), usb.padY("5V")-0.18],
            [usb.padX("5V"), usb.padY("5V")-0.18],
            usb.pad("5V")], w);

board.wire([vreg.pad("3"),
            [vreg.padX("3"), usb.padY("GND")-0.22],
            [d11c.posX-0.045, usb.padY("GND")-0.22],
            [d11c.posX-0.045, d11c.padY("7")],
            [swd.posX, d11c.padY("7")-0.045],
            [swd.posX, swd.padY("GND")],
            swd.pad("GND")], w);

board.wire([c1.pad("1"),
            [c1.padX("1")+0.06, c1.padY("1")],
            [c1.padX("1")+0.06, vreg.padY("1")],
            vreg.pad("1")], w);

board.wire([[c1.padX("1")+0.06, c1.padY("1")],
            [c1.padX("1")+0.06, uart.posY+0.1],
            [uart.padX("TX")+0.05, uart.posY+0.1],
            [uart.padX("TX")+0.05, uart.posY-0.1],
            [uart.padX("RX")+0.05, uart.posY-0.1],
            [uart.padX("RX")+0.05, d11c.padY("12")],
            d11c.pad("12")], w);

board.wire([c1.pad("2"),
            [c1.padX("2")+0.025, c1.padY("2")],
            [vreg.padX("3")+0.025, vreg.padY("3")],
             vreg.pad("3")], w);

board.wire([c1.pad("2"),
            [c1.posX-0.06, c1.padY("2")],
            [c1.posX-0.06, uart.posY],
             uart.pad("GND")], w);

board.wire([v1.pad("1"),
            vreg.pad("2")], w);

board.wire([v2.pad("1"),
            uart.pad("VCC")], w);

board.wire([v1.pad("1"),
            [v2.padX("1"), v1.padY("1")],
            v2.pad("1")], w, "B.Cu");

board.wire([v3.pad("1"),
            d11c.pad("3")], w);

board.wire([v4.pad("1"),
            uart.pad("CTS")], w);

board.wire([v3.pad("1"),
            [uart.padX("TX"), v3.padY("1")],
            [uart.padX("TX"), uart.padY("TX")-0.16],
            [v4.padX("1"), uart.padY("TX")-0.16],
            v4.pad("1")], w, "B.Cu");

board.addFrep("interior", frep.rectangle(usb.posX-0.24,
                                         usb.posX+0.24,
                                         usb.posY-0.14,
                                         usb.posY+0.21));

board.addFrep("interior", frep.rectangle(d11c.posX-0.42,
                                         d11c.posX+0.37,
                                         uart.posY-0.2,
                                         usb.posY-0.14));

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
