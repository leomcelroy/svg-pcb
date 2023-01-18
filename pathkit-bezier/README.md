## Things to Include

primitives
  path
    pt
    cubic
    fillet
    chamfer (could take radius or [x, y])
    relative
    turnForward
  circle
  square

affine
  translate
  scale
  rotate
  ? skew
  ? matrix

booleans
  union
  difference
  intersection
  xor

offset
  ? joint types, could default round
  jointtype
  endtype
  distance
thicken
? expand/contract
outline

getPoint
  lt
  lc
  lb
  ct
  cc
  cb
  rt
  rc
  rb
  centroid

roundCorners
copy
trim
reverse

## Considerations

fluent programming
  - like old gram-js
  - can be cleaner code

plain data structures
  - more extensible

geo.method(...) vs method(...)

overloaded transformation functions
take paths or shapes (arrays of paths)

how to access parts of path, l r c

Without class (like Turtle) can't store extra data beyond points 
so things like `arc` are difficult 

What should path return
  pts
    [
      [x, y],
      [x, y],
      [x, y]
    ]
  complete cubic beziers
    [
      [p0, h0, h1, p1],
      [p0, h0, h1, p1],
    ]
  chained cubic beziers
    [
      [hIn, hOut, point],
      [hIn, hOut, point],
    ]
  some mix of pts and cubics
  anchors like what the user writes
    [
      point,
      [h0, p0, h1],
    ]

```js
const c = circle(4.0);
translate(c, pt(0, 0));
scale(c, pt(-0.628, 0.819), getPoint(c, "lt"));

/*
const c = circle(4.0);
c
  .translate(pt(0, 0));
  .scale(pt(-0.628, 0.819), c.lt);


const c = geo.circle(4.0);
geo.translate(c, pt(0, 0));
geo.scale(pt(-0.628, 0.819), geo.getPoinr(c, "lt"));
*/

const p = path(
  pt(-4, 0),
  pt(-0.005, -3.944),
  pt(6.183, -1.715),
  pt(-1.895, 4.256),
  pt(-4, 0),
);

const final = difference(c, p);

render({
  d: getPathData(final),
  strokeWidth: 0.02
})
```
