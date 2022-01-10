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

let test_comp1 = board.add(test_footprint, {translate: [0.35, 0.65], name: "COMP1"})
let test_comp2 = board.add(test_footprint, {translate: [0.7, 0.3], name: "COMP2"})

board.wire([test_comp1.pad("GND"),
            [test_comp2.padX("GND"), test_comp1.padY("GND")],
            test_comp2.pad("GND")], 0.015)

let v1 = board.add(via(0.02, 0.035), {translate: [test_comp1.padX("D+"), 0.4]})
let v2 = board.add(via(0.02, 0.035), {translate: [0.4, v1.posY]})

board.wire([test_comp1.pad("D+"),
            v1.pos], 0.015)

board.wire([v1.pos,
            v2.pos], 0.015, "B.Cu")

board.wire([v2.pos,
            [v2.posX+0.1, v2.posY],
            [v2.posX+0.1, test_comp2.padY("D+")],
            test_comp2.pad("D+")], 0.015)

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
