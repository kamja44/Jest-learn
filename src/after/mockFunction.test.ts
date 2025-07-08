import { obj } from "./mockFunction";

test("is obj.minus funciton Called? with spyOn", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);

  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

test("is spy changed to mockFn", () => {
  const spy = jest.fn(obj.minus).mockImplementation();
  const result = spy(1, 2);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(result).not.toBe(-1);
});

test("is spy changed to mockFn and change return value", () => {
  const spy = jest.fn(obj.minus).mockImplementation(() => 5);
  const result = spy(1, 2);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(result).not.toBe(-1);
  expect(result).toBe(5);
});

test("is spy changed to mockFn Once", () => {
  const spy = jest
    .fn(obj.minus)
    .mockImplementationOnce((a, b) => a + b) // 한번만변겨오디니 여기선 + 로변경
    .mockImplementationOnce(() => 5); // 여기선 Once동작이 진행되었으니 a + b가 됨
  const result1 = spy(1, 2);
  const result2 = spy(1, 2);
  const result3 = spy(1, 2);

  expect(spy).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3); // (a, b) => a + b
  expect(result2).toBe(5); // () => 5
  expect(result3).toBe(-1); // (a, b) => a - b
});

test("is spy changed to mockFn Once and save return value", () => {
  const spy = jest
    .fn(obj.minus)
    .mockImplementationOnce((a, b) => a + b) // 한번만변겨오디니 여기선 + 로변경
    .mockImplementationOnce(() => 5) // 여기선 Once동작이 진행되었으니 a + b가 됨
    .mockImplementation(() => 3);
  const result1 = spy(1, 2);
  const result2 = spy(1, 2);
  const result3 = spy(1, 2);

  expect(spy).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3); // (a, b) => a + b
  expect(result2).toBe(5); // () => 5
  expect(result3).toBe(3); // () => 3
});

test("is spy's return value changed to mockFn's return value(mockReturnValue())", () => {
  // 함수 내부 구현은 변경하지 않고 value만 변경할때 사용하는게 mockReturnValue()임
  const spy = jest.fn(obj.minus).mockReturnValue(5);

  const result = spy(10, 2);

  expect(result).toBe(5);
  expect(spy).toHaveBeenCalledTimes(1);
});

test("is spy's return value changed to mockFn's return value(mockReturnValueOnce())", () => {
  const spy = jest
    .fn(obj.minus)
    .mockReturnValueOnce(5)
    .mockReturnValueOnce(3)
    .mockReturnValue(8);

  const result1 = spy(10, 2);
  const result2 = spy(10, 2);
  const result3 = spy(10, 2);

  expect(spy).toHaveBeenCalledTimes(3);

  expect(result1).toBe(5);
  expect(result2).toBe(3);
  expect(result3).toBe(8);
});
