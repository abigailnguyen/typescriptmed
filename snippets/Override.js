"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Visibility = /** @class */ (function () {
    function Visibility() {
        this.visible = true;
    }
    Visibility.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    return Visibility;
}());
// check typescript option to use noImplicitOverride: true to mark override members
var MockVisisbility = /** @class */ (function (_super) {
    __extends(MockVisisbility, _super);
    function MockVisisbility() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockVisisbility.prototype.setVisible = function (visible) {
        console.log(visible ? 'Shown' : 'Hidden');
    };
    return MockVisisbility;
}(Visibility));
// app code
var real = new Visibility();
real.setVisible(true);
real.setVisible(false);
// test code
var mock = new MockVisisbility();
mock.setVisible(true);
mock.setVisible(false);
