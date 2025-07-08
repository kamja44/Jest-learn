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

| Matcher | 비교 대상 | 설명 |
| :--- | :--- | :--- |
| **`toBe`** | 원시 값 (number, string 등) | `Object.is` (===)를 사용하여 **정확한 값**을 비교합니다. |
| **`toStrictEqual`** | 객체, 배열 | 객체/배열의 **모든 속성/요소**가 재귀적으로 동일한지 깊게 비교합니다. |
| **`toMatchObject`** | 객체 | 객체가 특정 **속성들의 집합**을 포함하는지 확인합니다. (부분 집합) |

테스트의 목적에 맞는 정확한 Matcher를 사용하면 더 안정적이고 의미 있는 테스트 코드를 작성할 수 있습니다.
