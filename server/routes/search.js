const express = require("express");
const router = express.Router();

const { searchUserAndArticle } = require("../controllers/searchController");

router.get("/search", searchUserAndArticle);

module.exports = router;
