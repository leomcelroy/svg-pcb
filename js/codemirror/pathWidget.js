import { ViewPlugin, Decoration } from "@codemirror/view"
import { RangeSetBuilder } from "@codemirror/state"
import { syntaxTree } from "@codemirror/language"



function pathDeco(view) {
  let builder = new RangeSetBuilder()

  for (let {from, to} of view.visibleRanges) {
    const tree = syntaxTree(view.state);
    const enter = (node) => {
      if (node.name == "CallExpression") {
        const isPath = view.state.doc.sliceString(node.from, node.from+5) == "path(";
        if (!isPath) return;
        const start = node.from;
        node.next();
        node.next();

        // need some other way to identify path triggers
        const pathMark = Decoration.mark({ 
          attributes: {
            "data-path-start": node.from,
          },
          class: "cm-path-button" 
        });
        builder.add(start, start+4, pathMark);
      }
    }

    const iterateOps = {
      from, 
      to,
      enter
    }

    tree.iterate(iterateOps);
  }

  return builder.finish()
}

export const pathWidget = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = pathDeco(view);
    this.initialized = false;
  }

  update(update) {
    if (update.docChanged || update.viewportChanged || this.initialized === false) {
      this.decorations = pathDeco(update.view);
      this.initialized = true;
    }
  }
}, {
  decorations: v => v.decorations
})




