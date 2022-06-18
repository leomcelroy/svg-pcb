import { Turtle } from "../Turtle.js";

export function trim(start, end, turtle) {
  const newTurtle = new Turtle();
  let count = 0;

  turtle.pathMap(path => {
    let started = false;
    path.points.forEach( p => {
      if (count >= start && count <= end) {
        if (!started) {
          turtle.goTo(p, false)
          started = true;
        } else {
          newTurtle.addPoint(p);
        }
      }
      count++;
    })
  })

  turtle.path = newTurtle.path;

  turtle.alignHead();
  return turtle;
}

//     const turtle = env.turtle();
//     const newTurtle = new Turtle();
//     let started = false;

//     turtle.points().forEach((p, i) => {
//       if (i >= start && i <= end) {
//         if (!started) {
//           newTurtle.move(newTurtle.start, p);

//           started = true;
//         }
//         newTurtle.addPoint(p);
//       }
//     })

//     turtle.path = newTurtle.path;
//     //     add = false
//     // count = 0
//     // started = false
//     // for (pointsof outer) as p do
//     //   if count > 58 and count < 94
//     //     if !started, move this\startof p end
//     //     goto p 
//     //     started = true
//     //   end
//     //   count += 1
//     return turtle;