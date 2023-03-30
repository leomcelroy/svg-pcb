import { dispatch } from "../dispatch.js";
import { flattenSVG } from 'flatten-svg';

let count = 0;

function readFileUploadComp(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = event => {
    let text = reader.result;
    dispatch("UPLOAD_COMP", { text, name: `component${count}` });
    count++;
  };
}

function readFileJS(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = event => {
    let text = reader.result;
    dispatch("UPLOAD_JS", { text });
  };
}

function upload(files, extensions = []) {
  let file = files[0];
  let fileName = file.name.split(".");
  let name = fileName[0];
  const extension = fileName[fileName.length - 1];

  // if (extensions.length > 0 && !extensions.includes(extension)) throw "Extension not recongized: " + fileName;
  
  // TODO: if js then drop and run
  // TODO: if kicad mod readFile as is
  if (extension === "kicad_mod") {
    readFileUploadComp(file);
  } else if (extension === "js") {
    readFileJS(file);
  } else if (extension === "svg") {
    readFileSVG(file);
  } else {
    throw Error("Unknown extension:", extension);
  }

};

const round = n => Math.round(n*1000)/1000;

function makePathData(pl) {
  let str = "";

  pl.points.forEach((pt, i) => {
    if (i === 0) str += `M${round(pt[0])},${-round(pt[1])}`;
    else str += `L${round(pt[0])},${-round(pt[1])}`;
  })

  return str;
}

function readFileSVG(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = event => {
    let text = reader.result;

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    // const window = new Window
    // window.document.documentElement.innerHTML = text;
    // const svg = window.document.documentElement;

    // text = text.replace(/<\?xml.*>\n/g, "");
    // const div = document.createElement("div");
    // div.innerHTML = text;

    const pls = flattenSVG(svg, { maxError: 0.001 });

    const newComponent = {};

    pls.forEach((pl, i) => {
      newComponent[i] = {
        shape: makePathData(pl),
        "pos":[ 0, 0 ],
        "layers": [ "F.Cu" ],
        // index ?
      }
    })
    dispatch("UPLOAD_COMP_OBJ", { obj: newComponent });
  };

}

export function addDropUpload(state, bodyListener) {
  bodyListener("drop", "", function(evt) {    
    let dt = evt.dataTransfer;
    let files = dt.files;

    document.querySelector(".drop-modal").classList.add("hidden");   

    upload(files);

    pauseEvent(evt);
  });

  bodyListener("dragover", "", function(evt) {
    document.querySelector(".drop-modal").classList.remove("hidden");   
    pauseEvent(evt);
  });

  bodyListener("mouseleave", "", function(evt) {
    document.querySelector(".drop-modal").classList.add("hidden");   
  });
}