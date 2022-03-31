import { getQuickJS } from "quickjs-emscripten"

async function qs() {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.newContext()

  const world = vm.newString("world")
  vm.setProp(vm.global, "NAME", world)
  world.dispose()

  const result = vm.evalCode(`"Hello " + NAME + "!"`)
  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log("Success:", vm.dump(result.value))
    result.value.dispose()
  }

  vm.dispose()
}

export async function main(myargs: readonly string[]) {
  console.log('hello world');
  qs();
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
