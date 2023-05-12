import { BOARD_THICKNESS, 
  KICAD_PCB_VERSION, 
  KiCadBoardFileBuilder, 
  PAPER_SIZE, 
  PAD_TO_MASK_CLEARANCE } from "../js/events/downloadKiCad";
import { APP_NAME } from "../js/constants";

// Some helper functions such as a basic sexpression parser here
function getSection(sectionName) {

  // Look for the beginning of the section
  let re = new RegExp('\\(' + sectionName);
  let match = result.search(re);

  // Prepare some basic variables for capturing the hierarchy
  let depth = 1; // We have one opening ( already
  let content = '(';
  let index = match + 1;

  while (depth > 0) {
    const str = result.substring(index, index + 1);
    content += str;

    if (str === '(') {
      depth++;
    } else if (str === ')') {
      depth--;
    }

    index++;
  }

  return content;
}

const board = new KiCadBoardFileBuilder();
let result = board.toString();

test('Board file should have an closing bracked for each opening one', () => {
  const reOpen = /\(/gm;
  const reClose = /\)/gm;
  const matchOpen = result.match(reOpen);
  const matchClose = result.match(reClose);
  expect(matchOpen.length).toBe(matchClose.length);
});

test('KiCad PCB version should appear only once', () => {
  let re = /\(version ([0-9]{8})\)/gm;
  let match = result.match(re);
  expect(match.length).toBe(1);
});

test('KiCad PCB version should match the KICAD_PCB_VERSION constant', () => {
  const re = /\(version ([0-9]{8})\)/;
  const match = result.match(re);
  expect(match[1].length).toBe(8);
  expect(match[1]).toBe(KICAD_PCB_VERSION);
});

test('KiCad PCB generator token should appear only once', () => {
  const re = /\(generator (.+)\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('KiCad PCB generator token attribute should match APP_NAME constant', () => {
  const re = /\(generator (.+)\)/;
  const match = result.match(re);
  expect(match[1]).toBe(APP_NAME);
});

// Tests like these could be more sophisticated if a simple parser would be involved
test('KiCad board file should contain a general section', () => {
  const re = /\(general/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('KiCad board general section should contain a thickness token', () => {
  const re = /\(general[^]*\(thickness[^0-9]+([0-9\.]+)\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('KiCad board thickness token attribute should match BOARD_THICKNESS constant', () => {
  const re = /\(general[^]*\(thickness[^0-9]+([0-9\.]+)\)/;
  const match = result.match(re);
  expect(parseFloat(match[1])).toBe(BOARD_THICKNESS);
});

test('Board thickness should be 1.6 mm', () => {
  expect(BOARD_THICKNESS.toString()).toBe('1.6');
});

test('KiCad board page size constant should be A4', () => {
  expect(PAPER_SIZE).toBe('A4');
});

test('Page size should be in KiCad board file', () => {
  const re = /\(paper "(.+)"\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('KiCad board page size should match PAGE_SIZE constant', () => {
  const re = /\(paper "(.+)"\)/;
  const match = result.match(re);
  expect(match[1]).toBe(PAPER_SIZE);
})

test('KiCad board file should contain a layers section', () => {
  const re = /\(layers/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('Board file should contain 5 layer definitions', () => {
  const re = /\(([0-9]{1,2})[^"]+"([^"]+)[^a-z]+(jumper|mixed|power|signal|user)\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(5);
});

test('Board should contain F.Cu layer definition', () => {
  const re = /\(([0-9]{1,2})[^"]+"F\.Cu"[^a-z]+signal\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('Board should contain B.Cu layer definition', () => {
  const re = /\(([0-9]{1,2})[^"]+"B\.Cu"[^a-z]+signal\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('Board should contain F.Mask layer definition', () => {
  const re = /\(([0-9]{1,2})[^"]+"F\.Mask"[^a-z]+user\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('Board should contain B.Mask layer definition', () => {
  const re = /\(([0-9]{1,2})[^"]+"B\.Mask"[^a-z]+user\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('Board should contain Edge.Cuts layer definition', () => {
  const re = /\(([0-9]{1,2})[^"]+"Edge\.Cuts"[^a-z]+user\)/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('Board file should have a setup section', () => {
  const re = /\(setup/gm;
  const match = result.match(re);
  expect(match.length).toBe(1);
});

test('The body of the setup section should contain pad to mask clearance', () => {
  const content = getSection('setup');
  
  let re = /\(pad_to_mask_clearance ([0-9]+)\)/gm;
  let match = content.match(re);
  expect(match.length).toBe(1);

  re = /\(pad_to_mask_clearance ([0-9]+)\)/;
  match = content.match(re);
  expect(parseInt(match[1])).toBe(PAD_TO_MASK_CLEARANCE);
});

test('There should be only one empty nets section at the moment', () => {
  const board = new KiCadBoardFileBuilder();
  const result = board.toString();

  const reNetGlobal = /\(net 0 ""\)/gm;
  const matchNetGlobal = result.match(reNetGlobal);
  expect(matchNetGlobal.length).toBe(1);
});

