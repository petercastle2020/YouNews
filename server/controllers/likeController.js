const Like = require("../models/likeModel");
const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const router = require("../routes/articles");

// Get all likes for a specific article
const getLikes = async (req, res) => {
  try {
    const articleId = req.params.articleId;

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const likes = await Like.find({ article: article._id });
    res.status(200).json({ allLikes: likes });
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

    res.status(200).json({
      article: likeUpdatedArticle,
      AddedLike: like,
      likeCount: likeUpdatedArticle.likeCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Unlike an article
const deleteLike = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const userId = req.user._id;

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const existingLike = await Like.findOneAndDelete({
      post_id: articleId,
      user_id: userId,
    });
    if (!existingLike) {
      return res.status(400).json({ message: "Article not liked" });
    }
    // Decrease the likeCount field in the Article document
    const likeUpdatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { $inc: { likeCount: -1 } },
      { new: true }
    );
    res.status(200).json({
      article: likeUpdatedArticle,
      deletedLike: existingLike,
      likeCount: likeUpdatedArticle.likeCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Count likes for a specific article
const getCountLikes = async (req, res) => {
  try {
    const articleId = req.params.articleId;

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const likeCount = await Like.countDocuments({ post_id: article._id });

    res.status(200).json({ likeCount: likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Check If user liked specific post.
const checkIfLiked = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const userId = req.user;

    const existingLike = await Like.findOne({
      post_id: articleId,
      user_id: userId,
    });
    res.status(200).json({ isLiked: Boolean(existingLike) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getLikes,
  postLike,
  deleteLike,
  getCountLikes,
  checkIfLiked,
};
