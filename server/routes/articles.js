const express = require("express");
const router = express.Router();

// multer config
const multer = require("multer");
const upload = multer({ dest: "assets/" });

// controllers
const {
  createArticle,
  getArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController");

// GET all articles
router.get("/", getArticles);

// GET single articles
router.get("/:id", getSingleArticle);

// POST new articles
router.post("/", upload.single("file"), createArticle);

// DELETE new articles
router.delete("/:id", deleteArticle);

// EDIT new articles
router.patch("/:id", updateArticle);

module.exports = router;
