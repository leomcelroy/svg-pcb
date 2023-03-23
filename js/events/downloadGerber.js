import JSZip from "jszip";
import { saveAs } from "file-saver";
import { global_state } from "../global_state.js";

// Some Gerber tips.
// Include outline in all layers to avoid align issues.
// Use flashed pads wherever possible.
// X2 Attributes (meta information):
// %TF.FileFunction,Soldermask,Top*% (TODO)
// Gerber files containing attribute commands (TF, TA, TO, TD) are called Gerber X2 files
// We want Gerber X2 (at least) out of the box.

// This should be a global function
function inchesToMM(inches){
  return inches * 25.4;
}

// This is here only for the drills implementation
function format(x) {
  // Reduce decimal digits to 6 (0.123456)
  let s = x.toFixed(6);

  // Remove the floating point (0.123456 becomes 0123456)
  s = s.replace(".", ""); 

  // Remove leading zeroes for Gerberization
  while (s.startsWith("0")) {
    s = s.substr(1, s.length);
  }

  return s;
}

class GerberBuilder {
  #body = '';
  #apertureConter = 10; // 0-9 is reserved in Gerber. Use #getApertureID() not this directly.
  #wireThicknesses = [];
  
  constructor() {}

  #format(x) {
    // Reduce decimal digits to 6 (0.123456)
    let s = x.toFixed(6);

    // Remove the floating point (0.123456 becomes 0123456)
    s = s.replace(".", ""); 

    // Remove leading zeroes for Gerberization
    while (s.startsWith("0")) {
      s = s.substr(1, s.length);
    }

