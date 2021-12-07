type Point = { x: number; y: number };
type P = keyof Point;

// if the type has a string or numer index signature, keyof will return those types instead
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

// Note that M is string | number - this is because JS object keys are always coerced to a string,
// so obj[0]  is always the same as obj["0"]
// keyof types become especially useful when combined with mapped types
type Mapish = { [k: string]: boolean }
type M = keyof Mapish


// there’s no need to make the parameter optional to accomplish passing less number of arguments to a call back
// — it’s always legal to provide a callback that accepts fewer arguments.
interface Fetcher {
    getObject(done: (data:any, elapsedTime: number) => void): void
}

