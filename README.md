# SVG PCB: a bidirectional editor for making circuits with code

![teaser](https://user-images.githubusercontent.com/27078897/194322283-9ed63453-8606-4120-8d87-8f650782af4e.jpg)

SVG PCB is JavaScript based hardware description language and a browser-based editor for that language.

For more information go to the [SVG PCB Website](https://leomcelroy.com/svg-pcb-website/#/home).

An introductory [tutorial can be found here](https://github.com/leomcelroy/svg-pcb/blob/main/DOCS/TUTORIAL.md#svg-pcb).

You can also read our paper from [SCF 2022](https://dl.acm.org/doi/pdf/10.1145/3559400.3562004).

**Use a Chromium Browser**

## About

SVG PCB is an open-source, web-based, client-side editor for parametric printed circuit board (PCB) design which supports bidirectional editing between our JavaScript hardware description language and a direct manipulation graphical interface. We developed a JSON format for describing component pads as SVG path data strings, referential component placements, and wire descriptions with curves, arbitrary degree Bezier splines, fillets, and chamfers. Boards can be exported in their JavaScript representation, as SVGs, or in Gerber format. The web-editor also supports interactive elements which update PCB designs in real-time such as number sliders, component translation handles, and drag-and-drop component libraries. Our tool was successfully used for developing and sharing basic boards in a distributed global class on digital fabrication and by researchers to produce procedurally generated designs. SVG-PCB offers the power and flexibility of a general purpose programming language for designing boards with the ease of use of a graphical user interface.

## Dev

Download the repo and run:

```
yarn
yarn dev
```


