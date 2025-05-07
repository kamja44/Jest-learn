// return값만 Promise인 경우
export function okPromise() {
  return Promise.resolve("ok");
}

export function noPromise() {
  return Promise.reject("no");
}

// async function
export async function okAsync() {
  return "ok";
}

export async function noAsync() {
  throw "no";
}
