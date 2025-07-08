export function after3days() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date;
}

// Timer test
export function timer(callback: (str: string) => void) {
  setTimeout(() => {
    callback("success");
  }, 10_000);
}
