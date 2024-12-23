# SVG PCB: a bidirectional editor for making circuits with code

![teaser](https://user-images.githubusercontent.com/27078897/194322283-9ed63453-8606-4120-8d87-8f650782af4e.jpg)

SVG PCB is JavaScript based hardware description language and a browser-based editor for that language.

For more information go to the [SVG PCB Website](https://leomcelroy.com/svg-pcb-website/#/home).

An introductory [tutorial can be found here](https://github.com/leomcelroy/svg-pcb/blob/main/DOCS/TUTORIAL.md#svg-pcb).

You can also read our paper from [SCF 2022](https://dl.acm.org/doi/pdf/10.1145/3559400.3562004).

**Use a Chromium Browser**

## About

SVG PCB is an open-source, web-based, client-side editor for parametric printed circuit board (PCB) design which supports bidirectional editing between our JavaScript hardware description language and a direct manipulation graphical interface. We developed a JSON format for describing component pads as SVG path data strings, referential component placements, and wire descriptions with curves, arbitrary degree Bezier splines, fillets, and chamfers. Boards can be exported in their JavaScript representation, as SVGs, or in Gerber format. The web-editor also supports interactive elements which update PCB designs in real-time such as number sliders, component translation handles, and drag-and-drop component libraries. Our tool was successfully used for developing and sharing basic boards in a distributed global class on digital fabrication and by researchers to produce procedurally generated designs. SVG-PCB offers the power and flexibility of a general purpose programming language for designing boards with the ease of use of a graphical user interface.

### Using programming constructs like loops for parametric designs

Below demonstrates the code generating a procedural array of components (a), with arbitrary length and automatic wiring. Examples are
shown for 𝑛 = 3 (b) and 𝑛 = 6 (c).

<img width="935" alt="Screenshot 2024-12-23 at 11 43 34 AM" src="https://github.com/user-attachments/assets/b55771a5-96ea-47c4-846c-f3ada55dc6e0" />

### Reconfigurable designs

Here we see a reconfigurable board, where the user can select connectors and some components (here, the voltage regulator) from a
list.

<img width="871" alt="Screenshot 2024-12-23 at 11 45 52 AM" src="https://github.com/user-attachments/assets/300f49ee-3495-4959-b334-09d6470d7404" />

### Different types of wires

Different type of wire points. Left to right: regular (a), chamfer (b), fillet (c) and Bezier splines (d).

<img width="934" alt="Screenshot 2024-12-23 at 11 47 10 AM" src="https://github.com/user-attachments/assets/fa1a4526-5e84-40ca-8fb0-c6fe23030b33" />

### SVG insertion and Bezier spline traces

Left: example board design using SVG insertion and Bezier splines wires. Right: resulting board milled on a desktop
CNC milling machine.

<img width="653" alt="Screenshot 2024-12-23 at 11 40 49 AM" src="https://github.com/user-attachments/assets/da4682c6-e3ec-41a6-aace-806e3a5fcffd" />

## Dev

Download the repo and run:

```
yarn
yarn dev
```


