import { createComponent, html } from "../createComponent.js";

createComponent({
	name: "vert-separator",
	view: el => html`
		<div class="separator"></div>
	`,
	css: `
    .separator {
      position: absolute;
      height: 100%;
      background: black;
      width: 5px;
      left: var(--editor-width);
      transform: translate(-50%, 0);
    }

    .separator:hover {
      background: grey;
      cursor: col-resize;
      width: 10px;
    }
	`
});
