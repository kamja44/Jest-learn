export function timer(callback) {
  setTimeout(() => {
    callback("success");
  }, 3000);
}
