const Article = require("../models/articleModel");
const mongoose = require("mongoose");

// GET all articles

const getArticles = async (req, res) => {
  const articles = await Article.find({}).sort({ createAt: -1 });

  res.status(200).json(articles);
};

// GET single article
const getSingleArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "document do not exist." });
  }

  try {
    const foundArticle = await Article.findById(id);
    res.status(200).json(foundArticle);
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "document do not exist.", error: error.message });
  }
};

// CREATE new article

const createArticle = async (req, res) => {
  const { title, subtitle, img, content } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!subtitle) {
    emptyFields.push("subtitle");
  }

  if (!img) {
    emptyFields.push("img");
  }

  if (!content) {
    emptyFields.push("content");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill in all the fields.", emptyFields });
  }

  try {
    const article = await Article.create({ title, subtitle, img, content });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE article

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "document do not exist." });
  }

  try {
    const foundArticle = await Article.findOneAndDelete({ _id: id });
    res.status(200).json(foundArticle);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "document do not exist.", error: error.message });
  }
};

// UPDATE article

const updateArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "document do not exist." });
  }

  try {
    const article = await Article.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(article);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "document do not exist.", error: error.message });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};
