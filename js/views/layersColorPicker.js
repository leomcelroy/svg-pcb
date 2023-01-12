import { html, svg } from "lit-html";
import { dispatch } from "../dispatch.js";

export const layersColorPicker = (state) => html`
  <div class="layers-color-picker">
    <b>Layers:</b>
    ${state.layers.map(l => { 

      const getOpacity = n => (parseInt(n, 16)/255).toFixed(2);

      // verify color
      // verify name

      const name = l.length === 3 ? l[1][0].value.slice(1, -1) : l[0].value.match(/\".*?\"/)[0].slice(1, -1)
      const color = l.length === 3 ? l[2][0].value.slice(1, -3) : "";
      const opacity = l.length === 3 ? getOpacity(l[2][0].value.slice(8, -1)) : "";

      const onOpacityChange = (e) => {

        let hex = Math.floor((Number(e.target.value)*255)).toString(16);
        const { from, to } = l[2][0];

        while (hex.length < 2) {
            hex = "0" + hex;
        }

        state.codemirror.view.dispatch({
          changes: {
            from: to-3, 
            to: to-1, 
            insert: hex
          }
        });

        // could just update the paths in global state
        dispatch("RUN", { flatten: false });
      }

      const onColorChange = (e) => {

        const hex = e.target.value;
        const { from, to } = l[2][0];

        state.codemirror.view.dispatch({
          changes: {
            from: from+1, 
            to: from+8, 
            insert: hex
          }
        });

        // could just update the paths in global state
        dispatch("RUN", { flatten: false });
      }

      const onCommentInput = (e) => {

        if (l[0].name === "Property") {
          const { from } = l[0];
          state.codemirror.view.dispatch({
            changes: {
              from: from, 
              insert: "//"
            }
          });

          // could just update the paths in global state
          dispatch("RUN", { flatten: false });
        }

        if (l[0].name === "LineComment") {
          const { from } = l[0];
          state.codemirror.view.dispatch({
            changes: {
              from: from, 
              to: from + 2,
              insert: ""
            }
          });

          // could just update the paths in global state
          dispatch("RUN", { flatten: false });
        }

        // state.codemirror.view.dispatch({
        //   changes: {
        //     from: from+1, 
        //     to: from+8, 
        //     insert: hex
        //   }
        // });

        
      }



      const colorInput = l.length === 3 ?
        html`
            <span class="layer-color">
              <input @input=${onColorChange} class="color-input" type="color" style="opacity: ${opacity};" value=${color}/>
              <span class="opacity-input">
                ${opacity}
                <input @input=${onOpacityChange} type="range" min="0" max="1" step="0.01" value=${opacity}/>
              </span>
            </span>
        ` : "";

      return html`
        <div class="layer-item">
          <span class="layer-name">
            <input @input=${onCommentInput} type="checkbox" .checked=${l.length === 3}/>
            <span>${name}</span>
          </span>
          ${colorInput}
        </div>
      `
    })}
  </div>

`