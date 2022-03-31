import { getQuickJS, QuickJSContext, shouldInterruptAfterDeadline } from "quickjs-emscripten"

// function newQuickJSContext(memoryLimitBytes: number | undefined = undefined, timeLimitMS: number | undefined = undefined) {
//   const QuickJS = await getQuickJS()
//   const runtime = QuickJS.newRuntime()
//   if(memoryLimitBytes)
//     context.set
// }

/// testing how to pass variables to quickjs
// similar example as https://github.com/justjake/quickjs-emscripten#quickjs-emscripten
async function qsExternalVars(timeStr: string) {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.newContext()

  const vmTimeStr = vm.newString(timeStr)
  vm.setProp(vm.global, "externalTime", vmTimeStr)
  vmTimeStr.dispose()

  const result = vm.evalCode(`"It is " + externalTime + "!"`)
  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log("Success:", vm.dump(result.value))
    result.value.dispose()
  }

  vm.dispose()
}

// test quickjs with time + memory limits
// see https://github.com/justjake/quickjs-emscripten#safely-evaluate-javascript-code
async function executeWithLimits(code : string, timeLimitMS: number, memoryLimitBytes: number) {
  const QuickJS = await getQuickJS();
  
  
  try {
    const currentDate = Date.now();

    const runtime = QuickJS.newRuntime()
    runtime.setMemoryLimit(memoryLimitBytes);
    runtime.setInterruptHandler( shouldInterruptAfterDeadline(Date.now() + timeLimitMS) );

    const vm = runtime.newContext();

    const result = vm.evalCode(code)

    let b;
    if (result.error) {
      const err = vm.dump(result.error);
      console.log((err as any)?.message);
      result.error.dispose()
      b = false;
    } else {
      const res = vm.dump(result.value);
      console.log(`memoryLimitBytes = ${memoryLimitBytes}, result = ${res} ok, took ${Date.now() - currentDate} ms`);      
      result.value.dispose()
      b = true;
    }
    
    vm.dispose();
    runtime.dispose();
    return b;
  }catch(err) {
    console.log((err as any)?.message);
    return false;
  }
}

/// add a (custom) console.log function to our vm
/// see https://github.com/justjake/quickjs-emscripten#exposing-apis
function qsVMAddLog(vm: QuickJSContext, mylog = console.log) {
  // `console.log`
  const logHandle = vm.newFunction("log", (...args) => {
    const nativeArgs = args.map(vm.dump)
    mylog(...nativeArgs)
  })
  // Partially implement `console` object
  const consoleHandle = vm.newObject()
  vm.setProp(consoleHandle, "log", logHandle)
  vm.setProp(vm.global, "console", consoleHandle)
  consoleHandle.dispose()
  logHandle.dispose()
}

// adding a function like
// myFunc(args) { const x = args && args.length ? args[0].x+9 : 2;
//    return {a:1 , b: x }
// }
function qsVMAddMyFunc(vm: QuickJSContext) {
  // or use vm.newFunction(...).consume( (f) => vm.setProp(vm.global, "myFunc", f))
  const funcHandle = vm.newFunction("myFunc", (...args) => {
    const nativeArgs = args.map(vm.dump);
    console.log(nativeArgs)
    const obj = vm.newObject();
    vm.newNumber(1).consume( (h) => vm.setProp(obj, 'a', h));
    const x = nativeArgs && nativeArgs.length > 0 ? nativeArgs[0].x+9 : 2;
    vm.newNumber(x).consume( (h) => vm.setProp(obj, 'b', h));
    return obj;
  })
  vm.setProp(vm.global, "myFunc", funcHandle)
  funcHandle.dispose();
}

// execute code in the vm
// includes a console.log and function myFunc
async function qsExecute(code: string) {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.newContext()

  qsVMAddLog(vm, (...args) => console.log('From QuickJS:', ...args) );
  qsVMAddMyFunc(vm);
  
  const result = vm.evalCode(code)
  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log("Success:", vm.dump(result.value))
    result.value.dispose()
  }

  vm.dispose()
}

// test quickjs' memory limit functionality
async function qsTestMemoryLimits() {

  // minimum for the VM to start at all is about 7kb
  await executeWithLimits(`123`, 1000, 7*1024);

  console.log('Test Memory Limits:');
  
  // testing memory limits
  for(let d = 1; d < 25; d++) {
    if(!await executeWithLimits(`
      let str = ' ';
      for(let i=0; i<${d}; i++) {
        str = str + str;
      }
      str.length;
      `, 1000, (1024+7)*1024)) break;
  }
  console.log('');  
}

// test quickjs' time limit functionality
async function qsTestTimeLimit() {
  console.log('Test Time Limit:');
  
  // testing time limit
  for(let d = 50; d < 100000; d*=1.2)
  {
    // execute 3-times nested loops O(d^3).
    if(!await executeWithLimits(`
      sum = 0;
      for(let i =0; i<${d}; i++) {
        for(let i2 =0; i2<${d}; i2++) {
          for(let i3 =0; i3<${d}; i3++) {
            sum += i+i2-i3;
          }
        }
      }
      sum;
      `, 1000, 1024*1024)) break;
  }

  console.log('');  
}

// runt all tests
export async function main(myargs: readonly string[]) {
  await qsExternalVars( new Date().toISOString() );
  
  await qsTestMemoryLimits();
  await qsTestTimeLimit();


  await qsExecute('1234')
  await qsExecute(`console.log('hello'); 700`)
  await qsExecute(`console.log(myFunc()); 700`)
  await qsExecute(`console.log(myFunc({x: 9})); 700`)
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
