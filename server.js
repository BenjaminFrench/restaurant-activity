// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

var tables = [];
var waitlist = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;

  console.log(newtable);

  if (tables.length < 5) {
      tables.push(newtable);
  }
  else {
      waitlist.push(newtable);
  }

  res.json(newtable);
});

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.get("/api/clear", function(req, res) {
    tables = [];
    waitlist = [];
    return res.send('Cleared');
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
