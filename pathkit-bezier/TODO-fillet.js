
export function path(...cmds) {
  const { cubics, filletsAndChamfers } = pathToCubics(cmds);
  let pts = [];
  const resolution = 30;

  const toFilletAndChamfer = [];

  for (let i = 0; i < cubics.length; i++) {
    const cubic = cubics[i];
    if (i === 0) pts.push(cubic[0]);

    const lower = pts.length - 1;

    pts.push(...bezier(cubic, resolution).slice(1));

    const chopIt = info => {
      if (info.cubicIndex !== i) return; // if it's not the cubic to fillet return
      if (i === cubics.length - 1) return; // if it's the last return
      
      info.ptIndex = pts.length - 1;
      info.lowerIndex = lower;
      info.upperIndex = info.ptIndex + bezier(cubics[i+1], resolution).length - 1;
      toFilletAndChamfer.push(info);
    }

    filletsAndChamfers.forEach(chopIt);
  }

  let added = 0;

  toFilletAndChamfer.forEach(fillet => {
    if (fillet.radius <= 0) return;

    // don't support bezier fillets yet
    if (fillet.upperIndex - fillet.lowerIndex > 2) return;

    let lowerCount = -1;
    let upperCount = 1;
    lowerCount = Math.max(lowerCount, fillet.lowerIndex - fillet.ptIndex);
    upperCount = Math.min(upperCount, fillet.upperIndex - fillet.ptIndex);
    if (lowerCount >= upperCount) return;

    const index = fillet.ptIndex + added;
    const pt = pts[index];
    const prevPt = pts[index + lowerCount];
    const nextPt = pts[index + upperCount];

    // let newPts = null;
    // this should use the points near the prevPt and nextPt
    // should take two lines and the target radius
    const newPts = getStartEndCenter(prevPt, pt, nextPt, fillet.radius);

    if (newPts) {
      const [ start, end, center ] = newPts;
   
      const startIndex = index+lowerCount+1;
      const endIndex = index+upperCount;

      const toAdd = fillet.type === "fillet"
        ? bezier(arcToCubic(start, end, center), resolution)
        : [start, end]; // it's a "chamfer"
     

       pts = [
        ...pts.slice(0, startIndex),
        ...toAdd,
        ...pts.slice(endIndex)
      ]

      added += toAdd.length - (upperCount - lowerCount - 1);
    }

  });


  return pts;
}