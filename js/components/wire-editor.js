import { createComponent, html } from "../createComponent.js";
import { dispatch } from "../dispatch.js";
import { global_state } from "../global_state.js";
import { getFileSection } from "../getFileSection.js"


// should pass selected path as prop

createComponent({
  name: "wire-editor",
  props: {
    wires: [],
  },
  onConstruct: el => {

  },
  css: `
    @import url("../../styles.css");

    .wire-item {
      background: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 5px;
    }

    .wire-item:hover {
      background: #ededeeab;
    }

    .delete-wire {
      color: red;
    }

    .delete-wire:hover {
      color: orange;
      cursor: pointer;
    }

    .thickness-value {
      padding: 3px;
    }

    .thickness-value:hover {
      background: lightgrey;
      cursor: col-resize;
    }

    .wire-selected {
      background: lightblue;
    }

    .wire-list {
      height: 150px;
      min-height: 150px;
      overflow: scroll;
      overflow-x: hidden;
    }
  `,
  view: el => {
    return html`
      <div 
        class="import-button" 
        style="margin: auto; margin-bottom: 5px;"
        @mousedown=${e => {
          const state = global_state;

          global_state.selectedPathIndex = -1;
          global_state.selectedPath = null;

          const string = state.codemirror.view.state.doc.toString();
          const startIndex = getFileSection("ADD_WIRES", string) ?? 0;
          const text = `board.wire(path(), .03);\n`
          state.codemirror.view.dispatch({
            changes: {from: startIndex, insert: text}
          });

          dispatch("RUN");
        }}>add wire (TODO)</div>
      <div class="wire-list">${el.wires.map(drawWire)}</div>
    `
  }
})

function drawWire(w) {
  const { from, to } = w.staticInfo;

  let innerPathSelected = false;

  if (global_state.selectedPathIndex !== -1) {
    const i = global_state.selectedPathIndex;
    const p = global_state.selectablePaths[i];


    if (p) innerPathSelected = isInRange(from, to, p[0]);
  }

  const classes = [
    "wire-item"
  ]

  if (innerPathSelected) classes.push("wire-selected");


  return html`
    <div 
      class=${classes.join(" ")}
      @mousedown=${(e) => {
        if (e.target.matches(".delete-wire")) return;
        // check if there is a path inside the wire range
        // if so select it

        const { from, to } = w.staticInfo;

        global_state.selectablePaths.forEach((p, i) => {
          const pContained = isInRange(from, to, p[0]);
          if (pContained) global_state.selectedPathIndex = i;
        });

        dispatch("RUN");
      }}>
      <b>⚬</b>
      thickness: <span class="thickness-value">${w.thickness}</span>
      <span class="delete-wire" @mousedown=${(e) => {
        const state = global_state;

        const string = state.codemirror.view.state.doc.toString();
        let { from, to } = w.staticInfo;

        if (string[to] === ";") to++;
        if (string[to] === "\n") to++;

        state.codemirror.view.dispatch({
          changes: {from: from - w.rawStaticInfo.functionName.length, to, insert: ""}
        });

        // should be clearSelectedPath
        global_state.selectedPathIndex = -1;
        global_state.selectedPath = null;

        dispatch("RUN");

        e.preventDefault();
      }}>x</span>
    </div>
  `
}

function isInRange(from, to, n) {
    return n >= from && n <= to;
}