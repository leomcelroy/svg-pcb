import { createListener } from "../../events.js";
import { html, render, svg } from "lit-html";
import * as icons from "./icons.js";
import { copy, pathD, getPathData, extrema, transform } from "../../../geogram/index.js";
import { testFootprint } from "./testFootprint.js";

class FootprintEditor extends HTMLElement {
    static get observedAttributes() {
        return ["footprint"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "footprint") {
            this.footprint = newValue;
            this.render();
            this.style.display = "none";
        }
    }

    set footprint(newVal) {
        this._footprint = JSON.parse(newVal);

        for (const pad in this.footprint) {
            const data = this.footprint[pad];
            this.transformations[pad] = {
                _path: pathD([], data.shape),
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                rotate: 0
            }
        }

    }

    get footprint() {
        return this._footprint;
    }

    constructor() {
        super();

        this.initialized = false;
        this._footprint = this.getAttribute("footprint") ?? ""; 
        this.selectedPad = null;

        this.transformations = {};
        this.selectedGeometry = new Set();

        this.render();

        this.panZoomFns = addPanZoom(
            this.querySelector("svg"), 
            ({ scale, pointX, pointY }) => {
                const els = this.querySelectorAll("[data-circle-handle]");

                for (const el of els) {
                    el.setAttribute("r", 6 / scale);
                }

                const fixedScales = this.querySelectorAll("[data-fixed-scale]");
                for (const el of fixedScales) {
                    el.style.transform = `scale(${1/scale})`;
                }
             
            }
        );

        addPtDragging(this, this.panZoomFns);
        addTranslate(this);

        const listener = createListener(this);

        listener("click", "[data-trigger-click-layer]", (e) => {
            const pad = e.target.closest("[data-parent-pad]");
            const { padname } = pad.dataset;

            const newLayersStr = prompt(
                "Please input new layers",
                this.footprint[padname].layers.join(" "),
            );

            // check that layers are a list and strings

            if (newLayersStr === null) return;
           
            let newLayers = newLayersStr.split(" ");
            this.footprint[padname].layers = newLayers;

            this.render();           
        });

        listener("click", "[data-trigger-click-padName]", (e) => {
            const pad = e.target.closest("[data-parent-pad]");
            const { padname } = pad.dataset;

            const newName = prompt(
                "Please input a new pad name",
                e.target.innerText,
            );

            if (newName === null) return;
            if (Object.keys(this.footprint).includes(newName)) return;

            const invalidCharsRegex = /[^a-zA-Z_$\d]|(?<=^[^a-zA-Z_$])[\d]/g;
            const invalid = newName.match(invalidCharsRegex) !== null;
            if (invalid) return;

            const temp = this.footprint[padname];
            this.footprint[newName] = temp;

            const tempTrans = this.transformations[padname];
            this.transformations[newName] = tempTrans;

            delete this.footprint[padname];
            delete this.transformations[padname];

            this.render();
        });

        listener("click", "[data-trigger-click-close]", (e) => {
            this.classList.add("hidden");
        });

        listener("click", "[data-trigger-click-delete]", (e) => {
            const pad = e.target.closest("[data-parent-pad]");
            const { padname } = pad.dataset;

            delete this.footprint[padname];
            delete this.transformations[padname];

            this.selectedGeometry.delete(padname);

            this.render();
        });

        // let startX = 0;
        // let startY = 0;
        // listener("mousedown", "", e => {
        //     startX = e.clientX;
        //     startY = e.clientY;
        // })

        // listener("mouseup", ":not([data-trigger-click-geometry])", (e) => {
        //     const dx = e.clientX - startX;
        //     const dy = e.clientY - startY;
        //     if (dx > 2 || dy > 2) return;
        //     if (e.shiftKey) return
        //     this.selectedGeometry.clear();
        //     this.render();
        // });

        window.addEventListener("keydown", e => {
            const { code } = e;
            if (code === "Escape") {
                this.selectedGeometry.clear();
                this.render();
            }
        })

        listener("mousedown", "[data-trigger-click-geometry]", (e) => {
            const pad = e.target.closest("[data-parent-pad]");
            const { padname } = pad.dataset;

            this.selectedPad = padname;
            if (e.shiftKey && this.selectedGeometry.has(padname)) {
                this.selectedGeometry.delete(padname);
            } else if (e.shiftKey && !this.selectedGeometry.has(padname)) {
                this.selectedGeometry.add(padname);
            } else {
                this.selectedGeometry.clear();
                this.selectedGeometry.add(padname);
            }

            this.render();
        });

        listener("mousedown", "[data-trigger-click-pad]", (e) => {
            const pad = e.target.closest("[data-parent-pad]");
            const { padname } = pad.dataset;

            this.selectedPad = padname;

            this.render();
        });

        listener("mousedown", "[data-trigger-add-pad]", (e) => {
            let maxIndex = 0;
            for (const [ padName, data ] of Object.entries(this.footprint)) {
                maxIndex = Math.max(maxIndex, data.index ?? 0);
            }

            maxIndex++;

            const padName = `_${maxIndex}`;
            this.footprint[padName] = {
                index: maxIndex,
                shape: "M -0.03,0.015L 0.03,0.015L 0.03,-0.015L -0.03,-0.015L -0.03,0.015",
                pos: [0, 0.05],
                layers: ["F.Cu"]
            }

            this.transformations[padName] = {
                _path: pathD([], this.footprint[padName].shape),
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                rotate: 45
            }

            this.selectedPad = padName;

            this.render();

            this.panZoomFns.applyTransformation();

        });
    }

