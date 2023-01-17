// IMPORTS
const cors = require("cors");
const express = require("express");
const bookmarksController = require("./controllers/bookmarkController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
// Bookmarks ROUTES
app.use("/bookmarks", bookmarksController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});



// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;