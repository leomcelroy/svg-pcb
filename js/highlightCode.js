import { Decoration, ViewPlugin, ViewUpdate } from "@codemirror/view";

import { global_state } from "./global_state.js";


export function highlightCode(from, to) {
  const cm = global_state.codemirror;

  const { view } = cm;

  
  const highlightPlugin = ViewPlugin.define(() => ({
      decorations: Decoration.set.of([Decoration.mark({
          from: 0, 
          to: 18, 
          class: "highlight"
      })])
  }), {
      decorations: v => v.decorations
  });
  
  // Update the state with the plugin
  view.setState(view.state.update({
      effects: highlightPlugin.reconfigure([highlightPlugin])
  }));

  console.log("highlight", from, to);
}