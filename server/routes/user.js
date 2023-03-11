const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  getUserById,
  getUserIdByEmail,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);
// get user data using ":id"
router.get("/:id", getUserById);

module.exports = router;
