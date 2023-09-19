import { createComponent, html } from "../createComponent.js";

createComponent({
	name: "test-component",
	props: {
		on: true,
		count: 0,
	},
	onConstruct: el => {
		// el.on = true;
		
	},
	onConnect: el => {
		// el.setAttribute("car", true);
	},
	// onDisconnect,
	view: el => html`
		<div 
			class="ex" 
			@click=${e => { 
				el.on = !el.on;
				// el.render(); 
			}}>
			${el.on ? "on" : "off"}
			${el.count}
			</div>
	`,
	css: `
		.ex {
			background: blue;
			color: white;
			cursor: pointer;
		}

		.ex:hover {
			opacity: .8;
		}
	`
});
