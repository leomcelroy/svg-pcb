const SOIC14 = (() => { return kicadToObj(
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

let board = new PCB();

board.add(SOIC14, {translate: [0, 0] })

return {
  shapes: [
    { d: board.getLayer("B.Cu"), color: [0.0, 1.0, 0.5, .5] },
    { d: board.getLayer("F.Cu"), color: [0.7, .5, 0.29, .7] },
    { d: board.getLayer("padLabels"), color: [1, 0.27, 0.07, .8] },
    { d: board.getLayer("componentLabels"), color: [0.1, 1, 0.1, .7] },
  ],
  limits: {
    x: [0, 1],
    y: [0, 1]
  },
  mm_per_unit: 25.4
}