    return s;
  }

  #getHeader() {
    let str = '';
      
    // Add date and time of generation.
    const dateTime = new Date().toISOString();
    str += "%TF.CreationDate," + dateTime + "*%\n";

    // Add a header comment at the top to indicate the generator.
    // This could make use of predefined global constants later.
    str += "%TF.GenerationSoftware,Leo McElroy & Contributors,SvgPcb,v0.1*%\n";

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
      for (let i = 0; i < el.shape[0].length; i++) {
        const x = this.#format( inchesToMM(el.shape[0][i][0]) );
        const y = this.#format( inchesToMM(el.shape[0][i][1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      }
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
      for (let i = 0; i < el[0].length; i++) {
        const x = this.#format( inchesToMM(el[0][i][0]) );
        const y = this.#format( inchesToMM(el[0][i][1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      }
      this.#body += "G37*\n";
    });

    // Stop here if offset is 0
    if (offset === 0) return;

    this.#body += this.#getComment("Begin pad offsets");

    // Offset polygon with an outline that is 2x the offset
    layer.map( el => {
      if (el.type === "wire") return;
      for (let i = 0; i < el[0].length; i++) {
        const x = this.#format( inchesToMM(el[0][i][0]) );
        const y = this.#format( inchesToMM(el[0][i][1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      }
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

    layer.map( el => {
      for (let i = 0; i < el[0].length; i++) {
        const x = this.#format( inchesToMM(el[0][i][0]) );
        const y = this.#format( inchesToMM(el[0][i][1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      }
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
  
  constructor() {}

  #getHeader() {
    let str = "M48\n"; // Start of the header
      
    // Add date and time of generation.
    const dateTime = new Date().toISOString();
    str += "; DRILL file {SvgPcb v0.1} date " + dateTime + "\n";
    str += "; FORMAT={-:-/ absolute / inch / decimal}\n";
    str += "; #@! TF.CreationDate," + dateTime + "\n";
    str += "; #@! TF.GenerationSoftware,SvgPcb v0.1\n";
    str += "; #@! TF.FileFunction,MixedPlating,1,2\n";
    str += "FMAT,2\n";
    str += "INCH\n"; // TODO: change to metric

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

  plotDrills(layer) {
    this.#body += "; #@! TA.AperFunction,Plated,PTH,ComponentDrill\n"; // Borrowed from KiCad export
    
    // Extract drill positions and sizes
    const drills = layer.flat().map( x => {
      const getCenter = (pts) => {
        let totalX = 0;
        let totalY = 0;
        
        pts.forEach(pt => {
          totalX += pt[0];
          totalY += pt[1];
        })
  
        return [ totalX / pts.length, totalY / pts.length ];
      }
  
      const getDistance = (pt0, pt1) => Math.sqrt((pt1[0] - pt0[0])**2+(pt1[1] - pt0[1])**2);
      const center = getCenter(x);
      const dist = Math.round(1000*x.reduce((acc, cur) => acc + getDistance(center, cur), 0)/x.length)/1000;
  
      return {
        center, 
        dist
      };
    });

    // Extract tools and drill points
    const tools = {};
    drills.forEach( ({ dist, center }) => {
      if (dist in tools) {
        tools[dist].drillPoints.push(center); 
      } else {
        tools[dist] = {};
        tools[dist].toolID = this.#getToolID();
        tools[dist].drillPoints = [ center ];
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
   
    var zip = new JSZip();
    global_state.downloadGerberOptions.layers.forEach((val, key) => {
      if (!val) return;
      
      switch (key) {
        case "F.Cu":
          let frontCopper = new GerberBuilder();
          frontCopper.plotPads(layers["F.Cu"]);
          frontCopper.plotWires(layers["F.Cu"]);
          if (global_state.downloadGerberOptions.includeOutline) {
            frontCopper.plotOutline(layers["interior"]);
          }
          zip.file(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, frontCopper.toString() );
          break;
        case "B.Cu":
          let backCopper = new GerberBuilder();
          backCopper.plotPads(layers["B.Cu"]);
          backCopper.plotWires(layers["B.Cu"]);
          if (global_state.downloadGerberOptions.includeOutline) {
            backCopper.plotOutline(layers["interior"]);
          }
          zip.file(`${state.name === "" ? "anon" : state.name}-B_Cu.gbr`, backCopper.toString() );
          break;
        case "F.Mask":
          let frontMask = new GerberBuilder();
          frontMask.plotPads(layers["F.Cu"], 0.1);
          if (global_state.downloadGerberOptions.includeOutline) {
            frontMask.plotOutline(layers["interior"]);
          }
          zip.file(`${state.name === "" ? "anon" : state.name}-F_Mask.gbr`, frontMask.toString() );
          break;
        case "B.Mask":
          let backMask = new GerberBuilder();
          backMask.plotPads(layers["B.Cu"], 0.1);
          if (global_state.downloadGerberOptions.includeOutline) {
            backMask.plotOutline(layers["interior"]);
          }
          zip.file(`${state.name === "" ? "anon" : state.name}-B_Mask.gbr`, backMask.toString() );
          break;
        case "F.Silkscreen":
          // Warning: this is still Work In Progress
          let frontSilkscreen = new GerberBuilder();
          frontSilkscreen.plotSilkscreen(layers["componentLabels"]);
          if (global_state.downloadGerberOptions.includeOutline) {
            frontSilkscreen.plotOutline(layers["interior"]);
          }
          zip.file(`${state.name === "" ? "anon" : state.name}-F_Silkscreen.gbr`, frontSilkscreen.toString() );
          break;
        case "B.Silkscreen":
          // No graphics on the back for now
          break;
        case "Outline":
          let outline = new GerberBuilder();
          outline.plotOutline(layers["interior"]);
          zip.file(`${state.name === "" ? "anon" : state.name}-Outline.gbr`, outline.toString() );
          break;
        case "Drills":
          // There is probably no need to include outline in the drill file 
          // even though it could be a gerber file as well. 
          let drills = new ExcellonBuilder();
          drills.plotDrills( layers["drill"] ? layers["drill"] : [] );
          zip.file(`${state.name === "" ? "anon" : state.name}-Drill.xln`, drills.toString());
          break;
      }
    });
    
    zip
      .generateAsync({ type:"blob" })
      .then((content) => {
          // see FileSaver.js
          saveAs(content, `${state.name === "" ? "anon" : state.name}-gerber.zip`);
      });
  
    // downloadText(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, str);
  }