import { Turtle } from "../Turtle.js";
import { group } from "../group.js";

/**
 * @author Jan Marsch (@kekscom)
 * @example see http://jsfiddle.net/osmbuildings/2e5KX/5/
 * @example thickLineToPolygon([{x:50,y:155}, {x:75,y:150}, {x:100,y:100}, {x:50,y:100}], 20)
 * @param polyline {array} a list of point objects in format {x:75,y:150}
 * @param thickness {int} line thickness
 */

 function isClosed(points) {
    return overlap(points[0], points[points.length - 1]);
 }

 function overlap(p0, p1) {
    return 0.0000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);
 }

function getOffsets(a, b, thickness) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var len = Math.sqrt(dx * dx + dy * dy);
    var scale = thickness / (2 * len);

    return {
        x: -scale * dy,
        y: scale * dx
    };
}

function getIntersection(a1, b1, a2, b2) {
    // directional constants
    var
        k1 = (b1.y - a1.y) / (b1.x - a1.x),
        k2 = (b2.y - a2.y) / (b2.x - a2.x),
        x, y,
        m1, m2;

    // if the directional constants are equal, the lines are parallel
    if (k1 === k2) {
        return;
    }

    // y offset constants for both lines
    m1 = a1.y - k1 * a1.x;
    m2 = a2.y - k2 * a2.x;

    // compute x 
    x = (m1 - m2) / (k2 - k1);

    // use y = k * x + m to get y coordinate
    y = k1 * x + m1;

    // if line is vertical correct it
    if (Math.abs(m1) > 10000000000) {
        // console.log("m1 is wrong")
        x = a1.x;
        y = x*k2+m2;
    } 
    if (Math.abs(m2) > 10000000000) {
        // console.log("m2 is wrong")
        x = a2.x;
        y = x*k1+m1;
    }

    // console.log("k1", k1, "k2", k2, "m1", m1, "m2", m2);

    if (x > 1000000 || x < -1000000) return;
    if (y > 1000000 || y < -1000000) return;

    return {
        x: x,
        y: y
    };
}

function thickenHelper(points, thickness) {
    var
        off,
        poly = [],
        isFirst, isLast,
        prevA, prevB,
        interA, interB,
        p0a, p1a, p0b, p1b;

    let firstOffsets = [];
    const closed = isClosed(points);
    if (closed) points.push(points[1]); // TODO: this is a little hacky

    for (var i = 0, il = points.length - 1; i < il; i++) {
        isFirst = !i;
        isLast = (i === points.length - 2);

        off = getOffsets(points[i], points[i + 1], thickness);

        p0a = {
            x: points[i].x + off.x,
            y: points[i].y + off.y
        };
        p1a = {
            x: points[i + 1].x + off.x,
            y: points[i + 1].y + off.y
        };
        p0b = {
            x: points[i].x - off.x,
            y: points[i].y - off.y
        };
        p1b = {
            x: points[i + 1].x - off.x,
            y: points[i + 1].y - off.y
        };

        if (!isFirst) {
            interA = getIntersection(prevA[0], prevA[1], p0a, p1a);
            if (interA) {
                poly.unshift(interA);
            }

            interB = getIntersection(prevB[0], prevB[1], p0b, p1b);
            if (interB) {
                poly.push(interB);
            }
        }

        if (isFirst) {
            poly.unshift(p0a);
            poly.push(p0b);

            firstOffsets = [p0a, p0b];
        }

        if (isLast) {

            let interA = getIntersection(poly[poly.length - 1], poly[poly.length - 2], {x: p1a.x, y: firstOffsets[1].y}, firstOffsets[1]);
            let interB = getIntersection(poly[0], poly[1], {x: p1a.x, y: firstOffsets[0].y}, firstOffsets[0]);

            poly.unshift(p1a);
            poly.push(p1b);

        }

        if (!isLast) {
            prevA = [p0a, p1a];
            prevB = [p0b, p1b];
        }
    }

    return poly;
}

function pruneOverlapping(turtle) {
    let last;
    turtle.path = turtle.pointFilter(p => {
        let result = true;
        if (last && overlap(last, p)) result = false;
        last = p;

        return result;
    })
    return turtle;
}


function deepFlatten (array){
  var result = []; 
  
  array.forEach(function (elem) {
    if (Array.isArray(elem)) {
        result = result.concat(deepFlatten(elem));
    } else {
        result.push(elem);
    }
  });
  
  return result;
};

export function thicken(distance, turtle) {
    // if shape is closed then offset +/- distance/2 
    // need to prune overlapping points, TODO: or do I?
    // pruneOverlapping(turtle);

    // turtle.path = turtle.pathMap(p => ({ ...p, points: thickenHelper(p.points, distance) }) );

    const turtles = deepFlatten(turtle.pathMap(p => new Turtle({ angle: 0, path: [ p ] })));
    turtles.forEach(t => {
        const endType = overlap(t.start, t.end) ? "etClosedLine" : "etOpenButt"; // should do this for each path
        t.offset(distance/2, { endType, jointType: "jtMiter" });
    })

    turtle.path = group(...turtles).path;

    // const endType = overlap(turtle.start, turtle.end) ? "etClosedLine" : "etOpenButt"; // should do this for each path
    // turtle.offset(distance, { endType, jointType: "jtMiter" });

    // turtle.path = newPaths.map(path => ({
    //     points: path, 
    //     fillColor: "none",
    //     strokeWidth: 1,
    //     strokeColor: "black",
    //     construction: false,
    //     dashed: 0,
    //     linecap: "butt", // "round" | "square"
    //     linejoin: "mitre", // "round" | "bevel"
    // }))

    return turtle;
}





