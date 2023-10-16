# Download Gerber

This page describes what to keep in mind when exporting Gerber files from SvgPcb. 

## What are Gerber Files?

Gerber file can be considered yet another (vector) graphics format. It describes geometry in a way specific to the PCB manufacturing process. The Gerber Format markup language can describe things like lines, pads and polygons as well as holes. Circuit board consists of layers and a Gerber file describes one layer at a time. You can learn more on the official [Gerber Format](https://www.ucamco.com/en/gerber) web page.

## Circuit Board Production

There are several ways to produce your (printed) circuit boards (PCBs).

1. Etching yourself
2. PCB milling
3. Ordering online

You will need Gerber files for PCB milling (e.g. using software such as [FlatCAM](http://flatcam.org/) or [CopperCAM](https://www.galaad.net/coppercam-eng.html))) or using one of many on-line manufacturing services such as [PCBWay](https://www.pcbway.com/), [JLCPCB](https://jlcpcb.com/) or [SeeedStudio](https://www.seeedstudio.com/).

If you choose to manufacture your PCB online, keep in mind that the naming of your Gerber files matters. Each file contains one layer and it is important to get the file names right so that the online service assigns the right manufacturing process to the layer in question.

## Preparing Design for Gerber Download

SvgPcb supports Gerber download, but it is important to take extra care when naming your layers. We decided to follow the [KiCad](https://www.kicad.org/) layer naming convention. The following layers are supported by the SvgPcb Download Gerber feature.

- `F.Cu`: Front copper
- `B.Cu`: Bottom copper
- `F.Mask`: Front mask
- `B.Mask`: Bottom mask
- `F.Silkscreen`: Front silkscreen
- `B.Silkscreen`: Bottom silkscreen
- `Edge.Cuts`: Outline and cutouts

In order to make sure that your layers are named correctly for online manufacturing, start with making sure that your footprints use the correct layer names. In the code below, we define a footprint for a 1206 size resistor and for each pad we specify that the geometry should be included on `F.Cu` and `F.Mask` layers. You should always use the `F` prefix in footprints. SvgPcb will automatically change it to `B` if you choose to flip the component on the bottom side of the PCB.

```
const R_1206 = footprint({
  "1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers": ["F.Cu","F.Mask"], "index":1},
  "2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0], "layers": ["F.Cu","F.Mask"], "index":2}
});
```

Let's make an example board.

```
let board = new PCB();
```

Then, make sure that the shape that defines the PCB outline is called `Edge.Cuts`. 

```
board.addShape("Edge.Cuts", path([0,0], [1,0], [1,1], [0,1]) );
board.addShape("Edge.Cuts", path([0,0], [1,0], [1,1], [0,1]) ); // Added to the Edge.Cuts layer
```

If you want to add graphics on the silkscreen layer, make sure create them first and add them with a layer name `F.Silkscreen` or `B.Silkscreen`, depending on the side of the PCB you want the graphics to be printed on.

```
board.addShape("F.Silkscreen", path([0.1, 0.1], [0.5, 0.1], [0.5, 0.5]) );
```

If you do not see it in the visual editor, make sure that you have assigned a color and moved it to the bottom of the layer stack in the `renderPCB` part of the code. 

```
renderPCB({
  pcb: board,
  layerColors: {
    "Edge.Cuts": "#000000ff",
    "F.Cu": "#be7a27cc",
    "F.Mask": "#ffa50aff",
    "F.Silkscreen": "#ffffffff"
  }
});
```

### Adding Graphics

```
board.addShape("F.Silkscreen", path([1.6, 1.5], [1.7, 1.4], [1.7, 1.5], [1.6, 1.5],) );
board.addShape("B.Silkscreen", path([1.1, 2.05], [1.1, 1.85], [1.25, 2], [1.1, 2.05],) );
```

### Adding Text

```
let txt = createText("IC1", {size: 0.1});
board.add(txt, { translate: pt(1.05, 1.05) });
```

## Downloading Gerber Files

To download Gerber files, choose **download** > **gerber** from the top menu bar. You will be presented with **Download Gerber Options**. First, choose the layers you want to download from the **Include Layers** list. If we consider the example above, make sure that the following are selected.

- F.Cu
- F.Mask
- F.Silkscreen
- Edge.Cuts

Enter a project name in the **Project Name** field. This name will be used as a prefix for all your Gerber files. For example **MyPCB** will name all layer files as follows.

- MyPCB-F_Cu.gbr
- MyPCB-F_Mask.gbr
- MyPCB-F_Silkscreen.gbr
- MyPCB-Edge_Cuts.gbr

Drills will become a separate file with an `.xln` extension. Under **Excellon Drill Units** You can choose if the drill coordinates and sizes are defined in millimeters (mm) or inches (in).

As for **Additional Options**, you can specify if the outline is included in all layers (useful for aligning layers in case that is needed later). Using Protel filenames may be useful using alternative PCB manufacturing options.

Click **Download** to download to download a zip archive with all Gerber files. If all done correctly, this should be ready for upload to an online manufacturing service website as is.

## If it Does Not Work

It may be that your design is unique and we have not covered some tricky edge case. Please submit an issue with your code and problems you are experiencing on [SvgPcb GitHub](https://github.com/leomcelroy/svg-pcb) repository.

