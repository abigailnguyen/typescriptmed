"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 8080;
// define a route handler for the default home page
app.get("/", function (req, res) {
    res.send("Hello world!");
});
// Start the express server
app.listen(port, function () {
    console.log("server started at http://0.0.0.0:" + port);
});