    connectedCallback() {
        this.setAttribute("footprint", testFootprint);

        this.initialized = true;

        this.panZoomFns.setScaleXY({
            x: [-0.2, 0.2],
            y: [-0.2, 0.2],
        });

        if (this.hasAttribute("footprint")) {

        }
    }

    id = null;

    render() {

        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;

        Array.from(this.selectedGeometry).forEach(pad => {
            const data = this.footprint[pad];
            const geo = this.transformations[pad];
            const path = copy(geo._path);

            transform(path, {
                dx: data.pos[0] + geo.translateX,
                dy: data.pos[1] + geo.translateY,
                sx: geo.scaleX,
                sy: geo.scaleY,
                rotate: geo.rotate
            })

            const e = extrema(path);

            xMin = Math.min(xMin, e.xMin);
            xMax = Math.max(xMax, e.xMax);
            yMin = Math.min(yMin, e.yMin);
            yMax = Math.max(yMax, e.yMax);
        })

        const centerX = (xMax+xMin)/2;
        const centerY = (yMax+yMin)/2;

        const transformHandle = () => {

            if (this.selectedGeometry.size === 0) return "";
            if (this.panZoomFns === null) return;

            return svg`
                <g data-fixed-scale data-no-transform style="transform: scale(${1/this.panZoomFns.scale()}); transform-origin: ${centerX}px ${centerY}px;">
                    <g 
                        data-centerX="${centerX}" 
                        data-centerY="${centerY}" 
                        transform="translate(${centerX} ${centerY}) scale(0.85)"
                        >
                        <circle data-translate-xy cx="0" cy="0" r="8" fill="black" class="hover:fill-orange-400 hover:opacity-100 opacity-70"/>
                        
                        <path data-translate-y d="M -8 11 L 0 22 L 8 11" fill="black" class="hover:fill-orange-400 hover:opacity-100 opacity-70"/>
                        
                        <path data-translate-x d="M 11 -8 L 22 0 L 11 8" fill="black" class="hover:fill-orange-400 hover:opacity-100 opacity-70"/>

                        <path data-rotate d="M 30 0 C 30 18 18 30 0 30" stroke="black" stroke-width="4" stroke-linecap="round" fill="none" class="hover:stroke-orange-400 hover:opacity-100 opacity-70"/>

                        <g data-scale-x class="group">
                            <path d="M 30 0 L 40 0" stroke="black" stroke-width="4" stroke-linecap="round" fill="none" class="group-hover:stroke-orange-400 group-hover:opacity-100 opacity-70"/>
                            <circle cx="48" cy="0" r="7" stroke="black" stroke-width="3" stroke-linecap="round" fill="white" class="group-hover:stroke-orange-400 group-hover:opacity-100 opacity-70"></circle>
                        </g>

                        <g data-scale-y class="group">
                            <path d="M 0 30 L 0 40" stroke="black" stroke-width="4" stroke-linecap="round" fill="none" class="group-hover:stroke-orange-400 group-hover:opacity-100 opacity-70"/>
                            <circle cx="0" cy="48" r="7" stroke="black" stroke-width="3" stroke-linecap="round" fill="white" class="group-hover:stroke-orange-400 group-hover:opacity-100 opacity-70"></circle>
                        </g>

                        <g data-scale-xy class="group">
                            <path d="M -10 -10 L -19 -19" stroke="black" stroke-width="4" stroke-linecap="round" fill="none" class="group-hover:stroke-orange-400 group-hover:opacity-100 opacity-70"/>
                            <circle cx="-25" cy="-25" r="7" stroke="black" stroke-width="3" stroke-linecap="round" fill="white" class="group-hover:stroke-orange-400 group-hover:opacity-100 opacity-70"></circle>
                        </g>
                    </g>
                </g>
            `
        }
       
        render(html`
            <div class="absolute w-3/4 h-3/4 inset-x-1/2 inset-y-1/2 translate-x-[-50%] translate-y-[-50%] z-[99999] rounded-xl bg-gray-200 flex overflow-hidden border border-black">
                <div class="flex w-[250px] min-w-[250px] h-full bg-gray-100 flex-col">
                    <div class="overflow-scroll grow">
                        ${Object
                            .entries(this.footprint)
                            .sort((a, b) => a[1]?.index - b[1]?.index)
                            .map(x => footprintMenuItem(x, this.selectedPad, this.transformations[x[0]]))}
                    </div>
                    <div data-trigger-add-pad class="cursor-pointer text-center p-1 bg-gray-300 border-t border-gray-600 hover:bg-blue-200">
                        add pad
                    </div>
                </div>
                <div class="relative grow h-full bg-gray-50">
                    <svg data-main-svg class="w-full h-full" transform="scale(1 -1)">
                        <g data-transform-group>
                            ${Object.entries(this.footprint).map(x => drawFootprint(x, this.transformations[x[0]], this))}
                            ${this.selectedGeometry.size > 0 ? svg`<rect
                                x="${xMin}"
                                y="${yMin}"
                                width="${xMax - xMin}"
                                height="${yMax - yMin}"
                                fill="none"
                                stroke="black"
                                stroke-dasharray="1"
                                stroke-width="2"
                                vector-effect="non-scaling-stroke"
                                />` : ""}
                            ${transformHandle()}
                            <path data-fixed-scale style="transform-origin: center; transform-box: fill-box;" d="M 0 -10 L 0 10 M -10 0 L 10 0" stroke-width="2" stroke="black" fill="none" vector-effect="non-scaling-stroke"/>
                        </g>                    
                    </svg>
                    ${transformPanel(this)}
                </div>
                <div data-trigger-click-close class="absolute right-2 top-2 px-2 bg-gray-200 rounded p-[1px] hover:bg-red-300 cursor-default">
                    close
                </div>
            </div>
        `, this);

        

        const scrollToEl = this.querySelector("[data-selected-pad]");
        if (scrollToEl) {
            scrollToEl.scrollIntoView();
            if (this.id) clearTimeout(this.id);
            this.id = setTimeout(() => {
                this.selectedPad = null;
                this.render();
            }, 1000);
        }
        
        // if (!this.panZoomFns) return;

        // const selectedGeoPaths = Array.from(this.querySelectorAll("[data-selected-geo]"));

        // if (selectedGeoPaths.length === 0) return;

        // const bb = getCombinedBoundingBox(selectedGeoPaths);

        // // const {x, y} = this.panZoomFns.svgPoint({ x: bb.x, y: bb.y });
        // // const width = bb.width/this.panZoomFns.scale();
        // // const height = bb.height/this.panZoomFns.scale();

        // // const normed = normalizeDimensions({ 
        // //     x, 
        // //     y, 
        // //     width, 
        // //     height 
        // // });

        // const normed = normalizeDimensions(bb);
    }
}

