// toHaveBennCalled는 실무에서 잘 사용하지 않음
import { sum, obj } from "./toHaveBeenCalled";

test("sum 함수가 호출되었다.", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalled();
});

test("sum 함수가 1,2와 함께께 호출되었다.", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledWith(1, 2);
});

// 새로운 spy 함수를 만듬
test("sum 함수가 1번 호출되었다.(spy 함수 생성)", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledTimes(1);
});

// obj의 minus 함수를 변형시킴
test("obj.minus 함수가 1번 호출되었다.(spy 함수 변형)", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});
