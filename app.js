

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Coding", "Music"];
let targetItems = ["Lesson File 23", "Help Others"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Target") {
    targetItems.push(item);
    res.redirect("/target");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/target", function(req, res) {
    res.render("list", {listTitle: "Target List", newListItems: targetItems});
});

app.listen(2006, function() {
    console.log("server stared on port 2006");
});