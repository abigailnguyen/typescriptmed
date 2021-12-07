// observer / pub/sub pattern
import { fstat } from "fs";
import { RecordHandler, loader } from "./loader";

// Observer
// Here EventType is just like T, a generic for EventType
type Listener<EventType> = (ev: EventType) => void;

// a closure function that manages an array of listeners to an event type
// a listener is a function on an event type
function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  // a function that returns 2 functions subscribe and publish
  let listeners: Listener<EventType>[] = [];
  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      // take a listener, and returns a function to unsubscribe
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      // tells all listeners to do something
      listeners.forEach((l) => l(event));
    },
  };
}

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}
interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;

  // add Event listeners
  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

  visit(visitor: (item: T) => void): void;
}

// another way of factory design pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    private constructor() {}
    // Visitor pattern
    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
    }
    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    public set(newValue: T): void {
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id],
      });

      this.db[newValue.id] = newValue;

      this.afterAddListeners.publish({
        value: newValue,
      });
    }

    public get(id: string): T | undefined {
      return this.db[id];
    }
  }

  // Singleton
  //   const db = new InMemoryDatabase();
  //   return db;
  return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();
const pokemonDB = PokemonDB.instance;

const afterListener: Listener<AfterSetEvent<Pokemon>> = ({ value }) => {
  console.log(value);
};

const beforeListener: Listener<BeforeSetEvent<Pokemon>> = ({
  value,
  newValue,
}) => {
  console.log(`Before value: ${value}. After value ${newValue}`);
};
const unsubscribeBefore = pokemonDB.onBeforeAdd(beforeListener);
const unsubscribeAfter = pokemonDB.onAfterAdd(afterListener);

class PokemonDBAdapter implements RecordHandler<Pokemon> {
  addRecord(record: Pokemon): void {
    pokemonDB.set(record);
  }
}

// the adapter for PokemonDB
loader("./data.json", new PokemonDBAdapter());

unsubscribeAfter();
unsubscribeBefore();
// it will not console log
pokemonDB.set({
  id: "Bulbasaur",
  attack: 50,
  defense: 10,
});

pokemonDB.visit((item) => {
  console.log(item.id);
});
