import { html, svg } from "lit-html";
import { global_state } from "../global_state.js";

const ptsToD = pts => pts.reduce((acc, cur, i) => `${acc} ${i === 0 ? "M" : "L"} ${cur.join(",")}`, "");

export const drawGrid = (corners, gridSize) => {

    const middX = [
        [corners.lt.x, (corners.lt.y + corners.lb.y)/2],
        [corners.rt.x, (corners.rt.y + corners.rb.y)/2],
    ]

    const middY = [
        [(corners.lt.x + corners.rt.x)/2, corners.lt.y],
        [(corners.lb.x + corners.rb.x)/2, corners.lb.y],
    ]

    const originX = [
        [corners.lt.x, 0],
        [corners.rt.x, 0],
    ]

    const originY = [
        [0, corners.lt.y],
        [0, corners.lb.y],
    ]

    const xLimits = [corners.lt.x, corners.rt.x];
    const xRange = Math.abs(xLimits[1] - xLimits[0]);
    const yLimits = [corners.lb.y, corners.lt.y];
    const yRange = Math.abs(yLimits[1] - yLimits[0]);

    function getBaseLog(x, y) {
      return Math.log(y) / Math.log(x);
    }

    const order = Math.round(getBaseLog(5, Math.max(xRange, yRange)));
    const stepSize = global_state.adaptiveGrid ? (5**(order))/20 : gridSize;
    global_state.gridSize = stepSize;

    const getMarkVals = (limits, stepSize) => {
        let marks = [];
        let current = stepSize*Math.ceil(limits[0]/stepSize) - stepSize;
        while (current < limits[1] + stepSize) {
            current = current + stepSize;
            marks.push(current);
        }

        return marks
    }

    const valToLineH = val => [
        [corners.lt.x, val],
        [corners.rt.x, val]
    ];

    const valToLineV = val => [
        [val, corners.lt.y],
        [val, corners.lb.y],
    ];

    const lineToMark = width => line => svg`<path stroke="black" vector-effect="non-scaling-stroke" stroke-width="${width}" d="${ptsToD(line)}"/>`

    const hMarks = getMarkVals(yLimits, stepSize).map(valToLineH).map(lineToMark(0.2))
    const vMarks = getMarkVals(xLimits, stepSize).map(valToLineV).map(lineToMark(0.2))

    // console.log(getMarkVals(yLimits, stepSize));

    return svg`
        <g class="grid">
            ${lineToMark(.6)(originX)}
            ${lineToMark(.6)(originY)}
            ${hMarks}
            ${vMarks}
        </g>
    `
}