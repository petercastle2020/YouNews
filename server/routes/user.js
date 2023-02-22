const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);
// get user data
router.get("/:id", getUser);

module.exports = router;
