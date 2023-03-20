import { changeDpiDataUrl } from "./changeDPI.js";
import { offset2 } from "../../geogram/index.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";


export function downloadSVG(state) {
  const svgUrl = makeSVG(state);
  // make download link
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = `${state.name === "" ? "anon" : state.name}.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // clean up
  document.body.removeChild(downloadLink);
}

function makeSVG(state) {
  const serializer = new XMLSerializer();
  const svg = document.querySelector("svg").cloneNode(true);
  const toRemove = svg.querySelectorAll(".no-download");
  for (const item of toRemove) {
    item.remove();
  }

  const tg = svg.querySelector(".transform-group");
  // tg.style.background = "black"; // TODO
  /*
    add limits
    rect with stroke = none, fill = background
    <rect class="limits no-download" stroke="black" fill="transparent" stroke-width="1" vector-effect="non-scaling-stroke" width="2.7" height="1.4000000000000001" transform="translate(-0.1, -0.1)"></rect>
  */
  tg.style.transformOrigin = "";
  tg.style.transform = "";
  //const sg = svg.querySelector(".transform-group");
  //sg.setAttribute("transform", "scale(1, -1)");
  //tg.transform = "scale(1, -1)";
  // tg.style.transformOrigin = `${0}px ${0}px`;
  // tg.style.transform = "translate(" + 0 + "px, " + 0 + "px) scale(" + 1 + ")";

  const width = (state.limits.x[1] - state.limits.x[0]);
  const height = (state.limits.y[1] - state.limits.y[0]);

  tg.setAttribute("transform", `scale(1, -1) translate(0, ${-(state.limits.y[0]+state.limits.y[1])})`);
  svg.setAttribute("style", "");
  svg.setAttribute("width", `${width*state.mm_per_unit}mm`);
  svg.setAttribute("height", `${height*state.mm_per_unit}mm`);
  svg.setAttribute("viewBox", `${state.limits.x[0]} ${state.limits.y[0]} ${width} ${height}`);
  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  const source = serializer.serializeToString(svg);
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  
  return svgUrl;
}

function format(x) {
  var s = x.toFixed(6)
  s = s.substr(0,s.length-7)+s.substr(-6,6)
  return s;
}

export function exportGerber(state) {
  alert("Exporting Gerber!");
}

export function downloadGerber(state) {
  const layers = state.pcb.layers;

  const expandWire = w => offset2(
    w.shape, 
    w.thickness/2, 
    {
      endType: "etOpenRound", 
      jointType:"jtRound", 
    }
  );

  // this is a list of polylines
  const frontCopper = layers["F.Cu"].map( x => {
    if (x.type === "wire") return expandWire(x);
    else return x;
  }).flat();

  const drill = (layers["drill"] ? layers["drill"] : []).flat().map( x => {

    const getCenter = (pts) => {
      let totalX = 0;
      let totalY = 0;
      pts.forEach(pt => {
        totalX += pt[0];
        totalY += pt[1];
      })

      return [ totalX/pts.length, totalY/pts.length ];
    }

    const getDistance = (pt0, pt1) => Math.sqrt((pt1[0] - pt0[0])**2+(pt1[1] - pt0[1])**2);

    const center = getCenter(x);
    const dist = Math.round(1000*x.reduce((acc, cur) => acc + getDistance(center, cur), 0)/x.length)/1000;

    return {
      center, 
      dist
    };
  });

  const interior = layers["interior"].map( x => {
    return x;
  }).flat();;

  console.log({
    drill,
    frontCopper,
    interior
  })

  const makeFile = (layer) => {
    let str = ''
    str += "%MOIN*%\n" // inch units
    str += "%LPD*%\n" // layer dark
    str += "%FSLAX66Y66*%\n" // format absolute 6.6
    str += "G01*\n" // linear interpolation

    const strs = layer.map( pts => {
      let ptsString = pts.reduce((acc, cur, i) => `${acc}X${format(cur[0])}Y${format(cur[1])}D0${i === 0 ? 2 : 1}*\n`, "G36*\n")
      ptsString += "G37*\n";

      return ptsString;
    });

    str += strs.join("") + "M02*";

    return str;
  }

  const makeFileDrill = (drills) => {
    const tools = {};
    drills.forEach( ({ dist, center }) => {
      if (dist in tools) {
        tools[dist].push(center);
      } else {
        tools[dist] = [ center ];
      }
    })

    let str = "";
    str += "M48\n" // start of header
    str += "INCH,LZ\n" // inch units with leading zeros
    str += "VER,1\n" // version 1
    str += "FMAT,2\n" // format 2
    for (const tool in tools) {
      str += 'T'+ tool + 'C'+ tool + "\n"; // +'C'+tool+"\n" // define tools
    }
    str += "M95\n" // end of header
    str += "G05\n" // drill mode
    for (const tool in tools) {
       str += 'T'+tool+'\n' // tool selection
       for (var i = 0; i < tools[tool].length; i++) {
          const hole = tools[tool][i];
          str += 'X'+format(hole[0])+'Y'+format(hole[1])+'\n'
       }
    }
    
    str += "M30\n" // end of program

    return str;
  }
  

  var zip = new JSZip();
  zip.file(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, makeFile(frontCopper));
  zip.file(`${state.name === "" ? "anon" : state.name}-Edge_Cuts.gbr`, makeFile(interior));
  zip.file(`${state.name === "" ? "anon" : state.name}-Drill.xln`, makeFileDrill(drill));

  zip
    .generateAsync({ type:"blob" })
    .then((content) => {
        // see FileSaver.js
        saveAs(content, `${state.name === "" ? "anon" : state.name}-gerber.zip`);
    });

  // downloadText(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, str);
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}

export function downloadPNG(state, dpi = 1000) {
  const src = makeSVG(state);

  var units = 25.4;

  const w = (state.limits.x[1] - state.limits.x[0])*state.mm_per_unit;
  const h = (state.limits.y[1] - state.limits.y[0])*state.mm_per_unit;
  var width = dpi*w/units;
  var height = dpi*h/units;

  var img = new Image()
  img.width = width;
  img.height = height;
  img.setAttribute("src", src)
  img.onload = function() {
    const canvas = document.createElement("canvas");
    // const pixels = width+' x '+height+" (pixels)";
    // const inches = (width/dpi).toFixed(3)+' x '+(height/dpi).toFixed(3)+" (inches)";
    // const mm = (25.4*width/dpi).toFixed(3)+' x '+(25.4*height/dpi).toFixed(3)+" (mm)";
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,width,height);
    ctx.drawImage(img,0,0,width,height);
    const imageData = ctx.getImageData(0, 0, width, height);
    dlCanvas(canvas, `${state.name === "" ? "anon" : state.name}`);
  }
}

function dlCanvas(canvas, name) {
  // Convert the canvas to data
  var image = canvas.toDataURL("image/png");
  image = changeDpiDataUrl(image, 1000);
  // Create a link
  var aDownloadLink = document.createElement('a');
  // Add the name of the file to the link
  aDownloadLink.download = `${name}.png`;
  // Attach the data to the link
  aDownloadLink.href = image;
  // Get the code to click the download link
  aDownloadLink.click();
};
