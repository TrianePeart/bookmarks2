const express = require("express");
const bookmarks = express.Router();
const { checkName, checkBoolean, validateURL } = require("../validations/checkBookmarks.js");
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark
} = require("../queries/bookmarks");

// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  console.log("bookmark", bookmark);
  if (!bookmark.message) {
    res.status(200).json(bookmark);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
bookmarks.post("/", checkName, checkBoolean, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// DELETE
bookmarks.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletedBookmark = await deleteBookmark(id)
    res.status(200).json(deletedBookmark)
  } catch (error) {
    res.status(404).json({ error: "id not found" })
  }
})

// UPDATE
bookmarks.put("/:id", checkName, checkBoolean, validateURL, async (req, res) => {
  try {
    const { id } = req.params
    const updatedBookmark = await updateBookmark(id, req.body)
    res.status(200).json(updatedBookmark)
  } catch (error) {
    res.status(404).json({ error: "bookmark not found" })
  }
})


module.exports = bookmarks;
