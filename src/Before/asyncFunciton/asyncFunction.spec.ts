import * as fns from "./asyncFunction";

afterEach(() => {
  jest.restoreAllMocks();
});

// return값이 promise라면, resolves를 반드시 넣어줘야 한다.
// resolves를 사용할 경우(비동기 함수 테스트) 반드시 return을 붙여줘야 함 => 붙이지 않을 경우 resolves가 처리되기 전 test가 끝나서 에러가 발생했음에도 불구하고 테스트 통과
test("okPromise 테스트", () => {
  const okSpy = jest.fn(fns.okPromise);
  return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise mockResolved", () => {
  jest.spyOn(fns, "okPromise").mockResolvedValue("ok");
  return expect(fns.okPromise()).resolves.toBe("ok");
});
// then을 사용하면 resolves를 사용하지 않아도 된다. => 하지만, resolves와 동일하게 앞에 return을 붙여줘야 한다.
test("okPromise 테스트2", () => {
  const okSpy = jest.fn(fns.okPromise);
  return okSpy().then((result) => {
    expect(result).toBe("ok");
  });
});

test("noPromise 테스트", () => {
  const noSpy = jest.fn(fns.noPromise);
  return noSpy().catch((result) => {
    expect(result).toBe("no");
  });
});

test("noPromise mockRejectedValue", () => {
  jest.spyOn(fns, "noPromise").mockRejectedValue("no");
  return expect(fns.noPromise()).rejects.toBe("no");
});

test("noPromise mockReturnValue with Promise.reject", () => {
  jest.spyOn(fns, "noPromise").mockReturnValue(Promise.reject("no"));
  return expect(fns.noPromise()).rejects.toBe("no");
});

test("noPromise 테스트 2", () => {
  const noSpy = jest.fn(fns.noPromise);
  return expect(noSpy()).rejects.toBe("no");
});

// async를 이용하여 test진행 시 return은 명시하지 않아도 된다.
test("okPromise 테스트 3(async)", async () => {
  const okSpy = jest.fn(fns.okPromise);
  const result = await okSpy();
  expect(result).toBe("ok");
});

test("noPromise 테스트 3(async)", async () => {
  const noSpy = jest.fn(fns.noPromise);
  try {
    const result = await noSpy();
  } catch (error) {
    expect(error).toBe("no");
  }
});

// async test
test("okAsync 테스트", () => {
  const okSpy = jest.fn(fns.okAsync);
  return expect(okSpy()).resolves.toBe("ok");
});

test("okAsync 테스트2", () => {
  const okSpy = jest.fn(fns.okAsync);
  return okSpy().then((result) => {
    expect(result).toBe("ok");
  });
});

test("okAsync 테스트 3(async)", async () => {
  const okSpy = jest.fn(fns.okAsync);
  const result = await okSpy();
  expect(result).toBe("ok");
});

test("noAsync 테스트", () => {
  const noSpy = jest.fn(fns.noAsync);
  return noSpy().catch((result) => {
    expect(result).toBe("no");
  });
});

test("noAsync 테스트 2", () => {
  const noSpy = jest.fn(fns.noAsync);
  return expect(noSpy()).rejects.toBe("no");
});

test("noAsync 테스트 3(async)", async () => {
  const noSpy = jest.fn(fns.noAsync);
  try {
    const result = await noSpy();
  } catch (error) {
    expect(error).toBe("no");
  }
});
