const express = require("express");
const router = express.Router();
// controllers
const {
  createArticle,
  getArticles,
  getSingleArticle,
} = require("../controllers/articleController");

// GET all articles
router.get("/", getArticles);

// GET single articles
router.get("/:id", getSingleArticle);

// POST new articles
router.post("/", createArticle);

// DELETE new articles
router.delete("/:id", (req, res) => {
  res.json({ msg: "delete" });
});

// EDIT new articles
router.patch("/:id", (req, res) => {
  res.json({ msg: "edit" });
});

module.exports = router;