function affineTransform(el) {

    if (el.selectedGeometry.size !== 1) return ""

    const padName = [...el.selectedGeometry].at(0);

    const transformation = el.transformations[padName];

    const { translateX, translateY, scaleX, scaleY, rotate } = transformation;

    const affineValueChange = (e, key) => {
        // validate number
        const n = Number(e.target.value);

        if (!isNaN(n)) {
            transformation[key] = n;
            el.render();
        } else {
            e.target.value = transformation[key];
        }
    }

    return html`
        <div class="flex">
            <div class="flex justify-between items-center w-1/2">
                tx: 
                <input class="w-full text-center text-sm bg-gray-200 m-1" @change=${e => affineValueChange(e, "translateX")} .value=${translateX}/>
            </div>
            <div class="flex justify-between items-center w-1/2">
                ty: 
                <input class="w-full text-center text-sm bg-gray-200 m-1" @change=${e => affineValueChange(e, "translateY")} .value=${translateY}/>
            </div>
        </div>
        <div class="flex">
            <div class="flex justify-between items-center w-1/2">
                sx: 
                <input class="w-full text-center text-sm bg-gray-200 m-1" @change=${e => affineValueChange(e, "scaleX")} .value=${scaleX}/>
            </div>
            <div class="flex justify-between items-center w-1/2">
                sy: 
                <input class="w-full text-center text-sm bg-gray-200 m-1" @change=${e => affineValueChange(e, "scaleY")} .value=${scaleY}/>
            </div>
        </div>
        <div class="flex justify-between items-center w-1/2">
            rt: 
            <input class="w-full text-center text-sm bg-gray-200 m-1" @change=${e => affineValueChange(e, "rotate")} .value=${rotate}/>
        </div>
    `;
}

