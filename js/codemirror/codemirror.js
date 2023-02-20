import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { EditorState, StateField } from "@codemirror/state";
import { syntaxTree, indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { pathWidget } from "./pathWidget.js";
import { vim } from "@replit/codemirror-vim"


export function initCodeMirror(el, vimMode = false) {

    const keybindings = vimMode ? vim() : keymap.of([indentWithTab]);
    const extensions = [
        basicSetup, 
        javascript(),
        keybindings,
        indentUnit.of("  "),
        pathWidget
        // countDocChanges
    ]

    const state = EditorState.create({ extensions });

    const view = new EditorView({
      state,
      parent: el
    })

    return {
        state, 
        view,
        foldRange() {}
    }
}
