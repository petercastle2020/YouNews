const express = require("express");
const router = express.Router();

// Auth
const requireAuth = require("../middleware/requireAuth");

// multer config
const multer = require("multer");
const upload = multer({ dest: "assets/" });

const {
  loginUser,
  signupUser,
  getUserById,
  updateUser,
  checkFollowStatus,
  followUser,
  unfollowUser,
  getFollowingList,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);

router.get("/:id/followStatus", requireAuth, checkFollowStatus);

router.get("/:id/following", getFollowingList);

// update user
router.post("/update", requireAuth, upload.single("file"), updateUser);

router.post("/:id/follow", requireAuth, followUser);

router.post("/:id/unfollow", requireAuth, unfollowUser);

// get user data using ":id"
router.get("/:id", getUserById);

module.exports = router;
