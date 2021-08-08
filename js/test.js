export const test = `// press shift+enter to run

// for console press
// mac: Command + Option + j
// Windows/Linux: Shift + CTRL + j

// included: Turtle, PCB, pcb

let test = new Turtle()
  .goto([10, 10])
  .text("leo")
  .arc(240, 30)
  .originate()
  .getPath();

return {
  paths: [
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

`
