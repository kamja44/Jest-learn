## Jest 핵심 Matcher 사용법: `toBe`, `toStrictEqual`, `toMatchObject` 완벽 정리

Jest로 테스트 코드를 작성할 때 가장 기본이 되면서도 헷갈리는 것이 바로 Matcher입니다. Matcher는 `expect` 함수로 값을 감싼 뒤, 그 값이 예상과 일치하는지 확인하는 역할을 합니다.

이번 포스트에서는 가장 자주 사용되는 세 가지 Matcher인 `toBe`, `toStrictEqual`, `toMatchObject`의 차이점과 올바른 사용법을 예제 코드와 함께 알아보겠습니다.

### 1. `toBe` - 원시(Primitive) 값의 일치 여부 확인

`toBe` Matcher는 `Object.is`를 사용하여 두 값이 정확히 같은지(===) 확인합니다. 주로 숫자, 문자열, 불리언 등 원시(Primitive) 타입의 값을 비교할 때 사용됩니다.

**`sum` 함수 예제 (`src/after/toBe.ts`)**

```typescript
export function sum(x: number, y: number) {
  return x + y;
}
```

**테스트 코드 (`src/after/toBe.test.ts`)**

```typescript
import { sum } from "./toBe";

test("sum", () => {
  // sum(1, 2)의 결과는 3이므로 테스트를 통과합니다.
  expect(sum(1, 2)).toBe(3);

  // 결과값 3은 4가 아니므로 not과 함께 사용해도 통과합니다.
  expect(sum(1, 2)).not.toBe(4);
});
```

> **주의!** `toBe`는 객체나 배열을 비교하는 데 적합하지 않습니다. 객체나 배열은 참조(reference) 타입이므로, 내용이 같더라도 메모리 주소가 다르면 `toBe`는 `false`를 반환합니다.

---

### 2. `toStrictEqual` - 객체와 배열의 완벽한 일치 여부 확인

`toStrictEqual`은 객체의 모든 속성과 배열의 모든 요소가 재귀적으로 같은지 깊은(deep) 비교를 수행합니다. 객체나 배열의 내용 전체를 비교하고 싶을 때 사용합니다.

**`obj` 함수 예제 (`src/after/toStrictEqual.ts`)**

```typescript
export function obj() {
  return {
    a: "hello",
  };
}
```

**테스트 코드 (`src/after/toStrictEqual.test.ts`)**

```typescript
import { obj } from "./toStrictEqual";

// 객체끼리 비교
test("toStrictEqual with Object", () => {
  // obj()가 반환하는 객체와 { a: "hello" }는 내용이 완전히 같으므로 통과합니다.
  expect(obj()).toStrictEqual({
    a: "hello",
  });

  // 내용이 같아도 참조 주소가 다르므로 toBe는 실패합니다.
  expect(obj()).not.toBe({
    a: "hello",
  });
});

// 배열끼리 비교
test("toStrictEqaul with Array", () => {
  // 배열의 내용이 완전히 같으므로 통과합니다.
  expect([1, 2, 3]).toStrictEqual([1, 2, 3]);

  // 배열도 객체와 마찬가지로 toBe로는 비교할 수 없습니다.
  expect([1, 2, 3]).not.toBe([1, 2, 3]);
});
```

---

### 3. `toMatchObject` - 객체의 일부 속성만 확인

`toMatchObject`는 기대하는 객체가 실제 객체의 부분집합인지 확인합니다. 즉, 실제 객체에 더 많은 속성이 있더라도, 기대하는 객체의 모든 속성과 값이 일치하면 테스트를 통과시킵니다.

특히 클래스(Class)의 인스턴스를 테스트할 때 유용합니다. `toStrictEqual`은 클래스 인스턴스와 일반 객체 리터럴을 다르게 취급하지만, `toMatchObject`는 속성만 비교하므로 더 유연하게 사용할 수 있습니다.

**`TestObj` 클래스 예제 (`src/after/toMatchObject.ts`)**

```typescript
class TestObj {
  a: string;
  constructor(str) {
    this.a = str;
  }
}
export function obj(str: string) {
  return new TestObj(str);
}
```

**테스트 코드 (`src/after/toMatchObject.test.ts`)**

```typescript
import { obj } from "./toMatchObject";

test("toMatchObject", () => {
  // obj("hello")는 TestObj의 인스턴스이지만,
  // { a: "hello" } 라는 속성을 포함하고 있으므로 통과합니다.
  expect(obj("hello")).toMatchObject({
    a: "hello",
  });

  // 반면, toStrictEqual은 클래스 인스턴스와 객체 리터럴을
  // 다른 것으로 취급하므로 실패합니다.
  expect(obj("hello")).not.toStrictEqual({
    a: "hello",
  });
});
```

---

### 정리

