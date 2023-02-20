import { ViewPlugin, EditorView, Decoration } from "@codemirror/view"
import { StateField, StateEffect, RangeSetBuilder, Facet } from "@codemirror/state"
import { syntaxTree } from "@codemirror/language"


const underlineMark = Decoration.mark({ class: "cm-underline" });

// export const underlineTheme = EditorView.baseTheme({
//   ".cm-underline": { textDecoration: "underline 3px green" }
// });

export const underlineField = EditorView.updateListener.of(v => {
  if (!v.docChanged) return;
  const view = v.view;
  // console.log(view);
  let marks = Decoration.none;
  console.time();
  for (let {from, to} of view.visibleRanges) {
    const tree = syntaxTree(view.state);
    // console.log(tree);
    tree.iterate({
      from, to,
      enter: (node) => {
        // console.log("node", node)
        if (node.name == "CallExpression") {
          const isPath = view.state.doc.sliceString(node.from, node.from+5) == "path(";
          if (!isPath) return;
          // console.log(view.state.doc.sliceString(node.from, node.to))
          // let isTrue = view.state.doc.sliceString(node.from, node.to) == "true"
          // const mark = Decoration.widget({ class: "cm-underline" });
          // underlineMark.range(node.from, node.from+4);
          // marks.push(underlineMark);
          marks = marks.update({
            add: [underlineMark.range(node.from, node.to)]
          })
        }
      }
    })
  }

  console.log(marks);
  EditorView.decorations.from(marks);

  // console.log(Decoration.set(marks));

  console.timeEnd();
  
}) 

export const underlineField2 = StateField.define({
  create() {
    return Decoration.none
  },
  update(underlines, tr) {
    console.time();
    // underlines = Decoration.none;
    console.log(tr.state);
    const tree = syntaxTree(tr.state);
    console.log(tree);
    tree.iterate({
      enter: (node) => {
        if (node.name == "CallExpression") {
          const isPath = tr.state.doc.sliceString(node.from, node.from+4) == "path";
          if (!isPath) return;

          underlines.update({
            add: [ underlineMark.range(node.from, node.from+4) ]
          })

          console.log(tr.state.doc.sliceString(node.from, node.to));
        }
      }
    })
    console.timeEnd();
    console.log(underlines);
    // const str = tr.state.doc.toString();
    // underlines = underlines.map(tr.changes)
    // for (let e of tr.effects) {
    //   if (!Array.isArray(e.value)) return;

    //   e.value.forEach(v => {
    //     const { from, to } = v;
    //     const text = str.slice(from, to);
    //     // console.log(text);
    //     if (text !== "path") return;
    //     underlines = underlines.update({
    //       add: [ underlineMark.range(from, to) ]
    //     })
    //   })
    // }

    return underlines;
  },
  // provide: f => EditorView.decorations.from(f)
});

const stripe = Decoration.line({
  attributes: {class: "cm-zebraStripe"}
})

const stepSize = Facet.define({
  combine: values => values.length ? Math.min(...values) : 2
})

function stripeDeco(view) {
  let step = view.state.facet(stepSize)
  let builder = new RangeSetBuilder()
  for (let {from, to} of view.visibleRanges) {
    for (let pos = from; pos <= to;) {
      let line = view.state.doc.lineAt(pos)
      if ((line.number % step) == 0)
        builder.add(line.from, line.from, stripe)
      pos = line.to + 1
    }
  }
  return builder.finish()
}

export const showStripes = ViewPlugin.fromClass(class {

  constructor(view) {
    this.decorations = stripeDeco(view)
  }

  update(update) {
    if (update.docChanged || update.viewportChanged)
      this.decorations = stripeDeco(update.view)
  }
}, {
  decorations: v => v.decorations
})



const pathMark = Decoration.mark({ class: "cm-underline" });

function pathDeco(view) {
  let builder = new RangeSetBuilder()

  for (let {from, to} of view.visibleRanges) {
    const tree = syntaxTree(view.state);
    const enter = (node) => {
      if (node.name == "CallExpression") {
        const isPath = view.state.doc.sliceString(node.from, node.from+5) == "path(";
        if (!isPath) return;
        builder.add(node.from, node.from+4, pathMark);
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

export const showPathMarks = ViewPlugin.fromClass(class {

  constructor(view) {
    this.decorations = pathDeco(view)
  }

  update(update) {
    if (update.docChanged || update.viewportChanged)
      this.decorations = pathDeco(update.view)
  }
}, {
  decorations: v => v.decorations
})


// selectedPath = {
//   pathStart,
//   pathEnd,
//   str: string.substr(pathStart, pathEnd - pathStart),
// };

// const countDocChanges = StateField.define({
//   create(state) {
//     return 0;
//   },
//   update(value, transaction) {
//     if (transaction.docChanged) {
//       console.log(value, transaction);
//       const { state } = transaction;
//       const ast = syntaxTree(state);
//       return value + 1;
//     } else {
//       return value;
//     }
//   },
//   provide(field) {
//     return [];
//   }
// });