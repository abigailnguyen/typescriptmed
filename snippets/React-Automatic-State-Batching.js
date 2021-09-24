"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./App.css");
function App() {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    var _b = (0, react_1.useState)(false), toggle = _b[0], setToggle = _b[1];
    var handleClick = function () {
        setTimeout(function () {
            setCount(function (count) { return count + 1; });
            setToggle(function (toggle) { return !toggle; });
        }, 10);
    };
    var handleClickMultipleRerender = function () {
        (0, react_dom_1.flushSync)(function () {
            setCount(function (count) { return count + 1; });
        });
        (0, react_dom_1.flushSync)(function () {
            setToggle(function (toggle) { return !toggle; });
        });
    };
    console.log('Rendered', count, toggle);
    return className = "App" >
        onClick;
    {
        handleClick;
    }
     > Click;
    Me < /button>
        < div > Count;
    {
        count;
    }
    /div>
        < div > Toggle;
    {
        toggle.toString();
    }
    /div>
        < /div>;
    ;
}
exports.default = App;
