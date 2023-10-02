import { html, svg } from "lit-html";
import { dispatch } from "../dispatch.js";
import { global_state } from "../global_state.js";


// add open close
// add search functionality

export const drawComponentMenu = files => {
  if (!global_state.componentMenu) return "";

  return html`
    <div class="component-menu">
      <div class="header">
        <div class="title">
          <div><b>Component Menu</b></div>
          <div class="sub-header">missing a component, check out <a target="_blank" href="https://www.snapeda.com/">snapeda</a> and drop the .kicad_mod into SVG-PCB</div>
        </div>
        <span
          class="close" 
          @mousedown=${() => {
            global_state.componentMenu = false;
            dispatch("RENDER");
          }}>X</span>
      </div>
      <div class="search-container">
        <input .value=${global_state.componentSearch} placeholder="search" @input=${e => {
          global_state.componentSearch = e.target.value;
          dispatch("RENDER");
        }}/>
      </div>
      <div class="file-menu">
        ${files.map(x => {
          const name = x.slice(10);

          if (!name.toLowerCase().includes(global_state.componentSearch.toLowerCase()) && global_state.componentSearch !== "") return "";

          const onMousedown = async (e) => {
            const res = await fetch(`components/${name}`);
            const text = await res.text();
            dispatch("ADD_IMPORT", { text, name: e.target.innerText.split("/")[1].split(".")[0] });
          }

          return html`
            <div class="menu-item" @mousedown=${onMousedown}>${name}</div>
          `
        })}
      </div>
    </div>

  `
}