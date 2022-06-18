import { arc } from "./arc.js";
import { Turtle } from "../Turtle.js";

// these are also elsewhere
const getDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
const getAngle = (p1, p2) => (180 / Math.PI) * Math.atan2(p2.y - p1.y, p2.x - p1.x);
const getIntraDist = (turtle, i0, i1) => getDistance(turtle.pointsFromLast(i0), turtle.pointsFromLast(i1));
const getIntraAngle = (turtle, i0, i1) => getAngle(turtle.pointsFromLast(i0), turtle.pointsFromLast(i1));

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

export function fillet(radius, turtle) {
  const lastPath = turtle.lastPath();
  const l = lastPath.points.length;
  if (l < 3) return turtle;

  const dist1 = getIntraDist(turtle, 0, 1);
  const dist0 = getIntraDist(turtle, 1, 2);
  const ang0 = getIntraAngle(turtle, 1, 0);
  const ang1 = getIntraAngle(turtle, 2, 1);

  const ang = ang0 - ang1;

  const lose = Math.abs(Math.tan((ang / 360) * Math.PI) * radius);

  // trim path by 2 points
  lastPath.points = lastPath.points.slice(0, -2);

  // set angle
  turtle.setAngle(ang1);

  // go forward
  turtle.forward(dist0 - lose);

  // add fillet
  let circleAng = ang;
  // not sure why I had this
  if (circleAng > 180) {
    circleAng = ang - 360;
  } else if (circleAng < -180) {
    circleAng = 360 + ang;
  };

  arc(circleAng, radius, true, turtle);

  // go forward
  turtle.forward(dist1 - lose);

  return turtle;
}

const getIntraDist2 = (path, i0, i1) => getDistance(path[i0], path[i1]);
const getIntraAngle2 = (path, i0, i1) => getAngle(path[i0], path[i1]);

function roundCornersPath(radius, all, path) {
  const l = path.points.length;
  if (l < 3) return path; // no corners
  const newTurtle = new Turtle();
  const numPoints = path.points.length;
  const { x, y } = path.points[0];
  newTurtle.translate({x, y}, newTurtle.start);
  // newTurtle.setangle(turtle.angle);

  let remove = 0;
  let firstLose = 0;
  for (let i = 0; i < numPoints - 2; i++) {
    const dist0 = getIntraDist2(path.points, i, i+1);
    const dist1 = getIntraDist2(path.points, i+1, i+2);
    const ang0 = getIntraAngle2(path.points, i, i+1);
    const ang1 = getIntraAngle2(path.points, i+1, i+2);
    
    let ang = ang1 - ang0;

    // TODO: this is experimental to prevent double rounding
    if (Math.abs(ang) < 3 && !all) {
      newTurtle.goTo(path.points[i+1]);
      if (i === path.points.length - 3){
        newTurtle.goTo(path.points[i+2]);
      }
      remove = 0; // TODO: do I need this
      continue;
    }; 


    // console.log("ang0", ang0, "ang1", ang1, "ang", ang);
    let lose = Math.abs(Math.tan((ang / 360) * Math.PI) * radius);

    if (i === 0) firstLose = lose;
    // set angle
    newTurtle.setAngle(ang0);

    // go forward
    newTurtle.forward(dist0 - lose - remove);

    // add fillet
    if (ang > 180) ang -= 360;
    else if (ang < -180) ang += 360;
    arc(ang, radius, true, newTurtle);

    // finish last leg
    if (i === path.points.length - 3) {
      if (isClosed(path)) {
        const dist2 = getIntraDist2(path.points, 0, 1);
        const ang2 = getIntraAngle2(path.points, 0, 1);
        let ang3 = ang2 - ang1;
        const lose2 = Math.abs(Math.tan((ang3 / 360) * Math.PI) * radius);

        // trim first point
        newTurtle.path = newTurtle.pointFilter((x, i) => i !== 0);

        // do last leg
        newTurtle.forward(dist1 - lose - lose2);

        // fillet
        if (ang3 > 180) ang3 -= 360;
        else if (ang3 < -180) ang3 += 360;
        arc(ang3, radius, true, newTurtle);

        // add back first leg (which is now last)
        newTurtle.forward(dist2 - lose2 - firstLose);
      } else { 
        newTurtle.forward(dist1 - lose);
      }
    }

    // go forward
    remove = lose;


  }

  return newTurtle.path;
} 

export function roundCorners(radius, all, turtle) {
  // console.log("rounding");
  turtle.path = turtle.pathMap(p => roundCornersPath(radius, all, p));

  return turtle;
}

// let x = G.new(); x
//   .turn(180)
//   .forward(83)
//   .turn(-90)
//   .forward(30)
//   .turn(-90)
//   .forward(60) 
//   .draw("red")
//   .roundCorners(12)
//   .turn(90)
//   .forward(40)
//   .reverse()
//   .turn(90)
//   .goTo([x.end.x, x.start.y])
//   .draw("red")
//   .roundCorners(13)
//   .closePath()
//   .draw("red")
//   .roundCorners(9)

// G.draw(x)