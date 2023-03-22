import { changeDpiDataUrl } from "./changeDPI.js";
import { offset2 } from "../../geogram/index.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { global_state } from "../global_state.js";

function toMM(inches){
    return inches * global_state.mm_per_unit;
}

function format(x) {
    let s = x.toFixed(6); // Reduce decimal digits to 6 (0.123456)
    s = s.replace(".", ""); // Remove the floating point (0.123456 becomes 0123456)

    // Remove leading zeroes for Gerberization
    while (s.startsWith("0")) {
        s = s.substr(1, s.length);
    }

    return s;
}

export function downloadGerber(state) {

    // Some Gerber tips.
    // Include outline in all layers to avoid align issues.
    // Use flashed pads wherever possible.
    // X2 Attributes (meta information):
    // %TF.FileFunction,Soldermask,Top*%
    // Gerber files containing attribute commands (TF, TA, TO, TD) are called Gerber X2 files
    // We want Gerber X2 (at least) out of the box.
    // Set polarity to dark: %LPD*% 
    // Define aperture: %ADD10C,0.010*%
    // Select aperture: D10*
    // End of file: M02*
    
    // Apertures
    // - Standard apertures. They are pre-defined: the circle (C), rectangle (R), obround (O) and
    //   regular polygon (P). See 4.4.
    // - Macro apertures. They are created with the AM (Aperture Macro) command. Any shape
    //   and parametrization can be created. They are identified by their given name. (See 4.4.6).

    // Complex shapes, such as pads that are polygons, not circles anymore:
    // See page 63 in the Gerber Spec.

    const layers = state.pcb.layers;
  
    // It is possible that one could draw the wire with Gerber apertures.
    // Will look into that.
    const expandWire = w => offset2(
      w.shape, 
      w.thickness/2, 
      {
        endType: "etOpenRound", 
        jointType:"jtRound", 
      }
    );
  
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

    /* START: reusable gerber macro functions */

    const getGerberHeader = () => {
      let str = '';
      
      // Add date and time of generation.
      const dateTime = new Date().toISOString();
      str += "%TF.CreationDate," + dateTime + "*%\n";

      // Add a header comment at the top to indicate the generator.
      // This could make use of predefined global constants later.
      str += "%TF.GenerationSoftware,LeoMcRoy&Co,SvgPcb,v0.1*%\n";

      // It is recommended to use metric. Imperial is there for historic reasons only 
      // and will be deprecated at a future date. Source: Gerber Spec. p. 46.
      str += "%MOMM*%\n";

      // 4 integer digits and 6 decimal digits, borrowed from KiCad gerber export.
      str += "%FSLAX46Y46*%\n";

      return str;
    };

    const getGerberEdgeCuts = (layer, apertureID) => {
      let str = '';

      // Define circle with 0.1mm diameter aperture
      str += "%ADD" + apertureID.toString() +  "C,0.10*%\n";

      // Select the aperture for drawing the outline
      str += "D" + apertureID.toString() + "*\n";

      // Enable linear interpolation 
      str += "G01*\n";
      
      // Draw Edge Cuts
      const interiorStrs = layer.map( pts => {
        let ptsString = pts.reduce((acc, cur, i) => `${acc}X${format( toMM(cur[0]) )}Y${format( toMM(cur[1]) )}D0${i === 0 ? 2 : 1}*\n`, "*\n") 
        return ptsString;
      });
  
      str += interiorStrs.join("");

      return str;
    };

    // Circle aperture only for now
    const getGerberDefineAperture = (apertureID, diameter) => { 
      return "%ADD" + apertureID.toString() +  "C," + diameter.toString() + "*%\n"; 
    }; 
    
    // Select predefined aperture
    const getGerberSelectAperture = (apertureID) => {
      return "D" + apertureID.toString() + "*\n";
    };

    const getGerberPolarityDark = () => { return "%LPD*%\n"; }
    const getGerberLinearInerpolation = () => { return "G01*\n"; }
    const getGerberEndOfFile = () => { return "M02*"; }

    /* END: reusable gerber macro functions */
    /* START: gerber file generators */

    const makeGerberFile = (layer) => {
      let apertureCounter = 10;
      let str = '';
      str += getGerberHeader();

      // Add zero aperture for polygon shapes
      const zeroApertureID = apertureCounter;
      apertureCounter++;
      str +="%ADD" + zeroApertureID.toString() +  "C,0.0*%\n";
  
      // 1ST PASS
      // Loop through layer and set up apertures for different wire thicknesses and pads.
      let wireApertureDiameters = [];
      let wires = [];
      let shapes = [];
      layer.map( el => {
        if (el.type === "wire") {
          const wireThickness = toMM(el.thickness).toFixed(3);
          
          // Add aperture only if it does not exist yet
          if (!wireApertureDiameters.includes(wireThickness)) {
            wireApertureDiameters.push(wireThickness);
            const apertureID = apertureCounter;
            apertureCounter++;
            str += getGerberDefineAperture(apertureID, wireThickness);
          }

          // Add modified wire object to array
          el.gerberAperture = wireApertureDiameters.indexOf(wireThickness) + (apertureCounter - wireApertureDiameters.length);
          wires.push(el);
        } else {
          // Everything else is a random shape and we define a macro aperture for each.
          // We do need to do some data transformation here. 
          // It would be nice to run this data through some kind of analyzer to detect 
          // a possible shape primitive.
          el = {
            shape: el,
            type: "shape"
          };

          shapes.push(el);
        }
      });

      // Set us up for drawing
      str += getGerberPolarityDark(); // layer dark
      str += getGerberLinearInerpolation(); // linear interpolation

      // 2ND PASS
      // Now we should be able to find aperture indices and draw wires using them
      // As well as the pads, of course
      wires.map( el => {
        // Draw the wire using an aperture
        str += getGerberSelectAperture(el.gerberAperture);
        for (let i = 0; i < el.shape[0].length; i++) {
          const x = format( toMM(el.shape[0][i][0]) );
          const y = format( toMM(el.shape[0][i][1]) );
          str += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
        }
      });

      // Here we draw plain polygons
      shapes.map( el => {
        str += getGerberSelectAperture(zeroApertureID);
        str += "G36*\n"; 
        for (let i = 0; i < el.shape[0].length; i++) {
          const x = format( toMM(el.shape[0][i][0]) );
          const y = format( toMM(el.shape[0][i][1]) );
          str += "X" + x + "Y" + y + "D0" + (i === 0 ? 2 : 1) + "*\n";
        }
        str += "G37*\n";
      });

      str += getGerberEndOfFile();
  
      return str;
    };
  
    const makeFile = (layer, interior = undefined) => {
      let apertureCounter = 10;
      let str = '';
      
      str += getGerberHeader();
      str += getGerberPolarityDark(); // layer dark
      str += getGerberLinearInerpolation(); // linear interpolation

      const zeroApertureID = apertureCounter;
      apertureCounter++;
      str +="%ADD" + zeroApertureID.toString() +  "C,0.0*%\n";
      str += "D" + zeroApertureID.toString() + "*\n";

      // Figure out difference between pads and traces

      const strs = layer.map( pts => {
        let ptsString = pts.reduce((acc, cur, i) => `${acc}X${format( toMM(cur[0]) )}Y${format( toMM(cur[1]) )}D0${i === 0 ? 2 : 1}*\n`, "G36*\n")
        ptsString += "G37*\n"; 
        return ptsString;
      });
  
      str += strs.join("");

      if (interior !== undefined) {
        const apertureID = apertureCounter;
        apertureCounter++;
        str += getGerberEdgeCuts(interior, apertureID);
      }
      
      // End of Gerber file
      str += getGerberEndOfFile();
  
      return str;
    }

    const makeFileEdgeCuts = (layer) => {
      let apertureCounter = 10;
      let str = '';
      str += getGerberHeader();
      str += getGerberPolarityDark();
      str += getGerberLinearInerpolation();
      str += getGerberEdgeCuts(layer, apertureCounter);
      str += getGerberEndOfFile();
      return str;
    }
  
    // What format drills here? One could use Gerber for drills too.
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

    /* END: gerber file generators */

    const interior = 
      (global_state.downloadGerberOptions.layers.get("Edge.Cuts") || global_state.downloadGerberOptions.includeEdgeCuts) 
      ? layers["interior"].map( x => { return x; }).flat()
      : undefined;
   
    var zip = new JSZip();
    global_state.downloadGerberOptions.layers.forEach((val, key) => {
      if (!val) return;
      
      switch (key) {
        case "F.Cu":
          zip.file(`${state.name === "" ? "anon" : state.name}-F_Cu.gbr`, makeGerberFile(layers["F.Cu"]) );
          break;
        case "B.Cu":
          //const backCopper = layers["B.Cu"].map( x => {
          //  if (x.type === "wire") return expandWire(x);
          //  else return x;
          //}).flat();
          zip.file(`${state.name === "" ? "anon" : state.name}-B_Cu.gbr`, makeGerberFile(layers["B.Cu"]) );
          //zip.file(`${state.name === "" ? "anon" : state.name}-B_Cu.gbr`, makeFile(backCopper, 
          //  (global_state.downloadGerberOptions.includeEdgeCuts ? interior : undefined) ));
          break;
        case "F.Mask":
          // To make this possible we need to get the front layer pads and offset them a bit.
          break;
        case "B.Mask":
          // To make this possible we need to get the BACK layer pads and offset them a bit.
          break;
        case "F.Silkscreen":
          // It would be good to have more options in terms of element placement here.
          break;
        case "B.Silkscreen":
          // It would be good to have more options in terms of element placement here.
          break;
        case "Edge.Cuts":
          zip.file(`${state.name === "" ? "anon" : state.name}-Edge_Cuts.gbr`, makeFileEdgeCuts(interior));
          break;
        case "Drills":
          // There is probably no need to include edge cuts in the drill file 
          // even though it could be a gerber file as well. 
          zip.file(`${state.name === "" ? "anon" : state.name}-Drill.xln`, makeFileDrill(drill));
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