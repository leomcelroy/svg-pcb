import { ClipperLib } from "./libs/clipper_unminified.js";

export function boolean(subjectPaths, clipPaths, type) {

  const toClipperFormat = pl => pl.map( 
    ({ x, y }) => ({ X:x, Y:y }) 
  )

  const fromClipperFormat = pl => pl.map( 
    ({ X, Y }) => ({ x:X, y:Y }) 
  )

  const subjectClosed = true;
  const clipClosed = true;

  const tempSubjectPaths = subjectPaths.map(toClipperFormat);
  clipPaths = clipPaths.map(toClipperFormat);

  const result = new ClipperLib.Paths();
  const clipper = new ClipperLib.Clipper();

  clipper.AddPaths(tempSubjectPaths, ClipperLib.PolyType.ptSubject, subjectClosed);
  clipper.AddPaths(clipPaths, ClipperLib.PolyType.ptClip, clipClosed);

  const clipTypes = {
    "intersection": ClipperLib.ClipType.ctIntersection,
    "union": ClipperLib.ClipType.ctUnion,
    "difference": ClipperLib.ClipType.ctDifference,
    "xor": ClipperLib.ClipType.ctXor,
  }
  clipper.Execute(clipTypes[type], result);

  const final = result.map(fromClipperFormat);

  while (subjectPaths.length > final.length) subjectPaths.pop();

  final.forEach((pl, i) =>  {
    subjectPaths[i] = pl;

    subjectPaths[i].push({
      x: pl[0].x,
      y: pl[0].y,
    })
    
  });

  return subjectPaths;
}