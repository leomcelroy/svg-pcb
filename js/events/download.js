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

export function downloadGerber(state) {
  const layers = state.storedPCB.layers;

  // console.log(layers);
  let str = ''
  str += "%MOIN*%\n" // inch units
  str += "%LPD*%\n" // layer dark
  str += "%FSLAX66Y66*%\n" // format absolute 6.6
  str += "G01*\n" // linear interpolation


  const front_copper = layers["F.Cu"];
  const strs = front_copper.polylines().map( (x) => {
    const { pts } = x;
    let ptsString = pts.reduce((acc, cur, i) => `${acc}X${format(cur.x)}Y${format(cur.y)}D0${i === 0 ? 2 : 1}*\n`, "G36*\n")
    ptsString += "G37*\n";

    return ptsString;
  });

  str += strs.join("") + "M02*";

  downloadText(`${state.name === "" ? "anon" : state.name}.gerber`, str);
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
  var image = canvas.toDataURL();
  // Create a link
  var aDownloadLink = document.createElement('a');
  // Add the name of the file to the link
  aDownloadLink.download = `${name}.png`;
  // Attach the data to the link
  aDownloadLink.href = image;
  // Get the code to click the download link
  aDownloadLink.click();
};
