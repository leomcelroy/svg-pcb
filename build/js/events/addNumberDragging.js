const isDigit = (ch, left = false) => /[0-9]/i.test(ch) || ch === "." || (left && ch === "-");

export function addNumberDragging(state, bodyListener) {
  let dragged = false;
  let num, pos_start, pos_end, sigFigs, usePrecision, selectedText;

  bodyListener("mousedown", ".ͼb", e => {
    const cm = document.querySelector("code-mirror");

    const s = cm.view.state;
    const doc = s.doc;
    const pos = s.selection.main.head;
    const at = doc.lineAt(pos);

    let { from, to, text} = doc.lineAt(pos)
    let start = pos, end = pos;
    // console.log("start", start, text[start - from - 1], "end", end, text[end - from]);
    while (start > from && isDigit(text[start - from - 1], true)) start--
    while (end < to && isDigit(text[end - from])) end++


    selectedText = text.slice(start-from, end-from);

    num = Number(selectedText);
    dragged = true;
    pos_start = start;
    pos_end = end;
    usePrecision = selectedText.includes(".");
    sigFigs = selectedText.includes(".") ? selectedText.split(".")[1].length : 1;
  })

  bodyListener("mousemove", "", e => {
    if (!dragged) return;
    const cm = document.querySelector("code-mirror");

		const sign = 0 > e.movementX ? 1 : -1;
		// console.log(sign, e.movementX);
		const oldValue = `${num}`;
		if (usePrecision) {
			let rounded = Math.round(num*10**sigFigs);
			let newNum = rounded + e.movementX;
			newNum = Math.round(newNum)/(10**sigFigs);

			num = newNum;    
		} else {
			num += e.movementX;
		}

		const newValue = `${num}`;
		cm.view.dispatch({
			changes: {from: pos_start, to: pos_start + selectedText.length, insert: newValue}
		});

		selectedText = newValue;

		dispatch("RUN");
		pauseEvent(e);
  })

  bodyListener("mouseup", "", e => {
    dragged = false;
  })
}