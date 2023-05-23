import { hersheyFontMed } from "./hersheyFontMed.js";
import font2 from "./font2.js";
import { pathD, translate, height, scale, width as getWidth, getPathData } from "../../geogram/index.js";

const DEFAULT_SIZE = 0.04;
let lastSize = DEFAULT_SIZE;

const font = {};
makeFont(DEFAULT_SIZE);

function makeFont(size) {
  for (const char in font2) {
    const { width, d } = font2[char];
    const pls = pathD([], d);
    const scaleFactor = size;
    scale(pls, [scaleFactor, -scaleFactor], [0, 0]);
    translate(pls, [0, size]);
    font[char] = {
      width: width/1.3*scaleFactor,
      d: (pls.length !== 0) ? getPathData(pls) : ""
    }
  }
}

export function createText(txt, options = {}) {
  const size = options.size ?? DEFAULT_SIZE;
  if (size !== lastSize) makeFont(size);
  lastSize = size;
  const layers = options.layers ?? [ "F.Silkscreen" ];

  const footprint = {};

//   {
//   padName: {
//     pos: [0, 0],
//     shape: "pathDataString",
//     layers: ["F.Cu", "B.Cu", "F.Mask", "B.Mask"],
//     drill: {
//       diameter: 0.02, // or radius
//       start: "F.Cu",
//       end: "B.Cu",
//       plated: false
//     },
//     index: 1,
//     // solder_mask_margin
//     // solderMaskMargin
//     // maskMargin: 0
//     // maskOffset: .03 // if not present then cover or if mask is in layer
//   }
// }

  let x = 0;
  txt.split("").forEach( (char, i) => {
    footprint[i] = {
      pos: [x, 0],
      shape: font[char].d, // need to scale this down
      layers,
      index: i
    }

    x += Number(font[char]["width"]);
  })

  return footprint;
}




