const test_footprint = {
  "VCC": {
    "shape": "M -0.05 0.025L 0.05 0.025L 0.05 -0.025L -0.05 -0.025L -0.05 0.025",
    "pos":[-0.1,0.05],
    "layers":["F.Cu"]
  },
  "GND": {
    "shape": "M -0.05 0.025L 0.05 0.025L 0.05 -0.025L -0.05 -0.025L -0.05 0.025",
    "pos":[0.1,0.05],
    "layers":["F.Cu"]
  },
  "D+": {
    "shape": "M -0.05 0.025L 0.05 0.025L 0.05 -0.025L -0.05 -0.025L -0.05 0.025",
    "pos":[-0.1,-0.05],
    "layers":["F.Cu"]
  },
  "D-": {
    "shape": "M -0.05 0.025L 0.05 0.025L 0.05 -0.025L -0.05 -0.025L -0.05 0.025",
    "pos":[0.1,-0.05],
    "layers":["F.Cu"]
  }
}

// press shift+enter to run

// for console press
// mac: Command + Option + j
// Windows/Linux: Shift + CTRL + j

// included: Turtle, PCB, pcb

let board = new PCB();

test_comp1 = board.add(test_footprint, {translate: [0.35, 0.65], name: "COMP1"})

renderShapes({
  shapes: [
    { d: board.getLayer("interior"), color: [0, 0.18, 0, 1] },
    { d: board.getLayer("B.Cu"), color: [1, 0.3, 0.0, .5] },
    { d: board.getLayer("F.Cu"), color: [1, 0.55, 0.0, .8] },
    { d: board.getLayer("drill"), color: [1, 0.2, 0, 0.9]},
    { d: board.getLayer("padLabels"), color: [1, 1, 0.6, 0.9] },
    { d: board.getLayer("componentLabels"), color: [0, 0.9, 0.9, 0.9] },
  ],
  limits: {
    x: [0, 1],
    y: [0, 1]
  },
  mm_per_unit: 25.4
})