| Matcher             | 비교 대상                   | 설명                                                                  |
| :------------------ | :-------------------------- | :-------------------------------------------------------------------- |
| **`toBe`**          | 원시 값 (number, string 등) | `Object.is` (===)를 사용하여 **정확한 값**을 비교합니다.              |
| **`toStrictEqual`** | 객체, 배열                  | 객체/배열의 **모든 속성/요소**가 재귀적으로 동일한지 깊게 비교합니다. |
| **`toMatchObject`** | 객체                        | 객체가 특정 **속성들의 집합**을 포함하는지 확인합니다. (부분 집합)    |

테스트의 목적에 맞는 정확한 Matcher를 사용하면 더 안정적이고 의미 있는 테스트 코드를 작성할 수 있습니다.

---

## Mocking: `jest.fn()`과 `jest.spyOn()`으로 의존성 제어하기

테스트를 작성할 때, 테스트 대상이 의존하는 다른 함수나 모듈의 동작을 제어해야 하는 경우가 많습니다. Jest는 `jest.fn()`과 `jest.spyOn()`이라는 강력한 모의(Mock) 함수 기능을 제공하여 이를 가능하게 합니다.

### 4. `jest.fn()` - 순수한 가짜 함수 만들기

`jest.fn()`은 아무런 구현도 가지지 않는 가장 기본적인 모의 함수를 생성합니다. 이 함수는 호출되었는지, 어떤 인수로 호출되었는지 등을 추적할 수 있는 특별한 속성(`.mock`)을 가지고 있습니다.

### 5. `jest.spyOn()` - 기존 함수의 동작 감시 및 조작

`jest.spyOn(object, methodName)`은 이미 존재하는 객체의 메서드를 "감시(spy)"하는 역할을 합니다. 기존 구현을 그대로 둔 채로 호출 여부만 추적하거나, `mockImplementation`, `mockReturnValue` 등을 사용해 일시적으로 동작을 변경할 수 있습니다.

**테스트 대상 코드 (`src/Before/mockFunction/mockFunction.ts`)**

```typescript
export const obj = {
  minus(x: number, y: number) {
    return x - y;
  },
};
```

**사용 예제 (`src/Before/mockFunction/mockFunction.spec.ts`)**

**1) 단순 호출 추적**

```typescript
test("obj.minus 함수가 1번 호출되었다.(spy 삽입)", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1); // 원래 함수가 그대로 실행됨
});
```

**2) 함수 구현 변경 (`mockImplementation`)**

```typescript
test("obj.minus에 스파이를 심고 리턴값을 변경", () => {
  jest.spyOn(obj, "minus").mockImplementation(() => 5);
  const result = obj.minus(1, 2);
  expect(result).toBe(5); // 구현이 변경되어 5를 반환
});
```

**3) 반환 값만 변경 (`mockReturnValue`)**

```typescript
test("mock을 이용하여 return값만 변경", () => {
  jest.spyOn(obj, "minus").mockReturnValue(5);
  const result = obj.minus(1, 2);
  expect(result).toBe(5);
});
```

**4) 한 번만 동작 변경 (`...Once`)**
`mockImplementationOnce`와 `mockReturnValueOnce`를 사용하면 호출 순서에 따라 다른 동작을 지정할 수 있습니다.

```typescript
test("mockReturnValueOnce 사용 예제", () => {
  jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(5) // 첫 번째 호출
    .mockReturnValueOnce(8); // 두 번째 호출

  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2); // 세 번째는 설정이 없으므로 원래 함수 실행

  expect(result1).toBe(5);
  expect(result2).toBe(8);
  expect(result3).toBe(-1);
});
```

---

### 6. Mock 함수 호출 검증

`jest.fn()`이나 `jest.spyOn()`으로 만든 모의 함수는 그 자체로도 유용하지만, 진짜 강력함은 호출 관련 Matcher와 함께 사용할 때 드러납니다.

- **`.toHaveBeenCalled()`**: 모의 함수가 **한 번 이상** 호출되었는지 확인합니다.
- **`.toHaveBeenCalledTimes(number)`**: 모의 함수가 정확히 `number`만큼 호출되었는지 확인합니다.
- **`.toHaveBeenCalledWith(arg1, arg2, ...)`**: 모의 함수가 특정 인수들과 함께 **마지막으로** 호출되었는지 확인합니다.
- **`.toHaveBeenLastCalledWith(arg1, arg2, ...)`**: `.toHaveBeenCalledWith`와 동일합니다.
- **`.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ...)`**: 모의 함수가 `nthCall`번째로 호출되었을 때 특정 인수들이 사용되었는지 확인합니다.

**사용 예제**

```typescript
test("모의 함수 호출 검증하기", () => {
  const mockFn = jest.fn();

  mockFn("a");
  mockFn("b", "c");

  // 함수가 한 번 이상 호출되었는가?
  expect(mockFn).toHaveBeenCalled();

  // 함수가 정확히 2번 호출되었는가?
  expect(mockFn).toHaveBeenCalledTimes(2);

  // 마지막 호출의 인수가 "b", "c" 였는가?
  expect(mockFn).toHaveBeenCalledWith("b", "c");
  expect(mockFn).toHaveBeenLastCalledWith("b", "c");

  // 첫 번째 호출의 인수가 "a" 였는가?
  expect(mockFn).toHaveBeenNthCalledWith(1, "a");
});
```