function footprintMenuItem([padName, data], selectedPad, transformation) {
    return html`
        <div 
            data-parent-pad 
            ?data-selected-pad=${padName === selectedPad} 
            data-padname="${padName}"
            class="${padName === selectedPad ? "bg-blue-200" : ""} hover:bg-gray-200 p-2 pr-4 pl-4 hover:cursor-default"
            >
            <div class="flex justify-between">
                <div class="flex items-center">
                    pad: 
                    <span 
                        data-trigger-click-padName 
                        class="hover:bg-gray-300 pl-1 pr-1 ml-1"
                        >
                        ${padName}
                    </span>
                </div>
                <div data-trigger-click-delete class="hover:text-red-500">x</div>
            </div>
            <div class="pl-3 w-[100%]">

                <div>pos: [ ${data.pos.map(x => x.toFixed(2)).join(", ")} ]</div>

                <div class="flex">
                    shape:
                    <span class="ml-2 overflow-x-scroll whitespace-nowrap">
                        "${data.shape}"
                    </span>
                </div>

                layers: 
                <span data-trigger-click-layer class="overflow-x-scroll whitespace-nowrap hover:bg-gray-300 px-1">
                    ${data.layers.join(", ")} 
                </span>

                <div>drill: ${data.drill ?? "none"}</div>
                <div class="pl-3 whitespace-nowrap w-[100%]">
                    ${data.drill ? html`<div>diameter: ${data.drill.diameter}</div>`: ""}
                    ${data.drill ? html`<div>startLayer: ${data.drill.start}</div>`: ""}
                    ${data.drill ? html`<div>endLayer: ${data.drill.end}</div>`: ""}
                    ${data.drill ? html`<div>plated: ${data.drill.plated}</div>` : ""}
                </div>

                <div>maskOffset: ${data.maskOffset ?? "0"}</div>
                <div>index: ${data.index ?? "none"}</div>
            </div>
        </div>
    `
}

function drawFootprint([padName, data], transformation, el) {
    return svg`
        <g data-parent-pad data-padname="${padName}">
            <path 
                ?data-selected-geo=${el.selectedGeometry.has(padName)}
                data-trigger-click-geometry
                class="hover:stroke-yellow-300"
                d="${data.shape}" 
                stroke="none" 
                stroke-width="0.003"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill=${el.selectedGeometry.has(padName) ? "blue" : "black" }
                transform="
                    translate(${data.pos[0] + transformation.translateX} ${data.pos[1] + transformation.translateY})
                    rotate(${transformation.rotate})
                    scale(${transformation.scaleX} ${transformation.scaleY})
                "
                />
            <circle
                cx="${data.pos[0]}"
                cy="${data.pos[1]}"
                r="${0.005}"
                opacity=".5"
                fill="red"
                stroke="none"
                class="hover:opacity-100"
                data-no-transform
                data-circle-handle
                data-trigger-click-pad
                />
        </g>
    `;
}

