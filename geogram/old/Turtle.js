import { createPath } from "./turtle_functions/createPath.js"
// import { move } from "./turtle_functions/move.js";
import { translate } from "./turtle_functions/translate.js";
import { rotate } from "./turtle_functions/rotate.js";
import { scale } from "./turtle_functions/scale.js";
import { goTo } from "./turtle_functions/goTo.js";
import { setAngle } from "./turtle_functions/setAngle.js";
import { reverse } from "./turtle_functions/reverse.js";
import { setBooleanForm } from "./turtle_functions/setBooleanForm.js";
import { getBooleanForm } from "./turtle_functions/getBooleanForm.js";
import { construction } from "./turtle_functions/construction.js";
import { lastPath } from "./turtle_functions/lastPath.js";
import { firstPath } from "./turtle_functions/firstPath.js";
import { pointsFromLast } from "./turtle_functions/pointsFromLast.js";
import { pointsFromFirst } from "./turtle_functions/pointsFromFirst.js";
import { points } from "./turtle_functions/points.js";
import { addPoint } from "./turtle_functions/addPoint.js";
import { pathMap } from "./turtle_functions/pathMap.js";
// import { pathReduce } from "./turtle_functions/pathReduce.js";
// import { pathFilter } from "./turtle_functions/pathFilter.js";
import { pointMap } from "./turtle_functions/pointMap.js"; // need to make
// import { pointReduce } from "./turtle_functions/pointReduce.js"; // need to make
import { pointFilter } from "./turtle_functions/pointFilter.js"; // need to make
import { lastAngle } from "./turtle_functions/lastAngle.js";
import { alignHead } from "./turtle_functions/alignHead.js";
import { copy } from "./turtle_functions/copy.js";
import { extrema } from "./turtle_functions/extrema.js";
import { width } from "./turtle_functions/width.js";
import { height } from "./turtle_functions/height.js";
import { fillColor } from "./turtle_functions/fillColor.js";
import { floodFill } from "./turtle_functions/floodFill.js";
import { strokeWidth } from "./turtle_functions/strokeWidth.js";
import { strokeColor } from "./turtle_functions/strokeColor.js";
import { strokeLinecap } from "./turtle_functions/strokeLinecap.js";
import { strokeLinejoin } from "./turtle_functions/strokeLinejoin.js";
import { turn } from "./turtle_functions/turn.js";
import { forward } from "./turtle_functions/forward.js";
import { turnForward } from "./turtle_functions/turnForward.js";
import { closePath } from "./turtle_functions/closePath.js";
import { point } from "./turtle_functions/point.js";
import { arc } from "./turtle_functions/arc.js";
import { flip } from "./turtle_functions/flip.js";
import { repeat } from "./turtle_functions/repeat.js";
import { mirror } from "./turtle_functions/mirror.js";
import { fillet, roundCorners } from "./turtle_functions/fillet.js";
import { thicken } from "./turtle_functions/thicken.js";
import { flatGoTo } from "./turtle_functions/flatGoTo.js";
import { originate } from "./turtle_functions/originate.js";
import { union } from "./turtle_functions/union.js";
import { difference } from "./turtle_functions/difference.js";
import { intersect } from "./turtle_functions/intersect.js";
import { xor } from "./turtle_functions/xor.js";
import { offset } from "./turtle_functions/offset.js";
import { copyPaste } from "./turtle_functions/copyPaste.js";
import { newStroke } from "./turtle_functions/newStroke.js";
import { text } from "./turtle_functions/text.js";
import { dogbone } from "./turtle_functions/dogbone.js";
import { placeAlong } from "./turtle_functions/placeAlong.js";
import { trim } from "./turtle_functions/trim.js";
import { dashed } from "./turtle_functions/dashed.js";
import { centroid } from "./turtle_functions/centroid.js";
import { vec } from "./turtle_functions/vec.js";
import { bezier } from "./turtle_functions/bezier.js";
import { pathD } from "./turtle_functions/pathD.js";
import { slide } from "./turtle_functions/slide.js";
import { polylines } from "./turtle_functions/polylines.js";
import { getTabs } from "./turtle_functions/getTabs.js";
import { lSystem } from "./turtle_functions/lSystem.js";
import { transform } from "./turtle_functions/transform.js";
import { flatten } from "./turtle_functions/flatten.js";

