import { html } from "lit-html";
import { dispatch } from "../dispatch.js";

export const inputRenderers = {
  "slider": (ops, staticInfo, state) => html`
    <style>
      .range-input-name {
        padding-right: 5px;
      }

      .range-input-slider {
        padding-right: 5px;
      }
    </style>
    <div class="range-input">
      <span class="range-input-name">${ops.name}:</span>
      <input 
        type="range" 
        class="range-input-slider"
        min=${ops.min}
        max=${ops.max}
        step=${ops.step}
        value=${ops.value}
        @input=${e => {

          const value = e.target.value;
          // modify code
          state.codemirror.view.dispatch({
            changes: {
              from: staticInfo.from, 
              to: staticInfo.to, 
              insert: value
            }
          });

          dispatch("RUN", { flatten: false });
        }}>
      </input>
      <span>${ops.value}</span>
    </div>`
}
