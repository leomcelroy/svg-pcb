let count = 0;
function readFileUploadComp(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = event => {
    let text = reader.result;
    dispatch("UPLOAD_COMP", {text, name: `component${count}`});
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
  } else {
    throw Error("Unknown extension:", extension);
  }

};

export function addDropUpload(state, bodyListener) {
  bodyListener("drop", "", function(evt) {    
    let dt = evt.dataTransfer;
    let files = dt.files;

    upload(files);

    pauseEvent(evt);
  });

  bodyListener("dragover", "", function(evt) {    
    pauseEvent(evt);
  });
}