"use strict";
exports.__esModule = true;
var shell = require("shelljs");
// Copy all the vview templates
shell.cp("-R", "src/views", "dist/");
