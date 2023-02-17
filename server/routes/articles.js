const express = require("express");
const router = express.Router();

// multer config
const multer = require("multer");
const upload = multer({ dest: "assets/" });

// controllers
const {
  createArticle,
  getAllArticles,
  getAllMyArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController");
const requireAuth = require("../middleware/requireAuth");

// GET ALL articles
router.get("/", getAllArticles);

// GET single articles
router.get("/:id", getSingleArticle);

// require auth for all following routes.
router.use(requireAuth);

// GET Mine all articles
router.get("/my", getAllMyArticles);

// POST new articles
router.post("/", upload.single("file"), createArticle);

// DELETE new articles
router.delete("/:id", deleteArticle);

// EDIT new articles
router.patch("/:id", updateArticle);

module.exports = router;
