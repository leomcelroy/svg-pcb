import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { EditorState, StateField } from "@codemirror/state";
import { syntaxTree, indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { pathWidget } from "./pathWidget.js";


class CodeMirror extends HTMLElement {
    constructor() {
        super();
        this.view = undefined;
        this.state = undefined;
    }

    foldRange() {}

    // lifecycle
    connectedCallback() {
        const extensions = [
            basicSetup, 
            javascript(),
            keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
            indentUnit.of("  "),
            pathWidget
            // underlineField,
            // showStripes
            // countDocChanges
        ]

        const state = EditorState.create({ extensions });

        this.view = new EditorView({
          state,
          parent: this
        })
    }
}

window.customElements.define("codemirror-2", CodeMirror);