function transformPanel(el) {
    return html`
        <div class="absolute bottom-0 right-0 bg-gray-300 w-[170px] p-2 rounded">
            <div>
                <span class="font-bold">${el.selectedGeometry.size}</span> 
                selected
                <span @click=${e => { 
                    el.selectedGeometry.clear();
                    el.render();
                }} class="float-right hover:cursor-pointer hover:text-red-500">clear</span>
            </div>
            <div class="${el.selectedGeometry.size === 0 ? "hidden" : ""} flex justify-evenly w-full p-1">
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.flipHorz}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Flip Horizontal
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.flipVert}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Flip Vertical
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.rotate90cw}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Rotate 90deg Clockwise
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.rotate90ccw}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Rotate 90deg Counter-Clockwise
                    </div>
                </span>
            </div>
            <div class="${el.selectedGeometry.size > 1 ? "" : "hidden"} flex justify-evenly w-full p-1">
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.leftAlign}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Align Left
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.centerAlignHorz}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Align Center Horizontal
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.rightAlign}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Align Right
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.distributeHorz}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Distribute Horizontal
                    </div>
                </span>
            </div>
            <div class="${el.selectedGeometry.size > 1 ? "" : "hidden"} flex justify-evenly w-[150px] p-1">
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.topAlign}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Align Top
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.centerAlignVert}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Align Center Vertical
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.bottomAlign}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Align Bottom
                    </div>
                </span>
                <span class="relative group hover:bg-gray-200 p-[1px] rounded" style="scale: .8;">
                    ${icons.distributeVert}
                    <div class="hidden rounded-l absolute items-center px-2 w-max bg-gray-200 h-full text-center right-0 bottom-full group-hover:flex">
                        Distirbute Vertical
                    </div>
                </span>
            </div>
            <div class="font-mono text-sm">
                ${affineTransform(el)}
            </div>
        </div>
    `
}

// this.dispatchEvent(new CustomEvent('colorChange', { detail:
//     {
//         value: hex
//     }
// }));

customElements.define("footprint-editor", FootprintEditor);

function addPanZoom(parentEl, onApplyTransformation = () => {}) {
    const listen = createListener(parentEl);

    let mousedown = false;

    let scale = 1;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };

    function svgPoint({ x, y }) {
        let newX = (x - pointX) / scale;
        let newY = (y - pointY) / scale;

        return { x: newX, y: newY };
    }

    function applyTransformation() {
        const els = parentEl.querySelectorAll("[data-transform-group]");

        if (els.length === 0) return;

        for (const el of els) {
            el.style.transformOrigin = `${0}px ${0}px`;
            el.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
        }

        onApplyTransformation({ scale, pointX, pointY });
    }

    listen("mousedown", "", (e) => {
        if (e.shiftKey) return;
        if (e.target.closest("[data-no-transform]")) return;

        mousedown = true;

        start = { x: e.offsetX - pointX, y: e.offsetY - pointY };

        if (e.detail === 2) {
            console.log(
                e.offsetX,
                e.offsetY,
                svgPoint({ x: e.offsetX, y: e.offsetY }),
            );
        }
    });

    listen("mousemove", "", (e) => {
        if (!mousedown) return;

        pointX = e.offsetX - start.x;
        pointY = e.offsetY - start.y;

        applyTransformation();
    });

    listen("mouseup", "", (evt) => {
        mousedown = false;
    });

    listen("wheel", "", (e) => {
        let xs = (e.offsetX - pointX) / scale;
        let ys = (e.offsetY - pointY) / scale;

        const ZOOM_SCALE = 1.05;
        if (Math.sign(e.deltaY) < 0) scale *= ZOOM_SCALE;
        else scale /= ZOOM_SCALE;

        pointX = e.offsetX - xs * scale;
        pointY = e.offsetY - ys * scale;

        applyTransformation();

        e.preventDefault();
    });

    listen("mouseleave", "", (e) => {
        mousedown = false;
    });

    function setScaleXY(limits) {
        const svg = parentEl;
        const bb = svg.getBoundingClientRect();
        const xr = limits.x[1] - limits.x[0];
        const yr = limits.y[1] - limits.y[0];
        const xScalingFactor = bb.width / xr;
        const yScalingFactor = bb.height / yr;

        const scalingFactor = Math.min(xScalingFactor, yScalingFactor) * 0.9;

        scale = scalingFactor;

        const center = {
            x: ((limits.x[0] + limits.x[1]) / 2) * scalingFactor - bb.width / 2,
            y:
                ((limits.y[0] + limits.y[1]) / 2) * scalingFactor -
                bb.height / 2,
        };

        pointX = -center.x;
        pointY = -center.y;

        applyTransformation();
    }

    function corners() {
        const { left, right, bottom, top, width, height } =
            parentEl.getBoundingClientRect();
        // need rt, lt, rb, lb
        const rt = svgPoint({ x: width, y: height });
        // rt.y = -rt.y
        const lt = svgPoint({ x: 0, y: height });
        // lt.y = -lt.y
        const rb = svgPoint({ x: width, y: 0 });
        // rb.y = -rb.y
        const lb = svgPoint({ x: 0, y: 0 });
        // lb.y = -lb.y

        return { rt, lt, rb, lb };
    }

    return {
        scale: () => scale,
        x: () => pointX,
        y: () => pointY,
        corners,
        svgPoint,
        setScaleXY,
        applyTransformation
    };
}

