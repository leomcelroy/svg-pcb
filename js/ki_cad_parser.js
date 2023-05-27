import { MM_PER_INCH } from "./constants.js";
import { sParse } from "./s-expression-parser.js";
import { rectangle, circle } from "/geogram/index.js";


// parser should take units

const convertLayers = (layers) => layers.reduce((acc, cur) => {
  let l = cur.split(".");
  if (l.length === 0) return acc;
  else if (l[0] !== "*") return [...acc, cur];
  else return [...acc, `F.${l[1]}`, `B.${l[1]}`];
}, []);

const getNamedArray = (line, name) => {
  const index = line.findIndex(entry => Array.isArray(entry) && entry[0] === name);
  const value = line[index];

  return value ? value.slice(1) : [];
}

export function kicadToObj(data) {
  let r = sParse(data);

  let scale = 1/MM_PER_INCH;
  const padsToAdd = {};

  for (const line of r) {
    const isPad = line[0] === "pad";
    const isSmd = line[2] === "smd";
    const isThru = line[2] === "thru_hole";
    const shape = line[3];

    if (isPad && (isSmd || isThru)) {
      let name = line[1];

      let at = getNamedArray(line, "at").map(x => Number(x)*scale);
      at[1] = -at[1]; // negative Y axis

      let layers = getNamedArray(line, "layers");
      layers = convertLayers(layers);

      let size = getNamedArray(line, "size").map(x => Number(x)*scale);

      const shapeCases = {
        "rect": () => rectangle(...size),
        "roundrect": () => {
          // let _ = rectangle(...size);
          // roundCorners(_);

          const ratio = Number(getNamedArray(line, "roundrect_rratio")[0]);
          const pts = generateRoundRect(0, 0, ...size, ratio);

          return [ pts ];
        },
        "circle": () => circle(...size.map(x => x/2)),
        "oval": () => circle(...size.map(x => x/2)),
        "custom": () => {
          const primitives = getNamedArray(line, "primitives");

          const poly = primitives[0][1]
            .slice(1)
            .map(
              xy => [ Number(xy[1])*scale, Number(xy[2])*scale ]
            );

          return [ poly ];
        }
        // "ellipse": () => circle(...size), 
      }

      let shapeGeometry = 
        (shape in shapeCases) 
        ? shapeCases[shape]()
        : [];

      const footprint = { 
        pos: at, 
        shape: shapeGeometry, 
        layers 
      }

      const drillIndex = line.findIndex(entry => Array.isArray(entry) && entry[0] === "drill");

      if (drillIndex !== -1) {
        let drillDia = Number(line[drillIndex][1])*scale;
        footprint.drill = {
          diameter: drillDia,
          start: "F.Cu", // this should come from layers
          end: "B.Cu",
          plated: true // hmm how does kicad module do this
        }
      }
     
      if (padsToAdd[name] === undefined) padsToAdd[name] = [footprint];
      else padsToAdd[name].push(footprint);

    }
  }

  let result = Object.entries(padsToAdd).reduce((acc, cur) => {
    const [key, value] = cur;

    if (value.length === 1) {
      acc[key] = value[0];
    } else {
      value.forEach((v, i) => {
        acc[`${key}_${i + 1}`] = v;
      })
    }

    return acc;
  }, {});

  Object.keys(result).forEach(k => {
    let d = "";
    const shape = result[k].shape;
    shape.forEach(s => {
      s.forEach((p, i) => {
        const [ x, y ] = p;
        d += `${i==0 ? "M" : "L"} ${x} ${y} `
      })
      
    })

    result[k].shape = d;
  })

  return result;
}


function generateRoundRect(centerX, centerY, width, height, rratio, numPointsPerCorner=10) {
    // Calculate the radius
    var radius = Math.min(width, height) * rratio / 2;

    // Calculate the corner centers
    var topLeft = [centerX - width/2 + radius, centerY - height/2 + radius];
    var topRight = [centerX + width/2 - radius, centerY - height/2 + radius];
    var bottomRight = [centerX + width/2 - radius, centerY + height/2 - radius];
    var bottomLeft = [centerX - width/2 + radius, centerY + height/2 - radius];

    var points = [];

    // Generate points for each corner, we're using a simple circle equation here.
    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Top left corner
        points.push([topLeft[0] - radius * Math.cos(angle), topLeft[1] - radius * Math.sin(angle)]);
    }

    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Top right corner
        points.push([topRight[0] + radius * Math.sin(angle), topRight[1] - radius * Math.cos(angle)]);
    }

    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Bottom right corner
        points.push([bottomRight[0] + radius * Math.cos(angle), bottomRight[1] + radius * Math.sin(angle)]);
    }

    for (var i = 0; i < numPointsPerCorner; i++) {
        var angle = Math.PI / 2 * i / (numPointsPerCorner - 1);

        // Bottom left corner
        points.push([bottomLeft[0] - radius * Math.sin(angle), bottomLeft[1] + radius * Math.cos(angle)]);
    }

    // Add first point to the end to close the shape
    points.push(points[0]);

    return points;
}



