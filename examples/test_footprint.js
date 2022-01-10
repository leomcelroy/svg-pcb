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

// rendering
renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "drill": "#ff3300e5",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [0, 1],
    y: [0, 1]
  },
  mm_per_unit: 25.4
})
