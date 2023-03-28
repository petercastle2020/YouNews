const Like = require("../models/likeModel");
const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const router = require("../routes/articles");

// Get all likes for a specific article
const getLikes = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const likes = await Like.find({ article: article._id });
    res.json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Like an article
const postLike = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const userId = req.user._id;

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const existingLike = await Like.findOne({
      post_id: articleId,
      user_id: userId,
    });
    if (existingLike) {
      return res.status(400).json({ message: "Article already liked" });
    }
    const like = new Like({
      post_id: articleId,
      user_id: userId,
    });
    await like.save();

    // Increment the likeCount field in the Article document
    const likeUpdatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    res.json(likeUpdatedArticle, like);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Unlike an article
const deleteLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const existingLike = await Like.findOneAndDelete({
      post_id: article._id,
      user_id: req.user._id,
    });
    if (!existingLike) {
      return res.status(400).json({ message: "Article not liked" });
    }
    res.json(existingLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getLikes, postLike, deleteLike };
