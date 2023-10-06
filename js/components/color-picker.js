class ColorPicker extends HTMLElement {
    static get observedAttributes() {
        return ['value'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.dragging = false;
        this.hue = 0;
        this.saturation = 100;
        this.brightness = 50;
        this.opacity = 1;
        this.render();
        this.isInitialized = false;
        this.justTriggered = false;
    }

    connectedCallback() {
        this.isInitialized = true;

        this.colorBox = this.shadowRoot.querySelector('.color-box');
        this.colorPopup = this.shadowRoot.querySelector('.color-popup');
        this.colorLine = this.shadowRoot.querySelector('.color-line');
        this.opacityLine = this.shadowRoot.querySelector('.opacity-line');
        this.colorArea = this.shadowRoot.querySelector('.color-area');
        this.colorIndicator = this.shadowRoot.querySelector('.color-indicator');
        this.opacityIndicator = this.shadowRoot.querySelector('.opacity-indicator');
        this.colorAreaIndicator = this.shadowRoot.querySelector('.color-area-indicator');
        this.hexInput = this.shadowRoot.querySelector('.hex-input');

        this.colorBox.addEventListener('click', () => this.togglePopup());
        this.colorLine.addEventListener('mousedown', (event) => { this.dragging = 'color'; this.mouseMove(event); });
        this.opacityLine.addEventListener('mousedown', (event) => { this.dragging = 'opacity'; this.mouseMove(event); });
        this.colorArea.addEventListener('mousedown', (event) => { this.dragging = 'area'; this.mouseMove(event); });
        this.hexInput.addEventListener('change', (event) => {
            this.updateColorFromHex(event.target.value);
            this.triggerEvent();
        });
        document.addEventListener('mouseup', () => this.dragging = false);
        document.addEventListener('mousemove', (event) => this.mouseMove(event));
        document.addEventListener('mousedown', (event) => {
            const active = this.colorPopup.classList.contains('active');
            if (!active) return;

            if (!event.composedPath().some(el => el === this)) this.colorPopup.classList.toggle("active");
        });

        this.updateColor();

        if (this.hasAttribute("value")) {
            this.updateColorFromHex(this.getAttribute("value"));
        }
        
    }

    render() {
        const css = `
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }

            * {
              box-sizing: border-box;
            }

            .container {
                position: relative;
                width: min-content;
            }
            .color-box {
                width: 100%;
                height: 100%;
                cursor: pointer;
                background: none;
            }
            .color-popup {
                position: absolute;
                right: calc(100% + 10px);
                top: 0px;
                border: 1px solid #ccc;
                background-color: #f0f0f0;
                padding: 5px;
                width: 250px;
                height: 250px;
                z-index: 1000;
                border-radius: 10px;
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
            }
            .active {
                display: flex;
            }
            .color-line, .opacity-line, .color-area {
                cursor: pointer;
                position: relative;
                border-radius: 10px;
                border: 1px solid black;
            }
            .color-line, .opacity-line {
                height: 15px;
                width: 90%;
            }
            .color-area {
                width: 90%;
                height: 125px;
                background: linear-gradient(to top, #fff, transparent),
                            linear-gradient(to left, transparent, #000);
            }
            .color-line {
                background: linear-gradient(to right, 
                    red, 
                    yellow, 
                    green, 
                    cyan, 
                    blue, 
                    magenta, 
                    red);
            }
            .color-indicator, .opacity-indicator, .color-area-indicator {
                position: absolute;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 2px solid black;
                pointer-events: none;
                left: 50%;
            }
            .color-indicator, .opacity-indicator {
                top: 100%;
                transform: translate(-50%, -14px);
            }
            .color-area-indicator {
                border-color: white;
                box-shadow: 0 0 0 1px black;
                transform: translate(-50%, -50%);
            }

            .hex-input {
                text-align: center;
                font-family: monospace;
                font-weight: 500;
                width: 45%;
            }
        `

        this.shadowRoot.innerHTML = `
            <style>${css}</style>
            <div class="color-box"></div>
            <div class="color-popup">
                <div class="color-area">
                    <div class="color-area-indicator"></div>
                </div>
                <div class="color-line">
                    <div class="color-indicator"></div>
                </div>
                <div class="opacity-line">
                    <div class="opacity-indicator"></div>
                </div>
                <input class="hex-input"></input>
            </div>
        `;
    }

    togglePopup() {
        this.colorPopup.classList.toggle('active');
        this.updateColor();
    }

    mouseMove(event) {
        if (!this.dragging) return;
        const rect = (this.dragging === 'color' ? this.colorLine :
                      this.dragging === 'opacity' ? this.opacityLine :
                      this.colorArea).getBoundingClientRect();
        let x = event.clientX - rect.left;
        x = Math.max(Math.min(x, rect.width), 0);  
        
        let y;
        if (this.dragging === 'area') {
            y = event.clientY - rect.top;
            y = Math.max(Math.min(y, rect.height), 0);
        }
        
        if (this.dragging === 'color') {
            this.hue = (x / rect.width) * 360;
            this.colorIndicator.style.left = `${x}px`;
        } else if (this.dragging === 'opacity') {
            this.opacity = x / rect.width;
            this.opacityIndicator.style.left = `${x}px`;
        } else if (this.dragging === 'area') {
            this.saturation = (x / rect.width) * 100;
            this.brightness = 100 - (y / rect.height) * 100;
            this.colorAreaIndicator.style.left = `${x}px`;
            this.colorAreaIndicator.style.top = `${y}px`;
        }

        this.updateColor();
        this.triggerEvent();
        event.preventDefault();
    }

    updateColorFromHex(hex) {
        hex = hex.replace(/[^0-9A-Fa-f]/g, '');

        while (hex.length < 8) {
            hex = '0' + hex;
        }

        if (/^[0-9A-Fa-f]{8}$/.test(hex)) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const a = parseInt(hex.substring(6, 8), 16)/255;
            const hsb = rgbToHsb(r, g, b);
            this.hue = hsb[0];
            this.saturation = hsb[1];
            this.brightness = hsb[2];

            this.opacity = a;

            this.updateColor();
        } else {
            this.hexInput.value = rgbaToHex(...hsbToRgb(this.hue, this.saturation, this.brightness), this.opacity);
        }
    }

    updateColor() {
        const [ r, g, b ] = hsbToRgb(this.hue, this.saturation, this.brightness);
        const color = `rgba(${r} ${g} ${b} / ${this.opacity})`;
        this.colorBox.style.background = color;
        this.colorArea.style.backgroundImage = `
                                                linear-gradient(to bottom, transparent, #000),
                                                linear-gradient(to right, #fff, transparent),
                                                linear-gradient(to right, hsl(${this.hue}, 100%, 50%), hsl(${this.hue}, 100%, 50%))`;
        
        this.opacityLine.style.backgroundColor = `hsl(${this.hue}, 100%, 50%)`;
        this.opacityLine.style.background = `linear-gradient(to right, transparent, hsl(${this.hue}, 100%, 50%))`
        
        this.colorIndicator.style.left = `${(this.hue / 360) * this.colorLine.getBoundingClientRect().width}px`;
        this.opacityIndicator.style.left = `${this.opacity*100}%`;
        
        this.colorAreaIndicator.style.left = `${this.saturation}%`;
        this.colorAreaIndicator.style.top = `${100-this.brightness}%`;

        const hex = rgbaToHex(r, g, b, this.opacity);
        this.hexInput.value = hex;

       // const event = new CustomEvent('input', {
       //      detail: { value: hex },
       //      bubbles: true,
       //      composed: true
       //  });
    }

    triggerEvent() {
        this.justTriggered = true;

        // so weird, this stops the rerender from setting the color and accumulating error
        setTimeout(() => {
            this.justTriggered = false;
        }, 0);

        const hex = this.hexInput.value;
        this.dispatchEvent(new CustomEvent('colorChange', { detail: 
            { 
                value: hex
            }
        }));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // requestAnimationFrame( () => {
        //     if (name === 'value') {
        //         this.updateColorFromHex(newValue);
        //     }
        // });

        if (!this.isInitialized || this.justTriggered) return;
    }
}

