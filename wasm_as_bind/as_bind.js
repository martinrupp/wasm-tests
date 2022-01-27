// using as-bind
// https://github.com/torch2424/as-bind/

const AsBind = require("as-bind/dist/as-bind.cjs.js");
const fs = require("fs");

let filename = "./asc/hello.wasm"
var wasm;
try {
  wasm = fs.readFileSync(filename);
} catch(e) {
  console.error(`can't find ${filename}, please run npm run asc`)
  process.exit(1)
}

const asyncTask = async () => {
  const asBindInstance = await AsBind.instantiate(wasm);
  // You can now use your wasm / as-bind instance!
  const response = asBindInstance.exports.sayHello(
    'hello world'
  );
  console.log(response); // AsBind: Hello World!
};
asyncTask();
