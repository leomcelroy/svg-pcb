// import makerjs from 'https://cdn.skypack.dev/makerjs';
import { Turtle } from "../Turtle.js";

const getDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
const getAngle = (p1, p2) => (180 / Math.PI) * Math.atan2(p2.y - p1.y, p2.x - p1.x);
const getIntraDist = (path, i0, i1) => getDistance(path[i0], path[i1]);
const getIntraAngle = (path, i0, i1) => getAngle(path[i0], path[i1]);

const isClosed = ({
  points
}) => {
  const path = points;
  const EPSILON = 0.00000001;
  const firstPoint = path[0];
  const lastPoint = path[path.length - 1];
  const xDelta = Math.abs(firstPoint.x - lastPoint.x);
  const yDelta = Math.abs(firstPoint.y - lastPoint.y);
  const closed = xDelta < EPSILON && yDelta < EPSILON;
  return closed;
}

function dogbonePath(radius, all, path) {
  const l = path.points.length;
  if (l < 3) return path; // no corners
  const newTurtle = new Turtle();
  const numPoints = path.points.length;
  const { x, y } = path.points[0];
  newTurtle.translate({x, y}, newTurtle.start);

  let remove = 0;
  let firstLose = 0;
  for (let i = 0; i < numPoints - 2; i++) {
    const dist0 = getIntraDist(path.points, i, i+1);
    const ang0 = getIntraAngle(path.points, i, i+1);
    const ang1 = getIntraAngle(path.points, i+1, i+2);
    
    let ang = ang1 - ang0;
    if (ang > 180) ang -= 360;
  else if (ang < -180) ang += ang;
  
    // this is to prevent double rounding
    if ( Math.abs(ang) < 3 && !all ) {
      newTurtle.goTo(path.points[i+1]);
      if (i === path.points.length - 3){
        newTurtle.goTo(path.points[i+2]);
      }
      remove = 0; // TODO: do I need this
      continue;
    }; 

    let lose = Math.abs(2*radius*Math.sin(ang*Math.PI/180/2));

    if (i === 0) firstLose = lose;

    newTurtle
      .forward(dist0 - lose - remove)
      .left(-ang/2)
      .arc(2*ang, radius)
      .left(-ang/2)

    remove = lose;

    // finish last leg
    if (i === path.points.length - 3) {
      const dist1 = getIntraDist(path.points, i+1, i+2);
    if (isClosed(path)) {
      const dist2 = getIntraDist(path.points, 0, 1);
      const ang2 = getIntraAngle(path.points, 0, 1);
      let ang3 = ang2 - ang1;

      const lose2 = Math.abs(2*radius*Math.sin(ang3*Math.PI/180/2));

      // trim first point
      newTurtle.path = newTurtle.pointFilter((x, i) => i !== 0);

      // do last leg
      newTurtle.forward(dist1 - lose - lose2);

      // fillet
      newTurtle
        .left(-ang3/2)
        .arc(2*ang3, radius)
        .left(-ang3/2)
        .forward(dist2 - lose2 - firstLose);
    } else { 
      newTurtle.forward(dist1 - lose);
    }
  }    

  }

  return newTurtle.path;
}

export function dogbone(radius, all, turtle) {
  turtle.path = turtle.pathMap(p => dogbonePath(radius, all, p));

  return turtle;
}

// let ogang = 115
// let d = 81
// let x = G.new()
// 	.forward(d)
// 	.right(ogang)
// 	.repeat(1)
// 	.draw("red")

// let r = 10
// let ang = (ogang*Math.PI/180)
// let lose = Math.abs(2*r*Math.sin(ang/2))
// let x2 = G.new()
// 	.forward(d-lose)
// 	.left(ogang/2)
// 	.arc(-2*ogang, r)
// 	.left(ogang/2)
// 	.draw()









