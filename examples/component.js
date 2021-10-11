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

test_comp = board.add(test_footprint, {translate: [0.5, 0.5], name: "COMP"})

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
