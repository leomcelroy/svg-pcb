import { createComponent, html } from "../createComponent.js";
import { pathMatchesSelector } from "../pathMatchesSelector.js";
import { global_state } from "../global_state.js";

createComponent({
	name: "netlist-editor",
	props: {
		show: true,
		pcb: null,
		idToName: {},
		fromComponent: {},
		toComponent: {},
		fromPad: "",
		toPad: "",
	},
	// onAttributeChange: (el, name, value) => {
	// 	if (name === "pcb" && value) {
	// 		value.components.forEach(c => {
	// 			console.log(c);
	// 			const id = c.id;
	// 			const varName = el.idToName[id];
	// 			console.log(c, varName);
	// 		})
	// 	}
	// },
	onConstruct: el => {
		// el.on = true;
		window.addEventListener("click", e => {
			if (el.show && !pathMatchesSelector(e, "netlist-editor, .import-button")) {
				el.show = false;
			}
		})
	},
	onConnect: el => {
		// el.setAttribute("car", true);
		console.log(el.show);
	},
	// onDisconnect,
	css: `
		main {
			width: 65%;
			height: 60%;
			position: absolute;
			left: 50%;
			top: 10%;
			transform: translate(-50%, 0);
			background: var(--lightgrey-0);
			z-index: 9999;
			display: flex;
			flex-direction: column;
			padding: 10px;
			border-radius: 5px;
			border: 2px solid black;
			align-items: center
		}

		.hidden {
			display: none;
		}

		.cols-container {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 80%;
		}

		.cols {
			display: flex;
			flex: 1;
		}

		.cols > * {
			flex: 1;
			border: 1px solid black;
			text-align: center;
		}

		.inputs-container {
			display: flex;
			height: 30px;
		}

		.input-container {
			flex: 1;
			border: 1px solid black;
			text-align: center;
			display: flex;
			align-items: center;
    		justify-content: center;
    		padding: 1px;
		}

		.input-container > * {
			width: 80%;
			height: 95%;
			box-sizing: border-box;
		}


		.cols-header {
			border-bottom: 1px dashed black;
		}

		.add-route {
			margin: 10px;
			width: 50%;
		}
	`,
	view: el => {

    // console.log(el.fromComponent, el.fromPad, el.toComponent, el.toPad);

		return html`
			<main class=${[el.show ? "" : "hidden"].join(" ")}>
				<div>net list editor</div>
				<div class="cols-container">
					<div class="cols">
						<div>
							<div class="cols-header">from component</div>
						</div>
						<div>
							<div class="cols-header">from pad</div>
						</div>
						<div>
							<div class="cols-header">to component</div>
						</div>
						<div>
							<div class="cols-header">to pad</div>
						</div>
					</div>
					<div class="inputs-container">
						<div class="input-container">
							<select id="dropdownMenu" @change=${e => {
								const id = e.target.value;
								const comp = el.pcb.components.filter(c => c.id === id)[0];
								el.fromComponent = comp;
							}}>
                <option value="" disabled selected>Select an option</option>
								${Object.entries(el.idToName).map(([ key, value ]) => html`<option value="${key}">${value}</option>`)}
							</select>
						</div>
						<div class="input-container">
							<select id="dropdownMenu" @change=${e => {
								el.fromPad = e.target.value;
							}}>
                <option value="" disabled selected>Select an option</option>
								${Object.keys(el?.fromComponent?.pads ?? []).map(x => html`<option value="${x}">${x}</option>`)}
							</select>
						</div>

						<div class="input-container">
							<select id="dropdownMenu" @change=${e => {
								const id = e.target.value;
								const comp = el.pcb.components.filter(c => c.id === id)[0];
								el.toComponent = comp;
							}}>
                <option value="" disabled selected>Select an option</option>
								${Object.entries(el.idToName).map(([ key, value ]) => html`<option value="${key}">${value}</option>`)}
							</select>
						</div>
						<div class="input-container">
							<select id="dropdownMenu" @change=${e => {
								el.toPad = e.target.value;
							}}>
                <option value="" disabled selected>Select an option</option>
								${Object.keys(el?.toComponent?.pads ?? []).map(x => html`<option value="${x}">${x}</option>`)}
							</select>
						</div>
					</div>
				</div>
				<button class="add-route" @click=${e => {
					const [ fromName, toName ] = [el.fromComponent, el.toComponent].map(x => el.idToName[x.id]);
					console.log(fromName, toName, el.fromPad, el.toPad);
				}}>add</button>
			</main>
		`
	}
});


