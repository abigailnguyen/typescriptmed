// Generics
class Observable<T> {
  constructor(public value: T) {}
}

let x: Observable<number>;

let y: Observable<Person>;

let z = new Observable('23');
