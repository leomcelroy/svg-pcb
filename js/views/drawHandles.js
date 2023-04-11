import { html, svg } from "lit-html";

const translateHandleSize = 0.02;
export const drawHandles = (pcb) => pcb.components.map((comp, i) => svg`
  <g class="translate-handle">
      <circle
        class="translate-handle-trigger" 
      data-index=${i}
        stroke="none"
        fill="red"
      cx="${comp.posX}"
      cy="${comp.posY}"
      r="${translateHandleSize}"
      />
  </g>
`)