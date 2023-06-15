var inc;
var yoffset;
var yoffsetInc;
var start;
var yoffsetMax;


function setup() {
  createCanvas(1700, 1200);
  background(255);
  noStroke();
  noiseDetail(2, 0.25);
  
  inc = 0.02 * 0.0005 * height;
  yoffset = 0;
  yoffsetInc = 0.00004 * height;
  start = 0;
  yoffsetMax = 0.007 * height;
}

setup();

const final = [];
let currentTurtle = null;

function beginShape() {
  currentTurtle = new Turtle();
}

function vertex(x, y) {
  currentTurtle.goTo(x, y);
}

function endShape() {
  currentTurtle.applyPts(pt => [pt.x, pt.y]);
  final.push(...currentTurtle.path)
  currentTurtle = null;
}

while (true) {
  var theFill = 255;
  var y0 = 3.5 * height / 5;
  var ystep = 100;
  

  // Draw lines
  var yPrevious = y0;
  xoff = start;
  
  beginShape();
  for (var x = 0; x < width; x++) {
    
    var ycurr = 0.5 * Nos.perlin2(0.5 * xoff, yoffset) * height - ystep * yoffset + y0;
    var foundOverlap = false;
    for (var yoffsetvar = yoffset; yoffsetvar < yoffsetMax; yoffsetvar += yoffsetInc) {
      var y = 0.5 * Nos.perlin2(0.5 * xoff, yoffsetvar) * height - ystep * yoffsetvar + y0;
      if (y > ycurr) {
        foundOverlap = true;
        endShape();
        beginShape();
        break
      }
    }
    
    xoff += inc;
      
    vertex(x, height - ycurr);
    yPrevious = ycurr;
  }
  endShape();
  yoffset += yoffsetInc;
    
  if (yoffset >= yoffsetMax) {
    break;
  }
}
  
 