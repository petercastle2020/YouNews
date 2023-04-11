const express = require("express");
const router = express.Router();

const {
  searchUserAndArticle,
  searchUserByEmail,
} = require("../controllers/searchController");

router.get("/search", searchUserAndArticle);

router.get("/users", searchUserByEmail);

module.exports = router;
