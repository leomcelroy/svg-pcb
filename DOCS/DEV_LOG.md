# DEV LOG

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
      layers: ["F.Cu", "drill"], // drill is a special layer type
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