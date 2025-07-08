beforeEach(() => {
  // JS에서 모듈을 import하면 캐싱되어 있어서 prop을 할당하고 다시 모듈을 불러오면 해당 prop이 캐싱되어있다.
  // jest.resetModules()를 이용하여 캐싱된 데이터를 삭제하여 진행하 수 있다.
  jest.resetModules();
});

test("first import", async () => {
  const c = await import("../requireActual/mockClass");
  (c as any).prop = "hello";
  expect(c).toBeDefined();
});

// only => only를 제외한 나머지 테스트는 skip된다
// test.only("secnod import", async () => {
//   const c = await import("../requireActual/mockClass");
//   expect((c as any).prop).toBe("hello");
// });
xtest("secnod import", async () => {
  const c = await import("../requireActual/mockClass");
  expect((c as any).prop).toBe("hello");
});
