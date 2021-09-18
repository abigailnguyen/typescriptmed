interface Person {
  first: string;
  last: string;
  [key: string]: any; // addition properties of any kind, a whole map
}

const person: Person = {
  first: "Jeff",
  last: "Delaney",
};

const person2: Person = {
  first: "Usain",
  last: "Bolt",
  fast: true,
  new: true,
};
