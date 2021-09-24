"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return InMemoryDatabase;
}());
// factory
function createDatabase() {
    return new InMemoryDatabase();
}
var pokemonDB = createDatabase();
pokemonDB.set({
    id: "Bulbasaur",
    attack: 50,
    defense: 10,
});
console.log(pokemonDB.get("Bulbasaur"));
