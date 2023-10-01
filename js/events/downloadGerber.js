import JSZip from "jszip";
import { saveAs } from "file-saver";
import { MM_PER_INCH } from "../constants.js";

// Some things TODO here:
// - Simplify file naming
// - Apperture attributes maybe
// - Silkscreen layers
// - Revisit drills

// This should be a global function
export function inchesToMM(inches){
  return inches * MM_PER_INCH;
}

// This gives full file name according to user selected options
function getFilename(state, layerName){
  const projectName = state.name === "" ? "Untitled" : state.name;
  const useProtel = state.downloadGerberOptions.protelFilenames;

  let fileName = projectName; // This is just the basename

  if (useProtel) 
  {
    switch (layerName) {
    case "F.Cu":
      fileName += "-F_Cu.GTL";
      break;
    case "B.Cu":
      fileName += "-B_Cu.GBL";
      break;
    case "F.Mask":
      fileName += "-F_Mask.GTS";
      break;
    case "B.Mask":
      fileName += "-B_Mask.GBS";
      break;
    case "F.Silkscreen":
      fileName += "-F_Silkscreen.GTO";
      break;
    case "B.Silkscreen":
      fileName += "-B_Silkscreen.GBO";
      break;
    case "Edge.Cuts":
      fileName += "-Edge_Cuts.GM1";
      break;
    case "Drills":
      fileName += "-Drill.XLN";
      break;
    }
  }
  else
  {
    if (layerName == "Drills") {
      fileName += "-" + layerName + ".drl";
    } else {
      fileName += "-" + layerName.replace(".", "_") + ".gbr";  
    }
  }  

  return fileName;
}

export class GerberBuilder {
  #body = '';
  #apertureConter = 10; // 0-9 is reserved in Gerber. Use #getApertureID() not this directly.
  #wireThicknesses = [];
  #fileFunction = "";
  #filePolarity = "";
  
  constructor() {}

  static format(x) {
    // Reduce decimal digits to 6 (0.123456)
    let s = x.toFixed(6);

    // Remove the floating point (0.123456 becomes 0123456)
    s = s.replace(".", ""); 

    // Remove leading zeroes for Gerberization
    while (s.startsWith("0")) {
      s = s.substr(1, s.length);
    }

    // If the value is 0, we want to leave one 0 still.
    if (s === "") {
      s = "0";
    }

    return s;
  }

  #getHeader() {
    let str = '';
    
    // Add a header comment at the top to indicate the generator.
    // This could make use of predefined global constants later.
    str += "%TF.GenerationSoftware,Leo McElroy & Contributors,SvgPcb,v0.1*%\n";

    // Add date and time of generation.
    const dateTime = new Date().toISOString();
    str += "%TF.CreationDate," + dateTime + "*%\n";

    // Same Coordinates
    str += "%TF.SameCoordinates,Original*%\n";

    // File Function
    if (this.#fileFunction !== "") {
      str += "%TF.FileFunction," + this.#fileFunction + "*%\n";
    }

    // File Polarity
    if (this.#filePolarity !== "") {
      str += "%TF.FilePolarity," + this.#filePolarity + "*%\n";
    }

    // It is recommended to use metric. Imperial is there for historic reasons only 
    // and will be deprecated at a future date. Source: Gerber Spec. p. 46.
    str += "%MOMM*%\n";

    // 4 integer digits and 6 decimal digits, borrowed from KiCad gerber export.
    str += "%FSLAX46Y46*%\n";

