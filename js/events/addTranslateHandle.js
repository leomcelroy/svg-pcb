import esprima from 'https://cdn.skypack.dev/esprima';
import acorn from 'https://cdn.skypack.dev/acorn';
import { generate } from 'https://cdn.skypack.dev/astring';
import { walk } from 'https://cdn.skypack.dev/esprima-walk';

function foldImports(state) {
  const anotherComp = l => l.includes("return kicadToObj(");

  const doc = state.codemirror.view.state.doc;
  const lines = doc.toString().split("\n");
  let i = 0;
  let count = 0;
  while (true) {
    const line = lines[i];
    if (!line) break;
    count += line.length;
    if (i > lines.length) break;
    if (lines[i] === "`)})()" && !anotherComp(lines[i+1])) break;
    i++;
  };

  state.codemirror.foldRange(0, count+i);
}

export function addTranslateHandle(state, svgListener) {
  const svg = document.querySelector("svg");

  let clicked = false;
  let clickedPoint;
  let lastX = 0;
  let lastY = 0;
  let index;

  svgListener("mousedown", ".translate-handle", e => {
    clicked = true;
    state.transforming = true;
    lastX = 0;
    lastY = 0;

    const svgPoint = svg.panZoomParams.svgPoint;
    clickedPoint = svgPoint({x: e.offsetX, y: e.offsetY})

    index = e.target.dataset.index;

    const string = state.codemirror.view.state.doc.toString();
    const stringToParse = `()=>{${string}}`; // remember to subtract 5 from indices
    const esprimaAST = esprima.parseScript(stringToParse, { range: true, comment: true });
    console.log(esprimaAST);
    const mainBody = esprimaAST.body[0].expression.body.body;

    console.log(mainBody);
    let adds = [];
    walk(esprimaAST, node => {
      try {
          if (node.callee.type === "MemberExpression" && node.callee.property.name === "add") adds.push(node.arguments[1]);
      } catch (err) { }
    })
    // sort by first range
    const sortedAdds = adds.sort((a, b) => a.range[0] - b.range[0])
    const sigFigs = num => num.includes(".")
      ? num.split(".")[1].length
      : num.length;

    const round = (num, sigFigs) => Math.round(num*10**sigFigs)/(10**sigFigs);
    const isDigit = (ch) => /[0-9]/i.test(ch) || ch === ".";

    // const comp = state.storedPCB.components[index];

    state.transformUpdate = (x, y) => {

      const changes = [];

      sortedAdds[index].properties.forEach( prop => {
        if (prop.key.name !== "translate") return;
        // prop.value.elements = [
        //   {type: 'Literal', value: round(x + comp.posX), raw: `${round(x + comp.posX)}`},
        //   {type: 'Literal', value: round(y + comp.posY), raw: `${round(y + comp.posY)}`}
        // ]

        const [ xNode, yNode ] = prop.value.elements;

        let xChanged = false;
        walk(xNode, n => {
          if (xChanged) return;
          if (n.type === "Literal" && typeof n.value === "number") {
            if (!n.ogValue) n.ogValue = n.value;
            if (!n.ogRaw) n.ogRaw = n.raw;

            let newNum = n.ogValue + x;

            changes.push({ 
              from: n.range[0] - 5, 
              to: n.range[1] - 5,
              insert: `${round(newNum, sigFigs(n.ogRaw))}` 
            });

            xChanged = true;
          }
        })

        let yChanged = false;
        walk(yNode, n => {
          if (yChanged) return;
          if (n.type === "Literal" && typeof n.value === "number") {
            if (!n.ogValue) n.ogValue = n.value;
            if (!n.ogRaw) n.ogRaw = n.raw;

            let newNum = n.ogValue + y;

            changes.push({ 
              from: n.range[0] - 5, 
              to: n.range[1] - 5,
              insert: `${round(newNum, sigFigs(n.ogRaw))}` 
            });
            yChanged = true;
          }
        })

        const currentString = state.codemirror.view.state.doc.toString();

        state.codemirror.view.dispatch({
          changes: { from: 0, to: currentString.length, insert: string }
        });

        state.codemirror.view.dispatch({ changes });
      })

      foldImports(state);

    }

    // pauseEvent(e);
  })

  svgListener("mousemove", "", e => {
    if (!clicked) return;

    const svgPoint = svg.panZoomParams.svgPoint;
    const currentPoint = svgPoint({x: e.offsetX, y: e.offsetY})
    const x = currentPoint.x - clickedPoint.x;
    const y = currentPoint.y - clickedPoint.y;
    // dispatch("TRANSLATE", { x: x - lastX, y: y - lastY, index });
    dispatch("TRANSLATE", { x, y, index });
    lastX = x;
    lastY = y;
    // pauseEvent(e);
  })

  svgListener("mouseup", "", e => {
    clicked = false;
    state.transforming = false;
  })

  svgListener("mouseleave", "", e => {
    clicked = false;
    state.transforming = false;
  })
}