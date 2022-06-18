export function createPath() {
	return [{
		points: [{
			x: 0,
			y: 0
		}],
		fillColor: "none",
		strokeWidth: 1,
		strokeColor: "black",
		construction: false,
		dashed: 0,
		linecap: "butt", // "round" | "square"
		linejoin: "mitre", // "round" | "bevel"
	}];
}