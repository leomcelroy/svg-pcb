// @ts-nocheck
import { dispatch } from "../dispatch.js";
import { changeDpiDataUrl } from "./changeDPI.js";

export function addPageEvents(state) {
  // Listen for messages from opener or other tabs
  window.addEventListener("message", async (event) => {
    const { type, code, id, dpi = 1000 } = event.data || {};

    // SECURITY: if you want to restrict, replace "*" with expected origin(s)
    const targetOrigin = event.origin || "*";

    // -------- 1. Populate the editor with provided code --------
    if (type === "LOAD_CODE") {
      if (typeof code === "string") {
        // Replace the current program
        dispatch("UPLOAD_JS", { text: code });
      }

      // Send acknowledgement back so the opener knows we're ready
      event.source?.postMessage({ type: "LOAD_CODE_ACK", id }, targetOrigin);
      return;
    }

    // -------- 2. Render a PNG and send it back --------
    if (type === "RENDER_PNG") {
      // If caller supplied code, load it first
      if (typeof code === "string") {
        dispatch("UPLOAD_JS", { text: code });
      } else {
        dispatch("RUN");
      }

      // Wait two animation frames so the DOM <svg> is updated
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r))
      );

      const pngData = await _makePNG(state, dpi);
      event.source?.postMessage(
        { type: "PNG_RESULT", id, pngData },
        targetOrigin
      );
    }
  });

  window.opener?.postMessage({ type: "EDITOR_READY" }, "*");
}

// Helper — convert the current SVG to a PNG data-URL
function _makeSVG(state) {
  const serializer = new XMLSerializer();
  const svg = document.querySelector("svg").cloneNode(true);

  // Keep only the elements relevant to the board
  const shapes = svg.querySelector(".shapes");
  const paths = svg.querySelector(".paths");
  const background = svg.querySelector(".background");
  svg.innerHTML = "";
  svg.append(background);
  svg.append(shapes);
  svg.append(paths);

  const width = state.limits.x[1] - state.limits.x[0];
  const height = state.limits.y[1] - state.limits.y[0];

  svg.setAttribute(
    "transform",
    `scale(1, -1) translate(0, ${-(state.limits.y[0] + state.limits.y[1])})`
  );
  svg.setAttribute("style", "");
  svg.setAttribute("width", `${width * state.mm_per_unit}mm`);
  svg.setAttribute("height", `${height * state.mm_per_unit}mm`);
  svg.setAttribute(
    "viewBox",
    `${state.limits.x[0]} ${state.limits.y[0]} ${width} ${height}`
  );
  svg.setAttributeNS(
    "http://www.w3.org/2000/xmlns/",
    "xmlns:xlink",
    "http://www.w3.org/1999/xlink"
  );

  const source = serializer.serializeToString(svg);
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
}

function _makePNG(state, dpi = 1000) {
  return new Promise((resolve) => {
    const src = _makeSVG(state);

    const wMm = (state.limits.x[1] - state.limits.x[0]) * state.mm_per_unit;
    const hMm = (state.limits.y[1] - state.limits.y[0]) * state.mm_per_unit;
    const MM_PER_INCH = 25.4;
    const width = (dpi * wMm) / MM_PER_INCH;
    const height = (dpi * hMm) / MM_PER_INCH;

    const img = new Image();
    img.width = width;
    img.height = height;
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      let dataUrl = canvas.toDataURL("image/png");
      dataUrl = changeDpiDataUrl(dataUrl, dpi);
      resolve(dataUrl);
    };
  });
}
