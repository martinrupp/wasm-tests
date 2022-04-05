# wasm-tests
Some expirements and examples with webassembly.

# wasm_node_ts

using AssemblyScript compiler API from https://www.assemblyscript.org/compiler.html to compile a fibonacci example to WASM,
then calling it with built-in [WebAssembly.instantiate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate) , all in TypeScript.


# wasm_as_bind

Using https://github.com/torch2424/as-bind to call a wasm/assemblyscript function that gets/returns a string.
Note that as-bind can currently only do native types, strings and arrays, but not complex types like `Person` below.

# wasm_ffi

Using https://github.com/DeMille/wasm-ffi , a wasm foreign function interface library to call complex objects like 

```
class Person {
  name: string;
  age: u8;
  favorite_number: u32;
}
```

as parameters / return values to/from functions.
This is still a bit buggy, since the string only returns one character.

# quickjs-emscripten

In this test, the WASM thing we execute is a whole JS Interpreter, and that interpreter can then run every JS code.
While not *compiling* the whole JS code to WASM, we still *execute* the whole JS in a WASM container.