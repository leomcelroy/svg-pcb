# DEV LOG

### April 10, 2024

Changes to make

- change net list structure
- draw rats nest
- change layer object to layer list
- make components and wire directly manipulable
  - maybe should verify structure of data in specific spot (new PCB({...}))
- no ids when not passed
- remove wire list
- make layer order match code and ui

- update examples
- update footprint structure
  - { pads: {...} }
  - maybe should be list of pads so they don't need names/ids

- convert board into a footprint
  - how to determine what is a pad and what is just a shape


### April 4, 2024

updated examples to use id instead of label

### Aug 21, 2023

layer menu gives options from all layers in board
writes layers colors to match board
checks whichever layers match render object

layerColors -> layers
interior -> outline -> Edge.Cuts


is F.Mask being used?

### July 17, 2023

- fix kicad module parsing
  - shapes
  - silkscreen
- add `metadata` to component objects
- document component format
- improve ui
- pass information through `.property` not through html data attribute
- sort out what's going on with mask margin
- drcs connectivity check

- document

footprint
```
{
  padName: {
    pos: [0, 0],
    shape: "M 0,0 ...",
    layers: ["F.Cu", "B.Cu", "F.Mask", "B.Mask", "*.Cu", ...],
    drill: {
      diameter: 0.02, // or radius
      start: "F.Cu",
      end: "B.Cu",
      plated: false
    },
    index: 1,
    // solder_mask_margin
    // solderMaskMargin
    // maskMargin: 0
    // maskOffset: .03 // if not present then cover or if mask is in layer
  }
}
```

add
```
board.add(footprint, {
  translate: ops.translate || [0, 0],
  rotate: ops.rotate || 0,
  padLabelSize: ops.padLabelSize || 0.02,
  componentLabelSize: ops.componentLabelSize || 0.025,
  flip: ops.flip || false,
  id: ops.id || crypto.randomUUID(), // check id is unique if provided
})
```

### April 10, 2023

- change to drill api
- mask and mask margin
- netLists
- path gui
- footprint function
- hole rendering
  - done with interior now

sorting out
  - refDes (maybe should be called id)
  - name (label)
  - type?

change
  refDes -> id (automatically generated)
  name -> label
  add mask layers
  drills
    {
      diameter: 0.02,
      start: "F.Cu",
      end: "B.Cu",
      plated: false
    }
  add footprint function

svg import -> footprint(json)
add text

### April 5, 2023

- discussed footprint pad format
```
{
  padName: {
    pos: [0, 0],
    shape: "pathDataString",
    layers: ["F.Cu", "B.Cu", "F.Mask", "B.Mask"],
    drill: {
      diameter: 0.02, // or radius
      start: "F.Cu",
      end: "B.Cu",
      plated: false
    },
    index: 1,
    // solder_mask_margin
    // solderMaskMargin
    // maskMargin: 0
    // maskOffset: .03 // if not present then cover or if mask is in layer
  }
}
```
- interior does specify direction of shape in a way outline doesn't
- implicit assumption of layer names in gerber export?
- making a typeface (single line font?) for text
- how to render drills?
  - render with color of layers it connects
- fix gerber drill export
- solder masks
  - when to calculate mask offset?
  - first step is to not render mask
  - next is...
- supporting stars in layers eg `*.Mask` 

### March 30th, 2023

Spoke with Kris about
  - library for describing boards
    - based more on class composition
  - adding pin names to components
  - silkscreen text
    - single line font
    - function for converting string to component
      - default layer is silkscreen?
      ```
      const stringComp = makeComponent(string, scale)
      board.add(stringComp, { translate: [1, 0] });
      ```
  - layer naming convention
    - "interior" -> "outline" or "Edge.Cuts"
  - download modals
  - removing layer colors from render PCB (leave it as part of ui)?
  - renaming layers on export
  - adding types to board features
    - wires
    - vias
    - components
    - hole

    - could be done through the add method on board
    ```
    board.addComponent({
      component: {...}, // json for component
      translate: [0, 0],
      rotate: 0,
      refDes: "", // set automatically when variable declaration
      flip: true | false,
      padLabelSize: 0.002,
      componentLabelSize: 0.002,
      label: "", // currently called name
      // ?? layers
    });
    board.addWire([ [ pt ] ], thickness = 0.03, layer = "F.Cu");
    board.addVia({ // ?? can this be done through component
      layers: ["F.Cu", "B.Cu"],
      radii: [0.03, 0.03],
      holeRadius: 0.02
      // outerRadius, innerRadius, buriedRadius
    })
    board.hole({ // ??
      plated ?
    })
    ```
  - add silkscreen to component objects
  - holes
    - how is plating specified
      - could be done in "component" declaration
  - how are vias specified
  - how to specify plating vs non-plating holes
  - switch to bezier curves
  - when inferring constraints check that layers match
  ```
  {
    padName: {
      pos: [0, 0],
      shape: "pathDataString",
      layers: ["F.Cu", "B.Cu"], // drill is a special layer type
      ? drill: // or should this be a list
        {
          diameter: 0.02, // or radius
          ? hole: 0.01, // drill diameter
          top: "F.Cu",
          bottom: "B.Cu",
          plated: false
        },
      ,
      index: 1,
      ? plated: true | false // relevant if drill|hole
      ? maskOffset: 0.03
      ? type: "componentPad"
      ? tags: ["metadata"]
      ? metadata: {...}
    }
  }
  ```


  api change to component declarations
  ```
  board.components({
    C_1206: {...}
  })

  board.addComponent({
    component: "C_1206"
  })
  ```
  Would allow me to declare components which are expressions. But then have to declare all components added to board. 

  Current API is more accomodating to using expressions to create components on the fly.