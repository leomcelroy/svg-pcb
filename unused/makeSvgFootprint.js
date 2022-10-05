function makeSvgFootprint(footprintObj) {

  let svg = "";

  for (const padName in footprintObj) {
    const pad = footprintObj[padName];

    if (!pad.layers.includes("F.Cu")) continue;

    const [ dx, dy ] = pad.pos;

    svg += `<path d="${pad.shape}" style="transform: translate(${dx}px, ${dy}px);"></path>`
  }


  return `<g>${svg}</g>`;

}