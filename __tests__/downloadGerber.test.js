import { GerberBuilder, inchesToMM } from "../js/events/downloadGerber";
import { global_state } from "../js/global_state";

test('GerberBuilder.toString() should return basic file structure if no shapes are built', () => {
  const builder = new GerberBuilder();
  const result = builder.toString();
  const generatorAttribute = '%TF.GenerationSoftware,Leo McElroy & Contributors,SvgPcb,v0.1*%\n';
  const sameCoordinatesAttribute = '%TF.SameCoordinates,Original*%\n';
  const mmUnitCommand = '%MOMM*%\n';
  const fsCommand = '%FSLAX46Y46*%\n';

  const lines = result.split('\n');
  const footer = lines[lines.length - 1].trim();

  expect(result).toContain(generatorAttribute);
  expect(result).toContain(sameCoordinatesAttribute);
  expect(result).toContain(mmUnitCommand);
  expect(result).toContain(fsCommand);
  expect(result).toMatch(/\%TF\.CreationDate,.+\*\%\n/);
  expect(footer).toBe('M02*');
});

test('GerberBuilder.toString() return value should contain file attributes when set', () => {
  const builder = new GerberBuilder();

  let fileFunction = 'Copper,L1,Top';
  builder.setFileFunction(fileFunction);
  let result = builder.toString();
  expect(result).toContain('%TF.FileFunction,' + fileFunction + '*%\n');

  let filePolarity = 'Positive';
  builder.setFilePolarity(filePolarity);
  result = builder.toString();
  expect(result).toContain('%TF.FilePolarity,' + filePolarity + '*%\n');
});

test('GerberBuilder.format() should never return empty string', () => {
  const result = GerberBuilder.format(0);
  expect(result).toBe("0");
});

test('GerberBuilder.format() should return value without leading zeroes', () => {
  const result = GerberBuilder.format(0.01);
  expect(result).toBe("10000");
});

test('Incomplete outline geometry should be fixed by adding first point as last one', () => {
  const layer = [
    [
      [
        [-0.5, 0.5],
        [0.5, 0.5],
        [0.5, -0.5],
        [-0.5, -0.5]
      ]
    ]
  ];

  const builder = new GerberBuilder();
  builder.plotOutline(layer);
  const result = builder.toString();
  const lines = result.split('\n');

  const gLines = []; // Geometry lines in Gerber output

  lines.forEach((line, i) => {
    // X(.+)Y(.+)D02
    // X(.+)Y(.+)D01

    // Look for a beginning of a the polygon
    const re = /X(-?[0-9]+)Y(-?[0-9]+)(D0[1|2])\*/gm;
    const match = re.exec(line);
    if (match !== null) {
      gLines.push(match);
    }
  });

  const expectedX = GerberBuilder.format( inchesToMM( layer[0][0][0][0] ) );
  const expectedY = GerberBuilder.format( inchesToMM( layer[0][0][0][1] ) );

  // We got 4 coords as input, but should get 5 points as output
  expect(gLines.length).toBe(5);

  // The first line should match the first element of our input
  expect(gLines[0][1]).toBe(expectedX);
  expect(gLines[0][2]).toBe(expectedY);
  
  // Last line should be the same as first line
  expect(gLines[gLines.length-1][1]).toBe(expectedX);
  expect(gLines[gLines.length-1][2]).toBe(expectedY);
});

test('Complete outline geometry should not be fixed', () => {
  const layer = [
    [
      [
        [-0.5, 0.5],
        [0.5, 0.5],
        [0.5, -0.5],
        [-0.5, -0.5],
        [-0.5, 0.5]
      ]
    ]
  ];

  const builder = new GerberBuilder();
  builder.plotOutline(layer);
  const result = builder.toString();
  const lines = result.split('\n');

  const gLines = []; // Geometry lines in Gerber output

  lines.forEach((line, i) => {
    // X(.+)Y(.+)D02
    // X(.+)Y(.+)D01

    // Look for a beginning of a the polygon
    const re = /X(-?[0-9]+)Y(-?[0-9]+)(D0[1|2])\*/gm;
    const match = re.exec(line);
    if (match !== null) {
      gLines.push(match);
    }
  });

  const expectedX = GerberBuilder.format( inchesToMM( layer[0][0][0][0] ) );
  const expectedY = GerberBuilder.format( inchesToMM( layer[0][0][0][1] ) );

  // We got 4 coords as input, but should get 5 points as output
  expect(gLines.length).toBe(5);

  // The first line should match the first element of our input
  expect(gLines[0][1]).toBe(expectedX);
  expect(gLines[0][2]).toBe(expectedY);
  
  // Last line should be the same as first line
  expect(gLines[gLines.length-1][1]).toBe(expectedX);
  expect(gLines[gLines.length-1][2]).toBe(expectedY);
});

/*

TODO: 

- Check if 0.1mm aperture for outline is created
- Check if the 0.1mm aperture is selected prior to drawing
- Check if linear interpolation is set before drawing

*/
