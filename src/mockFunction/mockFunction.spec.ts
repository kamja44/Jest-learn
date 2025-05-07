import { obj } from "./mockFunction";

afterEach(() => {
  jest.restoreAllMocks();
});
// describe안에 테스트 라이프 사이클을 적용하면 해당 스코프 안에만 적용됨
describe("beforeEach/afterEach 적용", () => {
  beforeEach(() => {
    console.log("각 테스트 전 실행");
  });
  afterEach(() => {
    console.log("각 테스트 후 실행행");
    jest.restoreAllMocks();
  });
  test("obj.minus 함수가 1번 호출되었다.(spy 삽입)", () => {
    jest.spyOn(obj, "minus");
    const result = obj.minus(1, 2);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
  });

  // spy를 심되 실행은 안되게 하고 싶을 때(함수 호출 여부만 궁금할 때)
  test("obj.minus에 스파이를 심되, 실행은 안되게 ", () => {
    jest.spyOn(obj, "minus").mockImplementation();
    const result = obj.minus(1, 2);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    //   expect(result).toBe(-1);
  });
});
test("obj.minus 함수가 1번 호출되었다.(spy 삽입)", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

// spy를 심되 실행은 안되게 하고 싶을 때(함수 호출 여부만 궁금할 때)
test("obj.minus에 스파이를 심되, 실행은 안되게 ", () => {
  jest.spyOn(obj, "minus").mockImplementation();
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  //   expect(result).toBe(-1);
});

test("obj.minus에 스파이를 심고 리턴값을 변경 ", () => {
  jest.spyOn(obj, "minus").mockImplementation(() => 5); // 이러면 obj.minussms () => 5 함수가 됨
  // 인수 할당도 가능
  //   jest.spyOn(obj, "minus").mockImplementation((a, b) => a - b); // 이러면 obj.minussms () => 5 함수가 됨
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  //   expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(5);
});

// mockImplementation을 한 번만 실행
// mockImplementationOnce뒤에 mockImplementation을 붙여서 이후 계속 실행할 함수 지정이 가능하다.
test("mockImplementationOnce을 이용하여 한 번만 실행", () => {
  // 첫 번째 실행일 경우 (a, b) => a + b 함수가 실행되고 두 번쨰 실행일 경우 () => 5가 실행됨, 세 번째 실행일 경우 다시 원래 함수 호출(obj.minus 호출)
  const spyFn = jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);

  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(-1);

  spyFn.mockClear(); // Times, With 초기화
  spyFn.mockReset(); // mockClear + mockImplementation(() => {})
  spyFn.mockRestore(); // 전부 초기화
});

test("mock을 이용하여 return값만 변경", () => {
  jest.spyOn(obj, "minus").mockReturnValue(5);
  const result = obj.minus(1, 2);

  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(5);
});

// mockReturnValueOnce
test("mock을 이용하여 return값만 변경(mockReturnValueOnce)", () => {
  jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(5)
    .mockReturnValueOnce(8)
    .mockReturnValueOnce(3);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);

  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(5);
  expect(result2).toBe(8);
  expect(result3).toBe(3);
});
