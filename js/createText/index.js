const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();

const attributes = {fill: 'black', stroke: 'black'};
const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

for(let i = 32; i <= 127; i++){
    let svg = textToSVG.getSVG(String.fromCharCode(i), options);
    console.log(svg);
}