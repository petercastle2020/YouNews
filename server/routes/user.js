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
  updateUserAvatar,
  deleteUserAvatar,
  updateUser,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);
// get user data using ":id"
router.get("/:id", getUserById);
// update user avatar
router.post("/update", requireAuth, upload.single("file"), updateUserAvatar);
// delete user avatar
router.post("/delete", requireAuth, deleteUserAvatar);
// Edit User
// router.patch("/update", requireAuth, updateUser);

module.exports = router;