import { group } from "./group.js";

// import { newUnion } from "./turtle_functions/new-union.js";
// import { newIntersection} from "./turtle_functions/new-intersection.js";
// import { newDifference } from "./turtle_functions/new-difference.js";
// import { newXor } from "./turtle_functions/new-xor.js";


// import { wrap } from "./turtle_functions/wrap.js";
// import { subdivide } from "./turtle_functions/subdivide.js";
// import { render } from "./turtle_functions/render.js";



const pointConversion = (point) => {
	if (Array.isArray(point)) return { x: point[0], y: point[1] };
	else return point;
}

export class Turtle {

	constructor(init) {
		this.angle = 0;
		// down = true;
		// current = {x: 0, y: 0};
		this.path = createPath();

		this.savedStates = [];

		this.booleanScale = 10000;
		
		if (init) {
			this.angle = init.angle;
			this.path = init.path;
		}
	}

	overwrite(turtle) {
		this.angle = turtle.angle;
		this.path = turtle.path;
		this.savedStates = turtle.savedStates;
		this.booleanScale = turtle.booleanScale;

		return this;
	}

	firstPath() { return firstPath(this) };
	lastPath() { return lastPath(this) };
	pointsFromLast(i) { return pointsFromLast(i, this) };
	pointsFromFirst(i) { return pointsFromFirst(i, this) };
	getPoint(i) { return i >= 0 ? pointsFromFirst(i, this) : pointsFromLast(-i, this) }; // not doced
	addPoint(point, down = true) { return addPoint(point, down, this) };
	pathMap(func) { return pathMap(func, this) };
	// pathReduce(func) { return pathReduce(func, this) };
	// pathFilter(func) { return pathFilter(func, this) };
	pointMap(func) { return pointMap(func, this) };
	// pointReduce(func) { return pointReduce(func, this) };
	pointFilter(func) { return pointFilter(func, this) };
	extrema() { return extrema(this) };
	copy() { return copy(this) };
	setBooleanForm(paths) { return setBooleanForm(paths, this, this.booleanScale) };
	getBooleanForm(limiter = 0) { return getBooleanForm(this, limiter) };
	point(target) { return point(target, this) };

	store() {
		this.savedStates.push({ pos: this.end, angle: this.angle });
		return this;
	}

	restore() {
		const state = this.savedStates.pop();
		this.goTo(state.pos, false);
		this.angle = state.angle;
		return this;
	}

	newStroke(start = [0,0], type = "point" ) { return newStroke(pointConversion(start), type, this) }; // do i need this now?

	construction() { return construction(this) };
	
	lastAngle() { return lastAngle(this) };

	alignHead() { return alignHead(this) };

	fillColor(color) { return fillColor(color, this) };

	strokeWidth(thickness) { return strokeWidth(thickness, this) };

	strokeColor(color) { return strokeColor(color, this) };

	strokeLinecap(type) { return strokeLinecap(type, this) };

	strokeLinejoin(type) { return strokeLinejoin(type, this) };

	// turtle operations
	goTo(point, down = true) { return goTo(pointConversion(point), down, this) };
	forward(distance, down = true) { return forward(distance, down, this) };
	vec(vector, down = true) { return vec(vector, down, this) }; // not doced
	arc(angle, radius, down = true) { return arc(angle, radius, down, this) };
	turnForward(angle, distance) { return turnForward(angle, distance, this) };

	turn(angle) { return turn(angle, this) };
	right(angle) { return turn(-angle, this) };
	left(angle) { return turn(angle, this) };

	setAngle(angle) { return setAngle(angle, this) };

  flatGoTo(point, axis) { return flatGoTo(pointConversion(point), axis, this) };

	closePath() { return closePath(this) };

