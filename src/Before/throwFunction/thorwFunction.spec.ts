import { customError, CustomError, error } from "./throwFunction";

test("error test", () => {
  expect(() => error()).toThrow(Error);
  expect(() => customError()).toThrow(CustomError);
});

test("error test (try/catch)", () => {
  try {
    error();
  } catch (err) {
    expect(err).toStrictEqual(new Error()); // toStrictEqual로 비교하는 이유는 catch에 걸리면 객체이기 때문이다.
  }
});
