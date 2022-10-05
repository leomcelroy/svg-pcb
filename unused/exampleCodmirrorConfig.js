// import { indentMore, indentLess } from "@codemirror/commands";
// import { javascript } from "@codemirror/lang-javascript";
// import { EditorView, keymap, highlightSpecialChars, drawSelection, highlightActiveLine } from "@codemirror/view";
// import { EditorState } from "@codemirror/state";
// import { history, historyKeymap } from "@codemirror/history";
// import { foldGutter, foldRange } from "@codemirror/fold";
// import { indentOnInput } from "@codemirror/language";
// import { lineNumbers } from "@codemirror/gutter";
// import { bracketMatching } from "@codemirror/matchbrackets";
// import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets";
// import { highlightSelectionMatches, selectNextOccurrence } from "@codemirror/search";
// import { commentKeymap } from "@codemirror/comment";
// import { rectangularSelection } from "@codemirror/rectangular-selection";
// import { defaultHighlightStyle } from "@codemirror/highlight";
// import { defaultKeymap } from "@codemirror/commands";
// // import { basicSetup } from "@codemirror/basic-setup"
// const tabBinding = { key: "Tab", run: indentMore, shift: indentLess };
// const cmdD = { key: "Mod-d", run: selectNextOccurrence, preventDefault: true };
// const km = keymap.of([
//     ...closeBracketsKeymap,
//     ...defaultKeymap,
//     // ...searchKeymap,
//     ...historyKeymap,
//     ...commentKeymap,
//     tabBinding,
//     cmdD
// ]);
// const setup = [
//     lineNumbers(),
//     highlightSpecialChars(),
//     history(),
//     foldGutter(),
//     drawSelection(),
//     EditorState.allowMultipleSelections.of(true),
//     indentOnInput(),
//     defaultHighlightStyle.fallback,
//     bracketMatching(),
//     closeBrackets(),
//     rectangularSelection(),
//     highlightActiveLine(),
//     highlightSelectionMatches(),
//     km
// ];
// class CodeMirror extends HTMLElement {
//     constructor() {
//         super();
//         this.state = undefined;
//         this.view = undefined;
//         this.foldRange = undefined;
//         // properties
//         // this.attachShadow({ mode: "open" });
//     }
//     // lifecycle
//     connectedCallback() {
//         const initState = EditorState.create({
//             doc: ``,
//             extensions: [
//                 setup,
//                 javascript(),
//             ]
//         });
//         this.view = new EditorView({ state: initState, parent: this });
//         this.foldRange = foldRange(this.view);
//     }
// }

// window.customElements.define("code-mirror", CodeMirror);

