const Article = require("../models/articleModel");
const User = require("../models/userModel");

const searchUserAndArticle = async (req, res) => {
  const query = req.query.q;
  try {
    const articles = await Article.find({
      title: { $regex: query, $options: "i" },
    }).select("img title _id");
    const users = await User.find({
      email: { $regex: query, $options: "i" },
    }).select("email _id");

    if (articles.length === 0 && users.length === 0) {
      res.status(404).json({ SearchResponse: "No article nor user found." });
    } else {
      res.status(200).json({ SearchResponse: [...users, ...articles] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { searchUserAndArticle };
