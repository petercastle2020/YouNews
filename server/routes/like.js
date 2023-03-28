const express = require("express");
const router = express.Router();

// Controllers
const {
  getLikes,
  postLike,
  deleteLike,
} = require("../controllers/likeController");

// GET ALL likes
router.get("/:articleId", getLikes);

// POST a like
router.post("/:articleId", postLike);

// DELETE a like
router.delete("/:articleId", deleteLike);

module.exports = router;
