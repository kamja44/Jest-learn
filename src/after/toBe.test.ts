import { sum } from "./toBe";

test("sum", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).not.toBe(4);
  expect(sum(1, 2)).toBe(3);
});
