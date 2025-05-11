import { obj } from "./module";

// jest.mock은 호이스팅 된다.
// 호이스팅을 원치 않으면 spyon을 사용하면 된다.
jest.mock("./module", () => {
  return {
    ...jest.requireActual("./module"),
    obj: {
      ...jest.requireActual("./module").obj,
      method3: jest.fn(),
    },
  };
});
test("모든 모듈 모킹", () => {
  jest.replaceProperty(obj, "prop", "replaced"); // 속성 수정
  console.log(obj);
});
