import { timer } from "./callback";

// callback을 test할때는 매개변수의 done을 사용해야 한다. => 사용하지 않으면 비동기와 마찬가지로 jest가 해당 동작을 인식하지 못한다.
test("callback 테스트", (done) => {
  timer((message: string) => {
    expect(message).toBe("success");
    done();
  });
});
