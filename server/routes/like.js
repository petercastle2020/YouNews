const express = require("express");
const router = express.Router();

// Middleware
const requireAuth = require("../middleware/requireAuth");

// Controllers
const {
  getLikes,
  postLike,
  deleteLike,
  getCountLikes,
  checkIfLiked,
} = require("../controllers/likeController");

// COUNT likes
router.get("/:articleId/count", getCountLikes);

// GET check current user has liked specific post.
router.get("/:articleId/likeCheck", requireAuth, checkIfLiked);

// GET ALL likes
router.get("/:articleId", requireAuth, getLikes);

// POST a like
router.post("/:articleId", requireAuth, postLike);

// DELETE a like
router.delete("/:articleId", requireAuth, deleteLike);

module.exports = router;
