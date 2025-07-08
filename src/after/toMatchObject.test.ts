import { obj } from "./toMatchObject";

// Class는 toMatchObject 사용해야함
test("toMatchObject", () => {
  expect(obj("hello")).toMatchObject({
    a: "hello",
  });

  expect(obj("hello")).not.toStrictEqual({
    a: "hello",
  });
});
