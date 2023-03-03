const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const uploadIMG = require("./ImgUploadController");

// GET ALL articles
const getAllArticles = async (req, res) => {
  const articles = await Article.find({}).sort({
    createAt: -1,
  });

  res.status(200).json(articles);
};

// GET MINE all articles

const getAllMyArticles = async (req, res) => {
  const user_id = req.user._id;

  const articles = await Article.find({ user_id: user_id }).sort({
    createAt: -1,
  });

  res.status(200).json(articles);
};

// GET specific user articles

const getSpecificUserArticles = async (req, res) => {
  user_id = req.params.id;

  const articles = await Article.find({ user_id: user_id }).sort({
    createAt: -1,
  });

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
  console.log(req.user._id);
  console.log(req.user.email);
  const { title, subtitle, content } = req.body;
  let img = "";
  const imgPath = req.file.path;
  console.log(req.body);
  console.log(req.file);
  console.log(req.file.path);

  const inputValidation = async () => {
    img = await uploadIMG(imgPath);

    console.log("IMG URL -->", img);

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

    return img;
  };

  const create = async () => {
    img = await inputValidation();

    try {
      const user_id = req.user._id;
      const user_email = req.user.email;
      const article = await Article.create({
        title: title,
        subtitle: subtitle,
        img: img,
        content: content,
        user_id: user_id,
        user_email: user_email,
      });
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  create();
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
  const { title, subtitle, content } = req.body;
  const imgPath = req.file.path;

  // img here will be used on body for the update.
  img = await uploadIMG(imgPath);
  console.log("IMG URL -->", img);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "document do not exist." });
  }

  try {
    const article = await Article.findByIdAndUpdate(
      { _id: id },
      { title: title, subtitle: subtitle, img: img, content: content },
      { new: true } // returns the update version of the document that was updated.
    );
    console.log(req.body);
    console.log("Updated article:", article);
    res.status(200).json(article);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "document do not exist.", error: error.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getAllMyArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
  getSpecificUserArticles,
};
