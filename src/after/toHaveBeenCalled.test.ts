import { sum, obj } from "./toHaveBeenCalled";

test("is sum funciton Called?", () => {
  const spyFn = jest.fn(sum);
  spyFn(1, 2);
  expect(spyFn).toHaveBeenCalled();
});

test("how many sum funciton Called?", () => {
  const spyFn = jest.fn(sum);
  spyFn(1, 2);
  expect(spyFn).toHaveBeenCalledTimes(1);
  expect(spyFn).not.toHaveBeenCalledTimes(2);
});

test("is sum funciton called with 1, 2", () => {
  const spyFn = jest.fn(sum);
  spyFn(1, 2);
  expect(spyFn).toHaveBeenCalledWith(1, 2);
  expect(spyFn).not.toHaveBeenCalledWith(2, 4);
});

test("is obj.minus funciton Called?", () => {
  const spyFn = jest.fn(obj.minus);
  spyFn(1, 2);
  expect(spyFn).toHaveBeenCalledTimes(1);
  expect(spyFn).not.toHaveBeenCalledTimes(2);
});

test("is obj.minus funciton Called? with spyOn", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);

  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});