function addPtDragging(el, panZoomFns) {
    const listen = createListener(el);

    let pad = null;
    let padEl = null;

    listen("mousedown", "[data-trigger-click-pad]", e => {
        padEl = e.target.closest("[data-parent-pad]");
        const { padname } = padEl.dataset;

        pad = e.target.closest("footprint-editor").footprint[padname];
    });

    listen("mousemove", "", e => {
        if (pad === null) return;

        const {x, y} = panZoomFns.svgPoint({ x: e.offsetX, y: e.offsetY });

        pad.pos[0] = Math.round(x*100)/100;
        pad.pos[1] = Math.round(y*100)/100;

        el.selectedPad = padEl.dataset.padname;

        el.render();
    })

    listen("mouseup", "", e => {
        if (pad === null) return;

        padEl = null;
        pad = null;
    })

}

// function addPathEditing(el, panZoomFns) {
//     const listen = createListener(el);

//     let pad = null;
//     let padEl = null;

//     listen("mousedown", "", e => {

//     });

//     listen("mousemove", "", e => {

//     })

//     listen("mouseup", "", e => {

//     })

// }

function addTranslate(el) {
    const listen = createListener(el);

    let down = false;
    let moveX = false;
    let moveY = false;

    listen("mousedown", "[data-translate-xy]", e => {
        down = true;
        moveX = true;
        moveY = true;
    })

    listen("mousedown", "[data-translate-x]", e => {
        down = true;
        moveX = true;
    })

    listen("mousedown", "[data-translate-y]", e => {
        down = true;
        moveY = true;
    })

    listen("mousemove", "", e => {
        if (!down) return;

        const scale = el.panZoomFns.scale();


        const dx = e.movementX/scale;
        const dy = -e.movementY/scale;

        Array.from(el.selectedGeometry).forEach(padname => {
            const transform = el.transformations[padname];

            if (moveX) transform.translateX += dx;
            if (moveY) transform.translateY += dy;
        })

        el.render();
    })

    listen("mouseup", "", e => {
        down = false;
        moveX = false;
        moveY = false;
    })
}

function addScale(el) {
    const listen = createListener(el);

    let down = false;
    let moveX = false;
    let moveY = false;

    listen("mousedown", "[data-scale-xy]", e => {
        down = true;
        moveX = true;
        moveY = true;
    })

    listen("mousedown", "[data-scale-x]", e => {
        down = true;
        moveX = true;
    })

    listen("mousedown", "[data-scale-y]", e => {
        down = true;
        moveY = true;
    })

    listen("mousemove", "", e => {
        if (!down) return;

        const scale = el.panZoomFns.scale();


        const dx = e.movementX/scale;
        const dy = -e.movementY/scale;

        // Array.from(el.selectedGeometry).forEach(padname => {
        //     const transform = el.transformations[padname];

        //     if (moveX) transform.translateX += dx;
        //     if (moveY) transform.translateY += dy;
        // })

        el.render();
    })

    listen("mouseup", "", e => {
        down = false;
        moveX = false;
        moveY = false;
    })
}

function addRotate(el) {
    const listen = createListener(el);

    let down = false;
    let moveX = false;
    let moveY = false;

    listen("mousedown", "[data-rotate]", e => {
        down = true;
        moveX = true;
        moveY = true;
    })

    listen("mousemove", "", e => {
        if (!down) return;

        const scale = el.panZoomFns.scale();


        const dx = e.movementX/scale;
        const dy = -e.movementY/scale;

        Array.from(el.selectedGeometry).forEach(padname => {
            const transform = el.transformations[padname];

            // if (moveX) transform.translateX += dx;
            // if (moveY) transform.translateY += dy;
        })

        el.render();
    })

    listen("mouseup", "", e => {
        down = false;
        moveX = false;
        moveY = false;
    })
}

