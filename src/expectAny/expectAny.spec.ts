import { obj } from "./expectAny";

// expect.any => 랜덤한 값이 나올경우 사용할 수 있다.
test("expect.any test", () => {
  expect(obj()).toStrictEqual({
    a: expect.any(Number),
  });
});

// expect.closeTo => 부동소수점이 계산될때 처럼 근사값을 처리할 때 사용할 수 있다.
test("compare float in object properties", () => {
  expect({
    title: "0.1 + 0.2",
    sum: 0.1 + 0.2,
  }).toEqual({
    title: "0.1 + 0.2",
    sum: expect.closeTo(0.3, 5),
  });
});
