// console.log(x, y, index);
const string = state.codemirror.view.state.doc.toString();
const asts = parse2(string);
const { index: startI, ast } = asts[index];
// find translate
const translateTerm = ast.filter(line => line[0].value === "translate")[0];
const firstBrack = translateTerm[2][0].index + startI + 1;
const secondBrack = translateTerm[2][2].index + startI;
const from = translateTerm[2][0].index + startI;
const comp = state.storedPCB.components[index];
const round = num => Math.round(num*10000)/10000;
const insert = `${round(x + comp.posX)}, ${round(y + comp.posY)}`;
const to = from + insert.length;
state.codemirror.view.dispatch({
	changes: { from: firstBrack, to: secondBrack, insert }
});







const string = state.codemirror.view.state.doc.toString();
const stringToParse = `()=>{${string}}`; // remember to subtract 5 from indices
const esprimaAST = esprima.parseScript(stringToParse, { range: true });
const mainBody = esprimaAST.body[0].expression.body.body;
let adds = [];
walk(esprimaAST, node => {
	try {
  		if (node.callee.type === "MemberExpression" && node.callee.property.name === "add") adds.push(node.arguments[1]);
	} catch (err) { }
})
// sort by first range
const sortedAdds = adds.sort((a, b) => a.range[0] - b.range[0])
const round = num => Math.round(num*1000)/1000;
const comp = state.storedPCB.components[index];
try {
	sortedAdds[index].properties.forEach( prop => {
		if (prop.key.name !== "translate") return;
		// prop.value.elements = [
		// 	{type: 'Literal', value: round(x + comp.posX), raw: `${round(x + comp.posX)}`},
		// 	{type: 'Literal', value: round(y + comp.posY), raw: `${round(y + comp.posY)}`}
		// ]

		const [ xNode, yNode ] = prop.value.elements;
		walk(xNode, node => {
			if (node.type === "Literal") {
				node.value = round(x + node.value);
				node.raw = `${round(x + node.value)}`;
			}
		})

		walk(yNode, node => {
			if (node.type === "Literal") {
				node.value = round(y + node.value);
				node.raw = `${round(y + node.value)}`;
			}
		})
	})
} catch (err) {}


// modify values here
// find adjustable parameter
// should be first number in expression
// replace value with new value

// generate
const insert = generate(sortedAdds[index]);

// reinsert
state.codemirror.view.dispatch({
	changes: { from: sortedAdds[index].range[0] - 5, to: sortedAdds[index].range[1] - 5, insert }
});