    return str;
  }

  #getFooter() {
    return "M02*";
  }

  #getComment(comment) {
    return "G04 " + comment + "*\n";
  }

  // Helper function to automate aperture ID counting
  #getApertureID() {
    const apertureID = this.#apertureConter;
    this.#apertureConter++;
    return apertureID;
  }

  // Based on Gerber X2 spec p. 130, very basic implementation here
  // Example: topLayer.setFileFunction("Copper", ["L1", "Top"]);
  setFileFunction(func) {
    this.#fileFunction = func;
  }

  // Set file polarity, has to be negative for solder mask layers
  setFilePolarity(polty) {
    this.#filePolarity = polty;
  }

  plotWires(layer) {
    let wires = [];
    this.#body += this.#getComment("Begin wires");

    layer.map( el => {
      if (el.type !== "wire") return;

      const wireThickness = inchesToMM(el.thickness).toFixed(3);
        
      // Add aperture only if it does not exist yet
      if (!this.#wireThicknesses.includes(wireThickness)) {
        this.#wireThicknesses.push(wireThickness);
        const apertureID = this.#getApertureID();
        this.#body +="%ADD" + apertureID.toString() +  "C," + wireThickness.toString() + "*%\n";
      }

      // Add modified wire object to array
      el.gerberAperture = this.#wireThicknesses.indexOf(wireThickness) + (this.#apertureConter - this.#wireThicknesses.length);
      wires.push(el); 
    });

    // Draw wires
    wires.map( el => {
      // Draw the wire using an aperture
      this.#body += "D" + el.gerberAperture.toString() + "*\n";
      
      el.shape.flat().forEach((pt, i) => {
        const x = this.constructor.format( inchesToMM(pt[0]) );
        const y = this.constructor.format( inchesToMM(pt[1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      });
    });
  } // End of GerberBuilder class

  // Plot pads in a gerber file.
  // This method can be also used to produce solder mask with a certain offset.
  // Offest is defined in mm, 0.1mm for example.
  plotPads(layer, offset = 0) {
    const apertureDiameter = offset ? offset * 2 : 0;
    const apertureID = this.#getApertureID();

    this.#body += this.#getComment("Begin pads");

    // Define aperture
    this.#body += "%ADD" + apertureID.toString() +  "C," + apertureDiameter.toFixed(3) + "*%\n";

     // Select the aperture for drawing the outline
    this.#body += "D" + apertureID.toString() + "*\n";

     // Enable linear interpolation 
    this.#body += "G01*\n";

    // Draw pads as polygons
    layer.map( el => {
      if (el.type === "wire") return;
      this.#body += "G36*\n";
      
      el.flat().forEach((pt, i) => {
        const x = this.constructor.format( inchesToMM(pt[0]) );
        const y = this.constructor.format( inchesToMM(pt[1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      });

      this.#body += "G37*\n";
    });

    // Stop here if offset is 0
    if (offset === 0) return;

    this.#body += this.#getComment("Begin pad offsets");

    // Offset polygon with an outline that is 2x the offset
    layer.map( el => {
      if (el.type === "wire") return;

      el.flat().forEach((pt, i) => {
        const x = this.constructor.format( inchesToMM(pt[0]) );
        const y = this.constructor.format( inchesToMM(pt[1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      });
    });
  }

  plotSilkscreen(layer) {
    console.log(layer);

    this.#body += this.#getComment("Begin silkscreen");

    layer.map( el => {
      // We deal with text only for now
      if (el.type !== "text") return;

      const text = el.value;
      const textSize = inchesToMM(el.size);
      const textPosition = el.translate;
      const textRotation = el.rotation;
      const textFont = "Courier"; // Let's see what we use in SvgPcb currently

      // Generate Gerber X2 text object to maintain text information
      // Gerber Spec p. 147
      this.#body += "%TA.FlashText," + text.replace(/\n/g, "\\n") + ",C,R," + textFont + "," + textSize + ",*%\n"

      // TODO: And now the shapes
      // At the moment it would be possible to do it with SVG.js,
      // but it would be so much easier if SvgPcb would make use of a SVG font,
      // that then could be used to create labels along with other graphics
      // on the silk layer.
    });
  }

  plotOutline(layer) {
    const apertureDiameter = 0.1;
    const apertureID = this.#getApertureID();

    // Define aperture
    this.#body += "%ADD" + apertureID.toString() +  "C," + apertureDiameter.toFixed(3) + "*%\n";

     // Select the aperture for drawing the outline
    this.#body += "D" + apertureID.toString() + "*\n";
    
    // Enable linear interpolation 
    this.#body += "G01*\n";
      
    // Plot outline
    this.#body += this.#getComment("Begin outline");

    // Here we have to deal with array of paths.
    // Each path contains an array of points.
    // For each first point of the path we need to use the D02 or move instruction.
    // So instead of using .flat(), we go nested loops here.
    layer.map( el => {
      el.forEach((path, i) => {
        path.forEach((pt, i) => {
          const x = this.constructor.format( inchesToMM(pt[0]) );
          const y = this.constructor.format( inchesToMM(pt[1]) );
          this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
        });

        // Add a copy of first point to close the shape if needed.
        if (path[0][0] !== path[path.length-1][0] || path[0][1] !== path[path.length-1][1]) {
          const x = this.constructor.format( inchesToMM(path[0][0]) );
          const y = this.constructor.format( inchesToMM(path[0][1]) );
          this.#body += "X" + x + "Y" + y + "D01*\n";
        }
      });
    });
  }

  toString() {
    let str = this.#getHeader();
    str += this.#body;
    str += this.#getFooter();
    return str;
  }
}

class ExcellonBuilder {
  // Excellon file format reference: https://gist.github.com/katyo/5692b935abc085b1037e
  #body = '';
  #toolCounter = 1; // 0 is reserved 
  #state = {};
  
  constructor(state) {
    this.#state = state;
  }

  #getHeader() {
    let str = "M48\n"; // Start of the header
      
    // Add date and time of generation.
    const dateTime = new Date().toISOString();
    str += "; DRILL file {SvgPcb v0.1} date " + dateTime + "\n";
    str += "; FORMAT={-:-/ absolute / " + (this.#state.downloadGerberOptions.excellonMetric ? "metric" : "inch") + " / decimal}\n";
    str += "; #@! TF.CreationDate," + dateTime + "\n";
    str += "; #@! TF.GenerationSoftware,SvgPcb v0.1\n";
    str += "; #@! TF.FileFunction,MixedPlating,1,2\n";
    str += "FMAT,2\n";

    if (this.#state.downloadGerberOptions.excellonMetric) {
      str += "METRIC\n"; 
    } else {
      str += "INCH\n";   
    }

    return str;
  }

  #getFooter() {
    let str = "T0\n";
    str += "M30\n";
    return str;
  }

  // Helper function to automate aperture ID counting
  #getToolID() {
    const toolID = this.#toolCounter;
    this.#toolCounter++;
    return toolID;
  }

  plotDrills(pcb) {
    this.#body += "; #@! TA.AperFunction,Plated,PTH,ComponentDrill\n"; // Borrowed from KiCad export

    // Extract drill positions and sizes
    const drills = pcb
      .components
      .map(comp => comp.drills)
      .flat()
      .map( x => { 
        let center = x.pos;
        let diameter = x.diameter;

        if (this.#state.downloadGerberOptions.excellonMetric) {
          let c = [];
          c[0] = inchesToMM(center[0]);
          c[1] = inchesToMM(center[1]);
          center = c;
          diameter = inchesToMM(x.diameter); // TODO: Is this radius or diameter?
        }
    
        return {
          center, 
          diameter
        };
      });

    // Extract tools and drill points
    const tools = {};
    drills.forEach( ({ diameter, center }) => {
      if (diameter in tools) {
        tools[diameter].drillPoints.push(center); 
      } else {
        tools[diameter] = {};
        tools[diameter].toolID = this.#getToolID();
        tools[diameter].drillPoints = [ center ];
      }
    });

    // Define tools
    for ( const tool in tools ) {
      this.#body += "T" + tools[tool].toolID + "C" + tool + "\n";
    }

    this.#body += "%\n"; // Rewind
    this.#body += "G90\n"; // Absolute mode
    this.#body += "G05\n"; // Drill mode

    // Loop through tools, select them, and drill
    for ( const tool in tools ) {
      this.#body += "T" + tools[tool].toolID + "\n"; // Select tool
      tools[tool].drillPoints.forEach( dp => {
        this.#body += "X" + dp[0].toFixed(3) + "Y" + dp[1].toFixed(3) + "\n";
      });
    }
  }

  toString() {
    let str = this.#getHeader();
    str += this.#body;
    str += this.#getFooter();
    return str;
  }
}

export function downloadGerber(state) {
    const layers = state.pcb.layers;
    const pcb = state.pcb;
  
    var zip = new JSZip();

    // Find the name of the outline layer.
    let outlineLayerName = undefined;
    for (const layerName of state.downloadGerberOptions.layers.keys()) {
      if (
        layerName.toLowerCase().includes("interior") || // Neil's style
        layerName.toLowerCase().includes("edge") || // KiCad
        layerName.toLowerCase().includes("cuts") || // KiCad
        layerName.toLowerCase().includes("outline") || // Someone said on the internet
        layerName.toLowerCase().includes("mechanical") || // Altium style
        layerName.toLowerCase().includes("dimension") // Eagle style
      ) {
        outlineLayerName = layerName;
        break;
      }
    }

    state.downloadGerberOptions.layers.forEach((val, key) => {
      if (!val) return; // If user chooses not to export this layer, we do not process it

      // Do some guesses based on layer name.
      // We need to figure out which of the layers 

      // For copper layers we need to figure out how many there are.
      // If we have only top and bottom, the Gerber FileFunction values can be as follows.
      // - Copper,L1,Top
      // - Copper,L2,Bot
      // For a 4 layer board, things get a bit more complicated.
      // - Copper,L1,Top
      // - Copper,L2,Inr
      // - Copper,L3,Inr
      // - Copper,L4,Bot
      // In order to give the right layer numbers to F.Cu and B.Cu, we need to know total number of layers.
      // For now we support only 2 layers and time will show...

      const layerName = key;

      if (layerName == "F.Cu") 
      {
        const frontCopper = new GerberBuilder();
        frontCopper.setFileFunction("Copper,L1,Top");
        frontCopper.setFilePolarity("Positive");
        frontCopper.plotPads(layers[layerName]);
        frontCopper.plotWires(layers[layerName]);
        if (state.downloadGerberOptions.includeOutline) {
          frontCopper.plotOutline(layers[outlineLayerName]);
        }
        zip.file( getFilename(state, layerName), frontCopper.toString() );  
      } 
      else if (layerName == "B.Cu") 
      {
        const bottomCopper = new GerberBuilder();
        bottomCopper.setFileFunction("Copper,L2,Bot");
        bottomCopper.setFilePolarity("Positive");
        bottomCopper.plotPads(layers[key]);
        bottomCopper.plotWires(layers[key]);
        if (state.downloadGerberOptions.includeOutline) {
          bottomCopper.plotOutline(layers[outlineLayerName]);
        }
        zip.file( getFilename(state, layerName), bottomCopper.toString() );
      }
      else if (layerName == "F.Mask") 
      {
        const frontMask = new GerberBuilder();
        frontMask.setFileFunction("Soldermask,Top");
        frontMask.setFilePolarity("Negative");
        frontMask.plotPads(layers[layerName], 0.1);
        if (state.downloadGerberOptions.includeOutline) {
          frontMask.plotOutline(layers[outlineLayerName]);
        }
        zip.file( getFilename(state, layerName), frontMask.toString() );
      }
      else if (layerName == "B.Mask")
      {
        const bottomMask = new GerberBuilder();
        bottomMask.setFileFunction("Soldermask,Bot");
        bottomMask.setFilePolarity("Negative");
        bottomMask.plotPads(layers[layerName], 0.1);
        if (state.downloadGerberOptions.includeOutline) {
          bottomMask.plotOutline(layers[outlineLayerName]);
        }
        zip.file( getFilename(state, layerName), bottomMask.toString() );
      }
      else if (layerName == "F.Silkscreen") 
      {
        const frontSilkscreen = new GerberBuilder();
        frontSilkscreen.setFileFunction("Legend,Top");
        frontSilkscreen.setFilePolarity("Positive");
        frontSilkscreen.plotSilkscreen(layers[layerName]);
        if (state.downloadGerberOptions.includeOutline) {
          frontSilkscreen.plotOutline(layers[outlineLayerName]);
        }
        zip.file( getFilename(state, layerName), frontSilkscreen.toString() );
      } 
      else if (layerName == "B.Silkscreen") 
      {
        const bottomSilkscreen = new GerberBuilder();
        bottomSilkscreen.setFileFunction("Legend,Top");
        bottomSilkscreen.setFilePolarity("Positive");
        bottomSilkscreen.plotSilkscreen(layers[layerName]);
        if (state.downloadGerberOptions.includeOutline) {
          bottomSilkscreen.plotOutline(layers[outlineLayerName]);
        }
        zip.file( getFilename(state, layerName), bottomSilkscreen.toString() );
      } 
      else if (layerName == outlineLayerName) 
      {
        const outline = new GerberBuilder();
        outline.setFileFunction("Profile,NP"); // P|NP indicates board edge-plated or not. Could be an option in the future.
        outline.plotOutline(layers[layerName]);
        zip.file( getFilename(state, layerName), outline.toString() );
      }

      // And we export drills just like that as they are not part of any layer
      // There is probably no need to include outline in the drill file 
      // even though it could be a gerber file as well. 
      const drills = new ExcellonBuilder(state);
      drills.plotDrills(pcb);
      zip.file( getFilename(state, "Drills"), drills.toString());
    });
    
    zip
      .generateAsync({ type:"blob" })
      .then((content) => {
          // see FileSaver.js
          saveAs(content, `${state.name === "" ? "Untitled" : state.name}-Gerbers.zip`);
      });
  
    // downloadText(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, str);
  }