---

### Mock 정리 및 복원

테스트 격리를 위해 스파이를 사용한 후에는 반드시 정리해야 합니다. `afterEach` 내에서 `jest.restoreAllMocks()`를 호출하는 것이 가장 좋은 방법입니다.

- **`mock.calls`**: 함수가 호출될 때 사용된 인수의 배열.
- **`mockClear()`**: `mock.calls`와 `mock.instances`만 초기화.
- **`mockReset()`**: `mockClear()`를 포함하여 모든 mock 구현을 초기화.
- **`mockRestore()`**: `mockReset()`을 포함하여 원래 구현으로 완전히 복원 (`spyOn` 사용 시에만 유효).

```typescript
afterEach(() => {
  // 모든 mock을 원래의 구현으로 복원합니다.
  jest.restoreAllMocks();
});
```

# ✅ Jest 모의(Mock) 함수 동작 제어 완벽 가이드

**`mockImplementation`, `mockReturnValue`, `mockImplementationOnce`, `mockReturnValueOnce` 차이점 정리**

Jest로 테스트할 때, 함수의 실제 동작을 대체하기 위해 `jest.fn()`을 자주 사용합니다.  
하지만 단순한 호출 여부만 확인하는 것을 넘어, **함수의 반환값이나 동작을 바꿔야 할 경우** `mockImplementation`이나 `mockReturnValue` 같은 메서드가 필요합니다.

이 포스트에서는 가장 자주 사용하는 네 가지 메서드를 중심으로 **차이점과 실제 예제**를 정리합니다.

---

## 1. `mockImplementation(fn)`

> 지정한 함수로 mock 함수의 **동작을 완전히 대체**합니다.

```ts
const mockFn = jest.fn().mockImplementation((x, y) => x + y);
mockFn(2, 3); // 5
```

- 복잡한 로직, 조건 분기, API 흉내 등 **동적인 동작**이 필요한 경우 사용
- 여러 번 호출해도 동일한 구현을 계속 사용

---

## 2. `mockReturnValue(value)`

> 지정한 값 하나만 **항상 반환**합니다.

```ts
const mockFn = jest.fn().mockReturnValue(100);
mockFn(); // 100
mockFn(); // 100
```

- 특정 값만 단순히 반환하면 되는 경우 적합
- 내부 로직 없이 반환값만 필요한 **단순 stub**에 유용

---

## 3. `mockImplementationOnce(fn)`

> **딱 한 번만** 지정한 함수로 동작  
> 이후에는 기본 동작(`undefined`) 또는 다음 `.mockImplementationOnce`가 적용됨

```ts
const mockFn = jest
  .fn()
  .mockImplementationOnce(() => "first")
  .mockImplementationOnce(() => "second");

mockFn(); // "first"
mockFn(); // "second"
mockFn(); // undefined
```

- 호출 순서에 따라 서로 다른 구현을 주고 싶을 때 사용
- 예: **API 첫 번째 호출만 실패**시키고 이후는 성공하도록 설정할 때

---

## 4. `mockReturnValueOnce(value)`

> **딱 한 번만** 지정한 값을 반환  
> 이후에는 `undefined` 또는 다음 `.mockReturnValueOnce`가 적용됨

```ts
const mockFn = jest.fn().mockReturnValueOnce("A").mockReturnValueOnce("B");

mockFn(); // "A"
mockFn(); // "B"
mockFn(); // undefined
```

- 호출 순서에 따라 **결과를 바꾸는 테스트**에 유용
- 복잡한 로직 없이 **값만 순차적으로 바꿔야 할 때** 적합

---

## ✅ 언제 무엇을 써야 할까?

| 메서드                       | 사용 시점                         | 특징                           |
| ---------------------------- | --------------------------------- | ------------------------------ |
| `mockImplementation(fn)`     | 동작 자체를 완전히 제어할 때      | 복잡한 함수 로직 필요할 때     |
| `mockReturnValue(val)`       | 항상 같은 값만 반환하면 될 때     | 로직 없이 값만 필요한 경우     |
| `mockImplementationOnce(fn)` | 순차적으로 다른 구현을 써야 할 때 | 한 번만 다른 동작 필요         |
| `mockReturnValueOnce(val)`   | 순차적으로 다른 값을 반환할 때    | 간단한 값만 순서대로 반환할 때 |

---

## 🧪 호출 순서 따라 동작 바꾸기 예제

```ts
const mockFn = jest
  .fn()
  .mockReturnValueOnce("first")
  .mockReturnValueOnce("second")
  .mockImplementation(() => "default");

console.log(mockFn()); // "first"
console.log(mockFn()); // "second"
console.log(mockFn()); // "default"
console.log(mockFn()); // "default"
```

---

## 🧼 팁: 테스트 이후 mock 초기화는 필수!

```ts
afterEach(() => {
  jest.resetAllMocks(); // 모든 mock 상태 초기화
});
```
