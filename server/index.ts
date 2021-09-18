import * as _ from "lodash";

const express = require("express");
const app = express();
const port = 8080;

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Start the express server
app.listen(port, () => {
  console.log(`server started at http://0.0.0.0:${port}`);
});
