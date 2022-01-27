// npm install -g assemblyscript
// npm install -S assemblyscript
// asc appserver/src/cmd/fib.ts --binaryFile appserver/fib.wasm --optimize
// npm run -w appserver start

declare function consoleLog(arg0: i32): void;

export function fib(n: i32): i32 {
  let a = 0;
  let b = 1;
  if (n > 0) {
    while (--n) {
      consoleLog(n);
      const t = a + b;
      a = b;
      b = t;
    }
    return b;
  }
  return a;
}
