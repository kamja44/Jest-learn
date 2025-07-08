import { obj } from "./toStrictEqual";

// 객체끼리 비교  toStrict Equal
test("toStrictEqual wit Object", () => {
  expect(obj()).toStrictEqual({
    a: "hello",
  });
  expect(obj()).not.toBe({
    a: "hello",
  });
});

test("toStrictEqaul with Array", () => {
  expect([1, 2, 3]).toStrictEqual([1, 2, 3]);
  expect([1, 2, 3]).not.toBe([1, 2, 3]);
});
