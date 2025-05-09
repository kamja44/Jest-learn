import { first, second, third } from "./order";

afterEach(() => {
  jest.restoreAllMocks();
});

test("first => second => third", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);
  spy1();
  spy2();
  spy3();
  //   console.log(spy1.mock.invocationCallOrder[0]);
  //   console.log(spy2.mock.invocationCallOrder[0]);
  //   console.log(spy3.mock.invocationCallOrder[0]);
  // 함수가 호출된 순서는 mock.invocationCallOrder에 들어있다.
  // 해당 인수가 []인 이유는 호출이 여러번 되면 해당 순서가 배열로 들어가기 때문이다.
  expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(
    spy2.mock.invocationCallOrder[0]
  );
});

// jest-extended
test("first => second => third", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);
  spy1();
  spy2();
  spy3();
  expect(spy1).toHaveBeenCalledBefore(spy2);
  expect(spy3).toHaveBeenCalledAfter(spy2);
});
