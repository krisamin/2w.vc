const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const data = require(path.join(__dirname, "data/domains.json"));
app.get("/", (req, res, next) => {
  res.render("index", {
    domains: data
  });
});

app.listen(PORT, function () {
  console.log("App listening on port",PORT);
});
