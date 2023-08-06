const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const { uploadIMG, deleteIMG } = require("./CloudinaryController");

// GET ALL articles
const getAllArticles = async (req, res) => {
  const articles = await Article.find({}).sort({
    createdAt: -1,
  });

  res.status(200).json(articles);
};

// GET MINE all articles

const getAllMyArticles = async (req, res) => {
  const user_id = req.user._id;

  const articles = await Article.find({ user_id: user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(articles);
};

// GET specific user articles

const getSpecificUserArticles = async (req, res) => {
  user_id = req.params.id;

  const articles = await Article.find({ user_id: user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(articles);
};

const queryUserArticles = async (req, res) => {
  try {
    const { user_id } = req.query;

    const articles = await Article.find({ user_id: user_id }).sort({
      createdAt: -1,
    });

    console.log(articles);

    if (articles.length > 0) {
      res.status(200).json(articles);
    } else {
      res.status(404).json({ msg: "User don't have articles yet." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
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
  const { title, subtitle, email, handle, content } = req.body;
  const imgPath = req.file.path;

  const inputValidation = async () => {
    let img = req.file.path;
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
      throw new Error("Please Fill in all the fields.");
    } else {
      try {
        const uploadedImg = await uploadIMG(imgPath);
        return uploadedImg;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to upload image.");
      }
    }
  };

  try {
    // Call inputValidation and wait for it to complete
    const img = await inputValidation();
    const user_id = req.user._id;
    const user_handle = handle;
    const article = await Article.create({
      title: title,
      subtitle: subtitle,
      img: img,
      content: content,
      user_id: user_id,
      user_handle: user_handle,
    });
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
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "document does not exist" });
    }
    //Delete the previous image if a new file is uploaded
    try {
      if (article && article.img) {
        await deleteIMG(article.img);
      }
    } catch (error) {
      console.error("Error deleting previous image:", error);
      res.status(500).json({ error: "Error deleting previous image" });
    }

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
  let updateFields = { title, subtitle, content };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "document do not exist." });
  }

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "document does not exist" });
    }

    //Delete the previous image if a new file is uploaded
    try {
      if (req.file && article.img) {
        await deleteIMG(article.img);
      }
    } catch (error) {
      console.error("Error deleting previous image:", error);
      res.status(500).json({ error: "Error deleting previous image" });
    }

    // Upload the new image if a file is provided and spread the other data.
    if (req.file) {
      const imgPath = req.file.path;
      // img here will be used on body for the update.
      const img = await uploadIMG(imgPath);
      updateFields = { ...updateFields, img };
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      { _id: id },
      updateFields,
      { new: true } // returns the update version of the document that was updated.
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "document do not exist.", error: error.message });
  }
};

// get Trending articles
const getTrendingArticles = async (req, res) => {
  try {
    const trendingArticles = await Article.find()
      .sort({ likeCount: -1 })
      .limit(7);
    if (!trendingArticles) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ trendingArticles: trendingArticles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const shareArticle = async (req, res) => {
  console.log("sharing func...");
  try {
    const { articleId } = req.params; // see how this works.
    const sharedBy = req.user._id;

    const originalArticle = await Article.findById(articleId);

    const sharedArticle = new Article({
      ...originalArticle.toObject(),
      sharedBy: sharedBy,
      sharedArticle: articleId,
    });

    await sharedArticle.save();

    res.status(200).json({ message: "Article shared successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
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
  getTrendingArticles,
  queryUserArticles,
  shareArticle,
};
