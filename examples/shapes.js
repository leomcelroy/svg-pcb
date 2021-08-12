// press shift+enter to run

// for console press
// mac: Command + Option + j
// Windows/Linux: Shift + CTRL + j

// included: Turtle, PCB, pcb

let test = new Turtle()
  .rectangle(4.41, 3.01)
  .translate([1.29, 0.34])
  .getPath();

return {
  shapes: [
    {
      d: test,
      color: [1, 0, 0, .5]
    }
  ],
  limits: { // required
    x: [-4, 4],
    y: [-4, 4]
  },
  mm_per_unit: 25.4 // default is 25.4
}
