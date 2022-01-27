// using wasm-ffi
// https://github.com/DeMille/wasm-ffi/

const wasm_ffi = require("wasm-ffi");
let filename = 'person.wasm';

// define a new struct type: Person
const Person = new wasm_ffi.Struct({
  name: 'string',
  age: 'u8',
  favorite_number: 'u32',
});

const library = new wasm_ffi.Wrapper({
  get_person: [Person],
  person_facts: ['string', [Person]],
});

library.fetch(filename).then(() => {
  const p = library.get_person();

  // most of this works, but strings are chopped of to only one letter
  const about = `${p.name} is ${p.age}. His favorite number is ${p.favorite_number}.`;
  console.log(about);

  console.log(library.person_facts(p));

}).catch((e) => console.error(`can't find ${filename}, please run npm run asc`));