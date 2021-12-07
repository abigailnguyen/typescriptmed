"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// another way of factory design pattern
function createDatabase() {
    var InMemoryDatabase = /** @class */ (function () {
        function InMemoryDatabase() {
            this.db = {};
        }
        InMemoryDatabase.prototype.set = function (newValue) {
            this.db[newValue.id] = newValue;
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
pokemonDB.set({
    id: "Bulbasaur",
    attack: 50,
    defense: 10,
});
console.log(pokemonDB.get("Bulbasaur"));