function hsbToRgb(h, s, b){
    var i, f, p, q, t, r, g, b;
    h = h / 360;
    s = s / 100;
    b = b / 100;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = b * (1 - s);
    q = b * (1 - f * s);
    t = b * (1 - (1 - f) * s);
    switch(i % 6){
        case 0: r = b, g = t, b = p; break;
        case 1: r = q, g = b, b = p; break;
        case 2: r = p, g = b, b = t; break;
        case 3: r = p, g = q, b = b; break;
        case 4: r = t, g = p, b = b; break;
        case 5: r = b, g = p, b = q; break;
    }
    return [(r * 255), (g * 255), (b * 255)];
}

function rgbToHsb(r, g, b) {
    r /= 255; g /= 255; b /= 255;  // Scale to range 0-1
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max == 0 ? 0 : d / max;
    if (max == min) {
        h = 0; 
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, v * 100];
}

function rgbaToHex(r, g, b, a) {
    r = Math.round(r).toString(16);
    g = Math.round(g).toString(16);
    b = Math.round(b).toString(16);
    a = Math.round(a * 255).toString(16);
  
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    if (a.length == 1) a = "0" + a;

    return "#" + r + g + b + a;
}

function roundToFraction(n, f) {
    return Math.round(n / f) * f;
}

customElements.define('color-picker', ColorPicker);