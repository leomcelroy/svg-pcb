import { snapToPad } from "../js/snapToPad";
import { global_state } from "../js/global_state";

test('snapToPad should always return an object', () => {
  global_state.snapToPad = true;
  let inputPoint = { x: 0.5, y: 0.6 };
  let result = snapToPad(inputPoint);
  
  expect(typeof result).toBe('object');
  expect(result).not.toBeNull();
  expect(result.constructor).toBe(Object);

  global_state.snapToPad = false;
  inputPoint = { x: 0.5, y: 0.6 };
  result = snapToPad(inputPoint);

  expect(typeof result).toBe('object');
  expect(result).not.toBeNull();
  expect(result.constructor).toBe(Object);
});

test('snapToPad should return the same point if no components present', () => {
  global_state.snapToPad = true;
  const inputPoint = { x: 0.5, y: 0.6 };
  const result = snapToPad(inputPoint);

  expect(Object.keys(inputPoint).length).toBe(Object.keys(result).length);
  expect(inputPoint.x).toBe(result.x);
  expect(inputPoint.y).toBe(result.y);
});