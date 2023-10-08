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

export const GerberDrillFormat = Object.freeze({
  EXCELLON: 'EXCELLON',
  GERBER: 'GERBER'
});

// This gives full file name according to user selected options
function getFilename(state, layerName){
  const projectName = state.name === "" ? "Untitled" : state.name;
  const useProtel = state.downloadGerberOptions.protelFilenames;

  let fileName = projectName; // This is just the basename


  // This pattern is from https://jlcpcb.com/help/article/233-Suggested-Naming-Patterns
  // TODO: Add options to finetube specific manufacturer paterns
  if (useProtel) 
  {
    switch (layerName) {
    case "F.Cu":
      fileName += ".GTL";
      break;
    case "B.Cu":
      fileName += ".GBL";
      break;
    case "F.Mask":
      fileName += ".GTS";
      break;
    case "B.Mask":
      fileName += ".GBS";
      break;
    case "F.Silkscreen":
      fileName += ".GTO";
      break;
    case "B.Silkscreen":
      fileName += ".GBO";
      break;
    case "Edge.Cuts":
      fileName += ".GKO";
      break;
    case "Drills":
      fileName += ".XLN";
      break;
    }
  }
  else
  {
    if (layerName == "Drills") {
      if (state.downloadGerberOptions.drillFormat == GerberDrillFormat.EXCELLON) {
        fileName += "-" + layerName + ".drl";
      } else {
        fileName += "-" + layerName + ".gbr";
      }
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

  static isRect( points ) {
    
    // Should be at least 4 points
    if (points.length < 4) {
      return false;
    }

    // Calculate the minimum and maximum x and y coordinates
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const [x, y] of points) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    // Calculate the width and height of the bounding box
    const width = maxX - minX;
    const height = maxY - minY;

    // Check if all points are within the bounding box
    for (const [x, y] of points) {
      if (x !== minX && x !== maxX && y !== minY && y !== maxY) {
        return false;
      }
    }

    // Check if the width and height are both greater than zero
    return width > 0 && height > 0;
  }

  static getRect( points ) {

    // Calculate the minimum and maximum x and y coordinates
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const [x, y] of points) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    // Calculate the width and height of the bounding box
    const width = (maxX - minX).toFixed(5);
    const height = (maxY - minY).toFixed(5);

    return {
      center: {
        x: (maxX - (width / 2)).toFixed(5),
        y: (maxY - (height / 2)).toFixed(5)  
      },
      width: width,
      height: height
    }
  }

  static isCirc( points ) {

    // Should be more than N points
    if (points.length < 45) { // Just a random number of points here given that all circles have 180 points
      return false;
    }

    // Calculate the minimum and maximum x and y coordinates
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const [x, y] of points) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    // Calculate the width and height of the bounding box
    const width = maxX - minX;
    const height = maxY - minY;

    // Calculate the center of the bounding box
    const center = {
      x: maxX - (width / 2),
      y: maxY - (height / 2)
    };

    // Compare distances of all points from center, based on first point, using tolerance
    const distIdealX = center.x - points[0][0];
    const distIdealY = center.y - points[0][1];
    const distIdeal = Math.sqrt( Math.pow(distIdealX,2) + Math.pow(distIdealY,2) );
    const tolerance = 0.01;
    
    for (const [x, y] of points) {
      const distX = center.x - x;
      const distY = center.y - y;
      const dist = Math.sqrt( Math.pow(distX,2) + Math.pow(distY^2) );

      if (Math.abs(distIdeal - dist) > tolerance) {
        
        // Not circle
        return false;
      }
    }

    // Yes, we got a circle here
    return true;
  }

  static getCirc( points ) {

    // Should be more than N points
    if (points.length < 45) { // Just a random number of points here given that all circles have 180 points
      return false;
    }

    // Calculate the minimum and maximum x and y coordinates
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const [x, y] of points) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    // Calculate the width and height of the bounding box
    const width = maxX - minX;
    const height = maxY - minY;

    // Calculate the center of the bounding box
    const center = {
      x: (maxX - (width / 2)).toFixed(5),
      y: (maxY - (height / 2)).toFixed(5)
    };

    // Calculate radius
    const radius = (width / 2).toFixed(5);

    // Return circle object
    return {
      center: center,
      radius: radius
    }; 
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
    
    // Aperture parameters for polygon pads
    const apertureDiameter = offset ? offset * 2 : 0; // Used to draw polygonal pads
    const apertureID = this.#getApertureID(); // Aperture ID for the polygon pad outline aperture
    const polyPads = [];

    // Apertures for rectangular pads
    const rectApertures = [];
    const rectPads = [];

    // Apertures for circular pads
    const circApertures = [];
    const circPads = [];
    
    this.#body += this.#getComment("Begin pads");

    // Extract pads from current layer
    const pads = [];
    layer.forEach((el) => {
      if (el.type === "wire") return;
      pads.push(el.flat());
    });

    // Separate different types of pads and assign apertures to them
    pads.forEach((pad) => {
      
      // If the pad is a rectangle...
      if (this.constructor.isRect(pad)) {
        
        // Get rectangular representation of the pad  
        const rect = this.constructor.getRect(pad);

        // Try to find existing aperture for it
        let rectApertureID = undefined; 
        rectApertures.forEach((a) => {
          if ( a.width    === rect.width 
            && a.height   === rect.height) {

            // Aperture exists and we assign its id to 
            rectApertureID = a.id;
          }
        });

        // If no existing aperture ID has been found, acquire a new one
        if (!rectApertureID) {
          rectApertureID = this.#getApertureID();
          
          // Add rect aperture to list
          rectApertures.push({
            id: rectApertureID,
            width: rect.width,
            height: rect.height
          });
        }

        // Add rectangular pad location to list along with aperture ID
        rectPads.push({
          id: rectApertureID,
          x: rect.center.x,
          y: rect.center.y
        });
      } 

      // Else if the pad is a circle...
      else if (this.constructor.isCirc(pad)) {

        // Get circular representation of the pad  
        const circ = this.constructor.getCirc(pad);

        // Try to find existing aperture for it
        let circApertureID = undefined; 
        circApertures.forEach((a) => {
          if ( a.radius === circ.radius ) {

            // Aperture exists and we assign its id to 
            circApertureID = a.id;
          }
        });

        // If no existing aperture ID has been found, acquire a new one
        if (!circApertureID) {
          circApertureID = this.#getApertureID();
          
          // Add circ aperture to list
          circApertures.push({
            id: circApertureID,
            radius: circ.radius
          });
        }

        // Add circular pad location to list along with aperture ID
        circPads.push({
          id: circApertureID,
          x: circ.center.x,
          y: circ.center.y
        });
      }

      // Else if the pad is a polygon...
      else {
        polyPads.push(pad);
      }
    });

    // Define aperture for drawing polygons
    this.#body += "%ADD" + apertureID.toString() +  "C," + apertureDiameter.toFixed(3) + "*%\n";
    
    // Define rect apertures
    rectApertures.forEach((a) => {
      this.#body += "%ADD" + a.id.toString() +  "R," + inchesToMM(a.width).toFixed(3) + "X" + inchesToMM(a.height).toFixed(3) + "*%\n";
    });

    // Define circ apertures
    circApertures.forEach((a) => {
      this.#body += "%ADD" + a.id.toString() +  "C," + inchesToMM(a.radius * 2).toFixed(3) + "*%\n";
    });

    // Draw rect pads using rect apertures
    rectPads.forEach((p) => {
      
      // Select the aperture for drawing the pad
      this.#body += "D" + p.id.toString() + "*\n";

      // Flash current rectangle aperture at location X, Y
      this.#body += "X" + this.constructor.format(inchesToMM(p.x)) + "Y" + this.constructor.format(inchesToMM(p.y)) + "D03*\n";
    });

    // Draw circ pads using circ apertures
    circPads.forEach((p) => {
      
      // Select the aperture for drawing the pad
      this.#body += "D" + p.id.toString() + "*\n";

      // Flash current rectangle aperture at location X, Y
      this.#body += "X" + this.constructor.format(inchesToMM(p.x)) + "Y" + this.constructor.format(inchesToMM(p.y)) + "D03*\n";
    });

    // Select the aperture for drawing polygon pads
    this.#body += "D" + apertureID.toString() + "*\n";

    // Enable linear interpolation 
    this.#body += "G01*\n";

    // Draw polygon pads
    polyPads.forEach((p) => {

      // Start region
      this.#body += "G36*\n";

      // Loop through points
      p.forEach((pt, i) => {
        const x = this.constructor.format( inchesToMM(pt[0]) );
        const y = this.constructor.format( inchesToMM(pt[1]) );
        this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
      });

      // End region
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
    const apertureDiameter = 0;
    const apertureID = this.#getApertureID();

    this.#body += this.#getComment("Begin silkscreen");

    layer.map( el => {
      if (!el.type) { // Must be polygon shape in this case
        
        // Define aperture
        this.#body += "%ADD" + apertureID.toString() +  "C," + apertureDiameter.toFixed(3) + "*%\n";

        // Select the aperture for drawing the outline
        this.#body += "D" + apertureID.toString() + "*\n";

        // Enable linear interpolation 
        this.#body += "G01*\n";

        // Draw all shapes as polygons
        this.#body += "G36*\n";
      
        el.flat().forEach((pt, i) => {
          const x = this.constructor.format( inchesToMM(pt[0]) );
          const y = this.constructor.format( inchesToMM(pt[1]) );
          this.#body += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
        });

        this.#body += "G37*\n";
      }

      // For now it seems that text is converted to polylines, but it could be 
      // possible to pass the text itself as a variable so that it could be possible
      // to pass it on to text-specific Gerber markup.
      if (el.type !== "text") return;

      const text = el.value;
      const textSize = inchesToMM(el.size);
      const textPosition = el.translate;
      const textRotation = el.rotation;
      const textFont = "Courier"; // Let's see what we use in SvgPcb currently

      // Generate Gerber X2 text object to maintain text information
      // Gerber Spec p. 147
      this.#body += "%TA.FlashText," + text.replace(/\n/g, "\\n") + ",C,R," + textFont + "," + textSize + ",*%\n"
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

  plotDrills(pcb) {

    // Extract drill positions and sizes
    const drills = pcb
      .components
      .map(comp => comp.drills)
      .flat()
      .map( x => { 
        let center = x.pos;
        let diameter = x.diameter;

        let c = [];
        c[0] = inchesToMM(center[0]);
        c[1] = inchesToMM(center[1]);
        center = c;
        diameter = inchesToMM(x.diameter);
    
        return {
          center, 
          diameter
        };
      });

    // Extract appertures and drill points
    const apertures = {};
    drills.forEach( ({ diameter, center }) => {
      if (diameter in apertures) {
        apertures[diameter].drillPoints.push(center); 
      } else {
        apertures[diameter] = {};
        apertures[diameter].apertureID = this.#getApertureID();
        apertures[diameter].drillPoints = [ center ];
      }
    });

    // Define apertures
    for ( const apt in apertures ) {
      this.#body += "%ADD" + apertures[apt].apertureID.toString() +  "C," + parseFloat(apt).toFixed(3) + "*%\n";
    }

    // Add comment
    this.#body += this.#getComment("Begin drills");

    // Loop through tools, select them, and drill
    for ( const apt in apertures ) {
      this.#body += "D" + apertures[apt].apertureID.toString() + "*\n";
      apertures[apt].drillPoints.forEach( dp => {
        this.#body += "X" + this.constructor.format(dp[0]) + "Y" + this.constructor.format(dp[1]) + "D03*\n";
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

        const metric = this.#state.downloadGerberOptions.excellonMetric;
        let c = [];
        c[0] = metric ? inchesToMM(center[0]) : center[0];
        c[1] = metric ? inchesToMM(center[1]) : center[1];
        center = c;
        diameter = metric? inchesToMM(x.diameter) : x.diameter; 
    
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

      // Generate drills depending on selected drill format
      // TODO: separate PTH and NPTH drill files
      if (state.downloadGerberOptions.drillFormat == GerberDrillFormat.EXCELLON) {
        const excellonDrills = new ExcellonBuilder(state);
        excellonDrills.plotDrills(pcb);
        zip.file( getFilename(state, "Drills"), excellonDrills.toString());
      } else 
      if (state.downloadGerberOptions.drillFormat == GerberDrillFormat.GERBER) {
        const gerberDrills = new GerberBuilder();
        gerberDrills.setFileFunction("Plated,1,2,PTH,Drill"); // All drills as PTH drills for now
        gerberDrills.setFilePolarity("Positive");
        gerberDrills.plotDrills(pcb);
        zip.file( getFilename(state, "Drills"), gerberDrills.toString());
      }
    });
    
    zip
      .generateAsync({ type:"blob" })
      .then((content) => {
          // see FileSaver.js
          saveAs(content, `${state.name === "" ? "Untitled" : state.name}-Gerbers.zip`);
      });
  
    // downloadText(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, str);
  }