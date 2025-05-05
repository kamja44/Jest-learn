import { obj } from "./toScriptEqual";

test("sum 함수는 두 숫자를 더해야 한다", () => {
  expect(obj()).toStrictEqual({ a: "hello" });
  expect(obj()).not.toBe({ a: "hello" });
});

// 객체끼리 비교할 때(배열 포함) => toStrictEqual 사용
// 객체끼리 비교할 때(배열 포함) 단, 클래스가 다를 때 => toMatchObjec사용
test("배열끼리도 toStrictEqual을 사용해야 한다.", () => {
  expect([1, 2, 3]).toStrictEqual([1, 2, 3]);
  expect([1, 2, 3]).not.toBe([1, 2, 3]);
});