// function scrollToCenter(element) {
//   const parent = element.parentNode;


//   const diffX = (element.getBoundingClientRect().left - parent.getBoundingClientRect().left) + parent.scrollLeft;
//   const diffY = (element.getBoundingClientRect().top - parent.getBoundingClientRect().top) + parent.scrollTop;

//   const centerX = diffX - (parent.clientWidth / 2) + (element.clientWidth / 2);
//   const centerY = diffY - (parent.clientHeight / 2) + (element.clientHeight / 2);



//   parent.scrollTo({
//     top: centerY,
//     left: centerX,
//   });

//     parent.scrollTo({
//         top: centerY,
//         left: centerX,
//       });

// }

// function parseMatrix(matrixString) {
//   const matrixValues = matrixString.split('(')[1].split(')')[0].split(',');
//   return matrixValues.map(Number);
// }

// function revertScaleKeepTranslation(element, style) {
//   const currentTransform = style.getPropertyValue('transform');

//   if (currentTransform === 'none') {
//     return;
//   }

//   const matrix = parseMatrix(currentTransform);

//   const [a, c, b, d, tx, ty] = matrix;

//   const revertScaleX = 2;
//   const revertScaleY = 2;

//   element.style.transform = `matrix(${revertScaleX}, ${c}, ${b}, ${revertScaleY}, ${1}, ${1})`;
// }

function getCombinedBoundingBox(paths) {
  if (paths.length === 0) {
    return null; // or handle it as per your requirement
  }

  // Get the SVG element (assuming all paths belong to the same SVG)
  const svg = paths[0].ownerSVGElement;

  // If there's no parent SVG, we can't calculate the bounding box
  if (!svg) {
    throw new Error('SVG parent element not found');
  }

  // Initialize the variables to hold the extremes
  let minX, minY, maxX, maxY;

  for (const path of paths) {
    // Get the bounding client rect in viewport coordinate space
    let rect = path.getBoundingClientRect();
    
    // Convert the viewport coordinates to SVG coordinates
    let topLeft = svg.createSVGPoint();
    topLeft.x = rect.left;
    topLeft.y = rect.top;
    topLeft = topLeft.matrixTransform(svg.getScreenCTM().inverse());

    let bottomRight = svg.createSVGPoint();
    bottomRight.x = rect.right;
    bottomRight.y = rect.bottom;
    bottomRight = bottomRight.matrixTransform(svg.getScreenCTM().inverse());

    // Initialize the variables on the first iteration
    if (minX === undefined || minY === undefined || maxX === undefined || maxY === undefined) {
      minX = topLeft.x;
      minY = topLeft.y;
      maxX = bottomRight.x;
      maxY = bottomRight.y;
    } else {
      // Compare the points with the current extremes and update them if necessary
      minX = Math.min(minX, topLeft.x);
      minY = Math.min(minY, topLeft.y);
      maxX = Math.max(maxX, bottomRight.x);
      maxY = Math.max(maxY, bottomRight.y);
    }
  }

  // Create the bounding box in SVG coordinate space
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

function normalizeDimensions({ x, y, width, height }) {
  // Check if width is negative
  if (width < 0) {
    // If width is negative, shift the x position and make width positive
    x = x + width; // width is negative, so this operation is effectively a subtraction
    width = -width; // make width positive
  }

  // Check if height is negative
  if (height < 0) {
    // If height is negative, shift the y position and make height positive
    y = y + height; // height is negative, so this operation is effectively a subtraction
    height = -height; // make height positive
  }

  // Return the updated dimensions
  return { x, y, width, height };
}


function createRectElement(normed) {
  // Create a namespace-aware element
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  // Set attributes on the element
  rect.setAttributeNS(null, "x", normed.x);
  rect.setAttributeNS(null, "y", normed.y);
  rect.setAttributeNS(null, "width", normed.width);
  rect.setAttributeNS(null, "height", normed.height);
  rect.setAttributeNS(null, "id", "bounding-box");
  rect.setAttributeNS(null, "fill", "none");
  rect.setAttributeNS(null, "stroke", "0.01");

  return rect;
}


// to do
/*
- round dragged values to grid
- add button functionality
- delete multiple at once
- selection box
- drill editting
- drag arrows on input boxes
- show dimensions
- lock aspect ratio
- path editing?
- multiple pos point editing
*/