	translate(toPoint, fromPoint = [0, 0]) { return translate(pointConversion(toPoint), pointConversion(fromPoint), this) }; 
	// translate(x, y) { return translate(x, y, this) };
	rotate(angle, point) { return rotate(angle, point ? pointConversion(point) : this.centroid, this) }; // TODO: default point
	scale(factor, point) { 
		point = point ? pointConversion(point) : this.centroid;
		if (typeof factor === "number") factor = [factor, factor];

		return scale(factor, point, this); 
	}; // TODO: default point
	originate() { return originate(this) };


	reverse() { return reverse(this) };
	flip(axis) { return flip(axis, this) };
	repeat(num) { return repeat(num, this) };
	mirror() { return mirror(this) };
	fillet(radius) { return fillet(radius, this) };

	roundCorners(radius, all = false) { return roundCorners(radius, all, this) };

	thicken(thickness) { return thicken(thickness, this) };

	copyPaste(num, transformations) { return copyPaste(num, transformations, this) };

	offset(distance, options = {}) { return offset(distance, options, this) }; // not doced
	outline() { return offset(0, { endType: "etClosedPolygon" }, this) };
	expand(distance) { return offset(distance, { endType: "etClosedPolygon" }, this) };
	// should these booleans take arguments
	intersect() { return this.overwrite(intersect(this, arguments)) };
	difference() { return this.overwrite(difference(this, arguments)) };
	union() { return this.overwrite(union(this, arguments)) };
	xor() { return this.overwrite(xor(this)) };

	text(word) { return text(word, this) }; // TODo: use opentype js
	dogbone(radius, all = false) { return dogbone(radius, all, this) };
	trim(start, end) { return trim(start, end, this) }; // not doced

	// union() { return this.overwrite(newUnion(this, arguments)) };
	// intersect() { return this.overwrite(newIntersection(this, arguments)) };
	// difference() { return this.overwrite(newDifference(this, arguments)) };
	// xor() { return this.overwrite(newXor(this, arguments)) };

	placeAlong(turtle) { return placeAlong(turtle, this) }; // not doced
	// should be able to get angle at point, or derivative

	dashed(number) { return dashed(number, this) }; // not doced
	pathD(string) { return pathD(string, this) }; // not doced
	bezier(...pts) { 
		return bezier(
			[
				[ this.end.x, this.end.y ], 
				...pts
			], 
			this) 
	}; // not doced
	slide(angle, distance) { return slide(angle, distance, this) }; // not doced
	polylines(asArray = false, prec = 0) { return polylines(asArray, prec, this) }; // not doced

	getTabs() { return getTabs(this) } // not doced

	lSystem(args) { return lSystem(args, this)}

	transform(matrix) { return transform(matrix, this) };

	get start() { return point( "start", this) };
	get end() { return point( "end", this) };
	get lt() { return point( "lt", this) };
	get lc() { return point( "lc", this) };
	get lb() { return point( "lb", this) };
	get ct() { return point( "ct", this) };
	get cc() { return point( "cc", this) };
	get cb() { return point( "cb", this) };
	get rt() { return point( "rt", this) };
	get rc() { return point( "rc", this) };
	get rb() { return point( "rb", this) };
	get centroid() { return centroid(this) }; // not doced
	get width() { return width(this) };
	get height() { return height(this) };
	get points() { return points(this) };


	floodFill(color) { return floodFill(color, this) };

	group() { // not doced
		if (arguments.length === 0) return this;
		// return this.overwrite(group(this, group(...arguments)));
		return this.overwrite(group(this, ...arguments));
	}

	flatten() { // union all shapes
		return this.overwrite(flatten(this));
	}

	getPathData(merge = true) {
		let result = [];
		const pls = this.polylines();

		for (let i = 0; i < pls.length; i++) {
			for (let j = 0; j < pls[i].pts.length; j++) {
				let pt = pls[i].pts[j];
				if (j === 0) result.push(`M ${pt.x} ${pt.y}`);
				else result[result.length-1] += `L ${pt.x} ${pt.y}`;
			}
		}

		return merge ? result.join(" ") : result;
	}
}





