import { BOARD_THICKNESS, KiCadBoardFileBuilder, PAPER_SIZE, getVersionYYYYMMDD } from "../js/events/downloadKiCad";
import { global_state } from "../js/global_state";

test('Version should match YYYYMMDD format', () => {
  const version = getVersionYYYYMMDD();
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  expect(version.length).toBe(8);
  expect(version.substring(0, 4)).toBe(year.toString());
  expect(version.substring(4, 6)).toBe(month.toString());
  expect(version.substring(6, 8)).toBe(day.toString());
});

test('File should contain header and footer', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  expect(result).toBeTruthy();
  expect(result.startsWith('(kicad_pcb')).toBeTruthy();
  expect(result.endsWith(') ;; kicad_pcb')).toBeTruthy();

  // Check if version is present
  const reVersion = /\(version\s[0-9]{8}\)/gm;
  const maVersion = result.match(reVersion);
  expect(maVersion.length).toBe(1);

  // Check if generator is present
  const reGenerator = /\(generator SvgPcb\)/gm;
  const maGenerator = result.match(reGenerator);
  expect(maGenerator.length).toBe(1);
});

test('File should contain the general section with attributes', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  // Match globaly, we expect only one match here
  let re = /(\(general)([^\#]+)(\) ;; general)/g;
  let match = result.match(re);
  expect(match.length).toBe(1);

  // Match locally and return groups for eval
  re = /(\(general)([^\#]+)(\) ;; general)/;
  match = result.match(re);
  expect(match[2].trim()).toBe(`(thickness ${BOARD_THICKNESS})`);
});

test('Board thickness should be 1.6 mm', () => {
  expect(BOARD_THICKNESS.toString()).toBe('1.6');
});

test('Page settings should be present', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  // Match globally to check if we have one instance only
  let re = /(\(paper)([^\#]+)(\) ;; paper)/g;
  let match = result.match(re);
  expect(match.length).toBe(1);

  // Match locally to see if we get the expected paper size
  re =  /(\(paper)([^\#]+)(\) ;; paper)/;
  match = result.match(re);
  expect(match[2].trim()).toBe(`"${PAPER_SIZE}"`);
});

test('Layers section should be present', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  // Check for layers section globally, there should be only one block
  let re = /(\(layers)([^\#]+)(\) ;; layers)/gm;
  let match = result.match(re);
  expect(match.length).toBe(1);

  // Check if there are actual layers present
  re = /(\(layers)([^\#]+)(\) ;; layers)/;
  match = result.match(re);
  expect(match[2].trim().length).not.toBe(0);

  // Now we take only the layer list part and match that globally
  re = /\(([0-9]{1,2}) ("[^"]+") (jumper|mixed|power|signal|user)\)/g;
  const layers = match[2].match(re);
  expect(layers.length).not.toBe(0);

  // Use this to match individual layers and get their attribute
  re = /\(([0-9]{1,2}) ("[^"]+") (jumper|mixed|power|signal|user)\)/;

  // Check if all required layers are present
  let foundFCu = false;
  let foundBCu = false;
  let foundFMask = false;
  let foundBMask = false;
  let foundEdgeCuts = false;
  layers.forEach((layer) => {
    const ma = layer.match(re);
    const ordinal = parseInt(ma[1]);
    const name = ma[2].replace(/"/g, '');
    const type = ma[3];
    if (ordinal === 0 && name === `F.Cu` && type === `signal`) {
      foundFCu = true;
    }
    if (ordinal === 31 && name === `B.Cu` && type === `signal`) {
      foundBCu = true;
    }
    if (ordinal === 38 && name === `B.Mask` && type === `user`) {
      foundBMask = true;
    }
    if (ordinal === 39 && name === `F.Mask` && type === `user`) {
      foundFMask = true;
    }
    if (ordinal === 44 && name === `Edge.Cuts` && type === `user`) {
      foundEdgeCuts = true;
    }
  });
  expect(foundFCu).toBeTruthy();
  expect(foundBCu).toBeTruthy();
  expect(foundFMask).toBeTruthy();
  expect(foundBMask).toBeTruthy();
  expect(foundEdgeCuts).toBeTruthy();
});

test('Setup section should be present', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  // We need one only setup section
  const reSetupGlobal = /\(setup([^]+)\) ;; setup/gm;
  const matchSetupGlobal = result.match(reSetupGlobal);
  expect(matchSetupGlobal.length).toBe(1);

  // Extract contents of setup section
  const reSetup = /\(setup([^]+)\) ;; setup/;
  const matchSetup = result.match(reSetup);
  expect(matchSetup.length).not.toBe(0);
  
  const setupContent = matchSetup[1];
  expect(setupContent.length).not.toBe(0);

  // Look for pad to mask clearance
  const reClearance = /\(pad_to_mask_clearance 0\)/gm;
  const matchClearance = setupContent.match(reClearance);
  expect(matchClearance.length).toBe(1);
});

test('There should be only one empty nets section at the moment', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  const reNetGlobal = /\(net 0 ""\)/gm;
  const matchNetGlobal = result.match(reNetGlobal);
  expect(matchNetGlobal.length).toBe(1);
});

