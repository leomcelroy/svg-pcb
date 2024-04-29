
```js
{
  name: "footprintName",
  pads: [
    {
      id: "GND", // is this unique? if not is it name? what if internally connected
      // net: "GND",
      pos: [0, 0],
      shape: "M 0,0 ...", // or polylines[]
      layers: ["F.Cu", "B.Cu", "F.Mask", "B.Mask", "*.Cu", ...],
      drill: {
        diameter: 0.02, // or radius
        start: "F.Cu",
        end: "B.Cu",
        plated: false // can something other than a hole be plated
      },
      maskOffset: .03 // solderMaskMargin, maskMargin
    }
  ]
}
```

```js
const board = createPCB({
  // footprints: { id: footprint }, ?
  components: [
    {
      id: "R1206_50ohm_0", // unique and displayed as label
      footprint: ..., // string or { ... }
      translate: [0, 1],
      rotate: 90,
      flip: false
    }
  ],
  nets: [
    {
      name: "GND",
      pads: [
        [ "componentId", "padId" ]
      ]
    }
  ],
  wires: [
    {
      points: [ [x, y]... ],
      thickness: .015,
      layer: "F.Cu",
    }
  ],
  shapes: [
    {
      shape: [ [ [x, y]... ]... ] // polylines? "M ..."
      layer: "F.Cu",
    }
  ]
});
```

```js
board.addComponent({ ... }) // (footprint, { ... })
board.addNet({ ... }) // ({ ... })
board.addWire({ ... }) // (points, thickness, layer)
board.addShape({ ... }) // (shape, layer)
// board.add()

board.getLayer(layerName, flatten = false)

// board.components
// board.wires
// board.shapes
// board.nets

// board.getComponentById
// board.query("componentId", ?"padId", ?"x" | "y" | "xy")

// board.toJSON()

// board.getPadLabels()
// board.getComponentLabels()

```

```js
const via = (diameterHole, diameterCopper, layers = ["F.Cu", "B.Cu"]) => ({
  "via": {
    pos: [0, 0],
    layers: layers,
    shape: getPathData(circle(diameterCopper/2)),
    drill: {
      diameter: diameterHole,
      start: layers[0],
      end: layers[1],
      plated: true
    },
  }
})

createText(...)

renderPCB({
  pcb: board,
  layers: [
    {
      name: "F.Cu",
      color: "#00ff00ff"
    }
  ],
  mmPerUnit: 25.4,
  limits: { // what if I want this to be an offset of the board
    x: [ 0, 1 ],
    y: [ 0, 1 ]
  },
  background: "#ffff00ff"
})
```

```js
pt(0, 0)

path(
  ["point", [0, 0]],
  ["fillet", .3, [1, 1]],
  ["cubic", [ .2, .3 ], [ .5, .4 ], [5, 3 ] ],
  ["chamfer", .3, [ 3, 4 ]]
)
```

```js
const comp0 = board.addComponent({ footprint });

comp0.pad("padId");
comp0.padX("padId");
comp0.padY("padId");
comp0.pos();
comp0.posX();
comp0.posY();
```

need a function which can verify structure of text

EDITORS

- footprint editor
- 

OBJECTIVES

- be able to use sub-boards
  - allow users to adjut parameterized components/footprints
- be direct manipulation first

