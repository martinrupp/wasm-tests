import * as asc from 'assemblyscript/cli/asc';
import * as fs from 'fs';

export async function main(myargs: readonly string[]) {
  await asc.ready;
  // asc.compileString // todo

  const filename = 'fib';

  asc.main(
    [
      `asc/${filename}.ts`,
      '--binaryFile',
      `dist/${filename}.wasm`,
      '--optimize',
    ],
    {
      stdout: process.stdout,
      stderr: process.stderr,
    }
  );

  const wasmBuffer = fs.readFileSync(`dist/${filename}.wasm`);
  const importObjects = {
    // this needs to be the same name as the file.wasm
    [filename]: {
      consoleLog: (value: number) => console.log(value),
    },
  };
  // instantiate(bytes: BufferSource, importObject?: Imports)

  const wasmModule = await WebAssembly.instantiate(wasmBuffer, importObjects);

  console.dir(wasmModule.instance.exports, { depth: null });
  console.dir(wasmModule.instance.exports.fib, { depth: null });

  const fib = wasmModule.instance.exports.fib as (a: number) => number;
  console.log(fib(9));
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
