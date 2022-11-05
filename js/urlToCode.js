import { dispatch } from "./dispatch.js";

export async function urlToCode(file_url, state) {
  const file = await fetch(file_url,  { mode: 'cors' });
  const txt = await file.text();

  state.codemirror.view.dispatch({
    changes: { from: 0, insert: txt }
  });

    // fold imports
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

  dispatch("RUN");
  document.querySelector(".center-button").click();
}