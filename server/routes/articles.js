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
  getSpecificUserArticles,
  getTrendingArticles,
} = require("../controllers/articleController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all following routes.(I've put specific Auth in each router.)
//router.use(requireAuth);

// GET ALL articles
router.get("/", getAllArticles);

// GET Mine all articles
router.get("/my", requireAuth, getAllMyArticles);

// POST new articles
router.post("/", requireAuth, upload.single("file"), createArticle);

// DELETE new articles
router.delete("/:id", requireAuth, deleteArticle);

// EDIT new articles
router.patch("/:id", requireAuth, upload.single("file"), updateArticle);

//GET specific user articles "/api/articles"
router.get("/user/:id/articles", getSpecificUserArticles);

//GET trending articles
router.get("/trending", getTrendingArticles);

// GET single articles
router.get("/:id", getSingleArticle);

module.exports = router;
