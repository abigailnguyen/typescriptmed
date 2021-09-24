"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createObserver() {
    // a function that returns 2 functions subscribe and publish
    var listeners = [];
    return {
        subscribe: function (listener) {
            // take a listener, and returns a function to unsubscribe
            listeners.push(listener);
            return function () {
                listeners = listeners.filter(function (l) { return l !== listener; });
            };
        },
        publish: function (event) {
            // tells all listeners to do something
            listeners.forEach(function (l) { return l(event); });
        },
    };
}
// another way of factory design pattern
function createDatabase() {
    var InMemoryDatabase = /** @class */ (function () {
        function InMemoryDatabase() {
            this.db = {};
            this.beforeAddListeners = createObserver();
            this.afterAddListeners = createObserver();
        }
        // Visitor pattern
        InMemoryDatabase.prototype.visit = function (visitor) {
            Object.values(this.db).forEach(visitor);
        };
        InMemoryDatabase.prototype.onBeforeAdd = function (listener) {
            return this.beforeAddListeners.subscribe(listener);
        };
        InMemoryDatabase.prototype.onAfterAdd = function (listener) {
            return this.afterAddListeners.subscribe(listener);
        };
        InMemoryDatabase.prototype.set = function (newValue) {
            this.beforeAddListeners.publish({
                newValue: newValue,
                value: this.db[newValue.id],
            });
            this.db[newValue.id] = newValue;
            this.afterAddListeners.publish({
                value: newValue,
            });
        };
        InMemoryDatabase.prototype.get = function (id) {
            return this.db[id];
        };
        InMemoryDatabase.instance = new InMemoryDatabase();
        return InMemoryDatabase;
    }());
    // Singleton
    //   const db = new InMemoryDatabase();
    //   return db;
    return InMemoryDatabase;
}
var PokemonDB = createDatabase();
var pokemonDB = PokemonDB.instance;
var unsubscribe = pokemonDB.onAfterAdd(function (_a) {
    var value = _a.value;
    console.log(value);
});
unsubscribe();
// it will not console log
pokemonDB.set({
    id: "Bulbasaur",
    attack: 50,
    defense: 10,
});
pokemonDB.visit(function (item) {
    console.log(item.id);
});
