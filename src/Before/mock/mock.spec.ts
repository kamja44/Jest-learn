// 인수가 복잡할 경우는 아래와 같이 가장 중요한 인수만 테스트를 진행한다.
test("인수의 일부 테스트", () => {
  const fn = jest.fn();
  fn({
    a: {
      b: {
        c: "hello",
      },
      d: "bye",
    },
    e: ["f"],
  });
  expect(fn.mock.calls[0][0].a.b.c).toBe("hello");
});
