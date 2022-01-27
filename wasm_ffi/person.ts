
class Person {
  name: string;
  age: u8;
  favorite_number: u32;

  constructor(name: string, age: u8, favorite_number: u32) {
      this.name = name;
      this.age = age;
      this.favorite_number = favorite_number;
  }
}

export function get_person(): Person {
  return new Person('Jean-Luc Picard', 61, 1701);
}

export function person_facts(p: Person): string {
  return (p.age > p.favorite_number)
      ? p.name + ' is older than his favorite_number'
      : p.name + ' is younger than his favorite_number';
}