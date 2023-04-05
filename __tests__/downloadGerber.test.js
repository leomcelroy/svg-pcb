import { GerberBuilder } from "../js/events/downloadGerber";
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

/*

TODO: 

- Check if outline shapes are closed

*/
