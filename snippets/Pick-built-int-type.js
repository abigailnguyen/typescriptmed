"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setSize(element, 
// Usage: just need the size properties
size) {
    var _a, _b;
    element.setAttribute('width', ((_a = size.width) !== null && _a !== void 0 ? _a : 0) + 'px');
    element.setAttribute('height', ((_b = size.height) !== null && _b !== void 0 ? _b : 0) + 'px');
}
