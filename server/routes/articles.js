const express = require("express");

const router = express.Router();

// GET all articles
router.get("/", (req, res) => {
  res.json({ msg: "all" });
});

// GET single articles
router.get("/:id", (req, res) => {
  res.json({ msg: "single" });
});

// POST new articles
router.post("/", (req, res) => {
  res.json({ msg: "new" });
});

// DELETE new articles
router.delete("/:id", (req, res) => {
  res.json({ msg: "delete" });
});

// EDIT new articles
router.patch("/:id", (req, res) => {
  res.json({ msg: "edit" });
});

module.exports = router;
