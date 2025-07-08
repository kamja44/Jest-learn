import { after3days, timer } from "./date";

afterEach(() => {
  jest.useRealTimers();
});

test("3일 후 시간 리턴", () => {
  // FakeTimer를 사용했기 떄문에 이를 realTimer로 되돌려야 한다.
  jest.useFakeTimers().setSystemTime(new Date(2025, 5, 8));
  console.log(new Date());
  expect(after3days()).toStrictEqual(new Date(2025, 5, 11));
});

// jest는 5초안에 테스트가 통과하지 못하면 실패처리를 한다.
// 3번쨰 매개변수로 해당 시간 조작이 가능하지만, jest.advanceTimersByTime()를 사용하여 시간을 설정하거나 빨리 감는게 보편적이다.
test("timer test", (done) => {
  jest.useFakeTimers();
  timer((message: string) => {
    expect(message).toBe("success");
    done();
  });
  jest.advanceTimersByTime(10_000); // 10초 흐르게
});

// jest.runAllTimers()를 사용하기 위해선 반드시 useFakeTimers()를 사용해야 한다.
// 비동기 함수의 특성 상 expect가 성공하든 실패하든 비동기 함수가 통과하면 통과한다. => 이럴 경우 expect가 몇 번 실행되었는지 체크해야 함 => expect.assertions()를 사용하여 expect가 몇번 실행되었는지 체크
test("시간 빨리하는 테스트", (done) => {
  expect.assertions(1);
  jest.useFakeTimers();
  timer((message: string) => {
    expect(message).toBe("success");
    done();
  });
  jest.runAllTimers();
});
