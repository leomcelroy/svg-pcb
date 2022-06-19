import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

class CodeMirror extends HTMLElement {
    constructor() {
        super();
        this.view = undefined;

    }

    foldRange() {}

    // lifecycle
    connectedCallback() {
        this.view = new EditorView({
          extensions: [
              basicSetup, 
              javascript()
          ],
          parent: this
        })
    }
}

window.customElements.define("codemirror-2", CodeMirror);