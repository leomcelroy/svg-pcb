import { html, svg } from "lit-html";
import { dispatch } from "../dispatch.js";

export const drawImportItems = (files) => files.map(x => x.slice(10)).map( x => html`
  <div class="menu-item" @mousedown=${async (e) => {
    const res = await fetch(`components/${x}`);
    const text = await res.text();
    dispatch("ADD_IMPORT", { text, name: e.target.innerText.split("/")[1].split(".")[0] });
  }}>${x}</div>
`)