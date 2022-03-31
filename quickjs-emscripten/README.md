# Description
This is a test using https://github.com/justjake/quickjs-emscripten .
We're running some JS code in a secure "VM".
We can have some time and memory limits.

# how to run
Initialize with `npm i`, start with `npm run start`


# expected output
Expected output is like

```
> quickjs-emscripten@1.0.0 start
> tsc && node dist/src/app.js

Success: It is 2022-03-31T13:46:29.542Z!

memoryLimitBytes = 7168, result = 123 ok, took 1 ms

Test Memory Limits:
memoryLimitBytes = 1055744, result = 2 ok, took 1 ms
memoryLimitBytes = 1055744, result = 4 ok, took 0 ms
memoryLimitBytes = 1055744, result = 8 ok, took 1 ms
memoryLimitBytes = 1055744, result = 16 ok, took 0 ms
memoryLimitBytes = 1055744, result = 32 ok, took 1 ms
memoryLimitBytes = 1055744, result = 64 ok, took 0 ms
memoryLimitBytes = 1055744, result = 128 ok, took 1 ms
memoryLimitBytes = 1055744, result = 256 ok, took 0 ms
memoryLimitBytes = 1055744, result = 512 ok, took 0 ms
memoryLimitBytes = 1055744, result = 1024 ok, took 0 ms
memoryLimitBytes = 1055744, result = 2048 ok, took 0 ms
memoryLimitBytes = 1055744, result = 4096 ok, took 1 ms
memoryLimitBytes = 1055744, result = 8192 ok, took 0 ms
memoryLimitBytes = 1055744, result = 16384 ok, took 1 ms
memoryLimitBytes = 1055744, result = 32768 ok, took 0 ms
memoryLimitBytes = 1055744, result = 65536 ok, took 1 ms
memoryLimitBytes = 1055744, result = 131072 ok, took 1 ms
memoryLimitBytes = 1055744, result = 262144 ok, took 0 ms
memoryLimitBytes = 1055744, result = 524288 ok, took 1 ms
memoryLimitBytes = 1055744, result = 1048576 ok, took 2 ms
out of memory

Test Time Limit:
memoryLimitBytes = 1048576, result = 3062500 ok, took 17 ms
memoryLimitBytes = 1048576, result = 6372000 ok, took 35 ms
memoryLimitBytes = 1048576, result = 13250304 ok, took 59 ms
memoryLimitBytes = 1048576, result = 28315629 ok, took 113 ms
memoryLimitBytes = 1048576, result = 57930496 ok, took 197 ms
memoryLimitBytes = 1048576, result = 121093750 ok, took 355 ms
memoryLimitBytes = 1048576, result = 251437500 ok, took 586 ms
interrupted

Success: 1234
From QuickJS: hello
Success: 700
[]
From QuickJS: { a: 1, b: 2 }
Success: 700
[ { x: 9 } ]
From QuickJS: { a: 1, b: 18 }
Success: 700
```