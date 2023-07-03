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
  getUserIdByEmail,
  updateUser,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);
// get user data using ":id"
router.get("/:id", getUserById);
// update user
router.post("/update", requireAuth, upload.single("file"), updateUser);

// router.post('/api/users/:userId/follow', requireAuth, followUser);

// router.post('/api/users/:userId/unfollow', requireAuth, unfollowUser);

module.exports = router;
