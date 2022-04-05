# Description
This is a test using https://github.com/justjake/quickjs-emscripten .
We're running some JS code in a secure "VM".
We can have some time and memory limits.

# what we can do with QuickJS

- Passing external variables to QuickJS
- Setting Memory Limits in QuickJS
- Setting Execution Time Limits in QuickJS
- Passing functions to QuickJS

This works but currently involves some manual coding, see below
- Using functions within QuickJS and pass them values to the outside
- Using functions within QuickJS that return values from the outside


Todo:
- require syntax
- automatically serialize/deserialize parameters/return values (avoid manual code)

## required manual coding for passing in / returning from external functions

```typescript
 const rotateHandle = vm.newFunction("rotate", (...args) => {
    // get args
    const [vec, beta] = args.map(vm.dump);
    // calculation
    const vec2 = rotate(vec, beta);
    // construct return of {x: vec2.x, y: vec2.y}
    const obj = vm.newObject();    
    vm.newNumber(vec2.x).consume( (h) => vm.setProp(obj, 'x', h));
    vm.newNumber(vec2.y).consume( (h) => vm.setProp(obj, 'y', h));
    return obj;
  })
```

# how to run
Initialize with `npm i`, start with `npm run start`


# expected output
Expected output is like

```

---- Passing external variables to QuickJS ----
Success: It is 2022-04-05T09:27:21.138Z!

---- Setting Memory Limits in QuickJS ----
memoryLimitBytes = 7168, result = 123 ok, took 1 ms
Test Memory Limits:
memoryLimitBytes = 1055744, result = 2 ok, took 0 ms
memoryLimitBytes = 1055744, result = 4 ok, took 0 ms
memoryLimitBytes = 1055744, result = 8 ok, took 0 ms
memoryLimitBytes = 1055744, result = 16 ok, took 0 ms
memoryLimitBytes = 1055744, result = 32 ok, took 0 ms
memoryLimitBytes = 1055744, result = 64 ok, took 1 ms
memoryLimitBytes = 1055744, result = 128 ok, took 0 ms
memoryLimitBytes = 1055744, result = 256 ok, took 1 ms
memoryLimitBytes = 1055744, result = 512 ok, took 0 ms
memoryLimitBytes = 1055744, result = 1024 ok, took 1 ms
memoryLimitBytes = 1055744, result = 2048 ok, took 0 ms
memoryLimitBytes = 1055744, result = 4096 ok, took 0 ms
memoryLimitBytes = 1055744, result = 8192 ok, took 0 ms
memoryLimitBytes = 1055744, result = 16384 ok, took 0 ms
memoryLimitBytes = 1055744, result = 32768 ok, took 0 ms
memoryLimitBytes = 1055744, result = 65536 ok, took 0 ms
memoryLimitBytes = 1055744, result = 131072 ok, took 0 ms
memoryLimitBytes = 1055744, result = 262144 ok, took 1 ms
memoryLimitBytes = 1055744, result = 524288 ok, took 2 ms
memoryLimitBytes = 1055744, result = 1048576 ok, took 2 ms
out of memory

---- Setting Execution Time Limits in QuickJS ----
Test Time Limit:
memoryLimitBytes = 1048576, result = 3062500 ok, took 18 ms
memoryLimitBytes = 1048576, result = 6372000 ok, took 29 ms
memoryLimitBytes = 1048576, result = 13250304 ok, took 51 ms
memoryLimitBytes = 1048576, result = 28315629 ok, took 107 ms
memoryLimitBytes = 1048576, result = 57930496 ok, took 182 ms
memoryLimitBytes = 1048576, result = 121093750 ok, took 321 ms
memoryLimitBytes = 1048576, result = 251437500 ok, took 590 ms
memoryLimitBytes = 1048576, result = 521964000 ok, took 950 ms
interrupted

---- Passing functions to QuickJS ----
From QuickJS: hello
Success: 700

---- Using functions within QuickJS that return values from the outside ----
From QuickJS: { x: -10, y: 10 }
Success: 700
expected output is {"x":-10,"y":10}

```