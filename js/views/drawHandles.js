import { html, svg } from "lit-html";
import { Turtle } from "../Turtle.js";

const translateHandleSize = 0.02;
const d = new Turtle()
            .arc(361, translateHandleSize)
            .offset(0.003)
            .getPathData()
export const drawHandles = (pcb) => pcb.components.map((comp, i) => svg`
  <g class="no-download translate-handle">
    <path
          d=${d}
          transform="translate(${comp.posX}, ${comp.posY-translateHandleSize})"
      />
      <circle
        class="translate-handle-trigger" 
      data-index=${i}
        stroke="none"
        fill="#00000000"
      cx="${comp.posX}"
      cy="${comp.posY}"
      r="${translateHandleSize}"
      />
  </g>
`)