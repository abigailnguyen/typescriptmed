import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;
const __dirname = path.resolve();
app.set("views", path.join(__dirname, "frontend"));
app.set("view engine", "ejs");
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.render("index");
});
// Start the express server
app.listen(port, () => {
    console.log(`server started at http://0.0.0.0:${port}`);
});
//# sourceMappingURL=index.js.map