function RGBAToHexA(r,g,b,a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = a.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b + a;
}

function RGBAToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

const RGBTo255 = arr => arr.map((n,i) => i < 3 ? Math.round(n*255) : n);
// `rgba(${RGBTo255(arr).join(",")})`
// "rgba(255, 255, 255, 1)"

const RGBATo255 = arr => arr.map((n,i) => Math.round(n*255));

const mapColors = arr => arr.length === 4
    ? RGBAToHexA(...RGBATo255(arr))
    : "rgba(255, 255, 255, 1)"

const mapColorsHex = color => {
    const arr = RGBTo255(color);
    return RGBAToHex(...arr);
}