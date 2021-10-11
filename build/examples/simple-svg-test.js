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

let board = new PCB();

ftdi = board.add(FTDI, {translate: [-0.3, 0.7]})

console.log(board, ftdi.pos)

board.wire([[0, 0.2], ftdi.pos], 0.02)

return {
  shapes: [
    { d: board.getLayer("F.Cu").getPath(false), color: [1,0,0,1] },
  ],
  limits: {},
  mm_per_unit: 25.4
}
