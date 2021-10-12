export function downloadSVG(state) {

    const serializer = new XMLSerializer();
    const svg = document.querySelector("svg").cloneNode(true);
    const toRemove = svg.querySelectorAll(".no-download");
    for (const item of toRemove) {
      item.remove();
    }

    const tg = svg.querySelector(".transform-group");
    tg.style.transformOrigin = "";
    tg.style.transform = "";
    // tg.style.transformOrigin = `${0}px ${0}px`;
    // tg.style.transform = "translate(" + 0 + "px, " + 0 + "px) scale(" + 1 + ")";

    const width = (state.limits.x[1] - state.limits.x[0]);
    const height = (state.limits.y[1] - state.limits.y[0]);
    svg.setAttribute("width", `${width*state.mm_per_unit}mm`);
    svg.setAttribute("height", `${height*state.mm_per_unit}mm`);
    svg.setAttribute("viewBox", `${state.limits.x[0]} ${state.limits.y[0]} ${width} ${height}`);
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );

    const source = serializer.serializeToString(svg);
    const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    // make download link
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `download.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // clean up
    document.body.removeChild(downloadLink);
  }

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}