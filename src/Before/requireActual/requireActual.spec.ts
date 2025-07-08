jest.mock("./mockFunc");
jest.mock("./mockClass");

// 여러가지 함수를 mocking하는 도중 하나의 함수만 mocking하고 싶을 때
jest.mock("./mockFunc", () => {
  return {
    ...jest.requireActual("./mockFunc"),
    double: jest.fn(),
  };
});

import func from "./mockFunc";
import c from "./mockClass";

// toBeDefined => expect가 undefined가 아니면 된다.
test("func와 c가 정의되어 있어야 한다.", () => {
  //   console.log(func, new c().methodA, new c().methodB);
  const original = jest.requireActual("./mockFunc"); // mocking된 function이 아닌 원본 함수
  console.log(original);
  expect(func).toBeDefined();
  expect(c).toBeDefined();
});
