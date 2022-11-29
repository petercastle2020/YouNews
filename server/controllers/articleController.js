require("dotenv").config();
const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

// multer config
const multer = require("multer");

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
  const { title, subtitle, content } = req.body;
  let img = "";

  console.log(req.body);
  console.log(req.file);

  console.log(req.file.path);

  // Cloudinary uploader and return IMG URL with .try and catch;

  // const getImgURL = async () => {
  //   try {
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     console.log("success", JSON.stringify(result, null, 2));
  //     console.log(result.secure_url);
  //     img = result.secure_url;
  //     return img;
  //   } catch (error) {
  //     console.log("error", JSON.stringify(error, null, 2));
  //     return null;
  //   }
  // };

  // Cloudinary uploader and return IMG URL with .then

  const uploadIMG = async () => {
    return await cloudinary.uploader
      .upload(req.file.path)
      .then((result) => {
        //JSON.stringify will provide a formatted string
        //1st param is the value to be output
        //2st param null is a function that can be applied to the output
        //3st param is the number of space characters to use for whitespace in formatting the output
        console.log("success", JSON.stringify(result, null, 2));
        console.log(result.secure_url);
        img = result.secure_url;
        console.log("inside getImgURL", img);
        return img;
      })
      .catch((error) => {
        console.log("error", JSON.stringify(error, null, 2));
      });
  };

  const inputValidation = async () => {
    img = await uploadIMG();

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
      const article = await Article.create({
        title: title,
        subtitle: subtitle,
        img: img,
        content: content,
      });
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  create();

  // // Cloudinary uploader.

  // const getImgURL = async () => {
  //   const uploadIMG = await cloudinary.uploader
  //     .upload(req.file.path)
  //     .then((result) => {
  //       //JSON.stringify will provide a formatted string
  //       //1st param is the value to be output
  //       //2st param null is a function that can be applied to the output
  //       //3st param is the number of space characters to use for whitespace in formatting the output
  //       console.log("success", JSON.stringify(result, null, 2));
  //       console.log(result.secure_url);
  //       const img = result.secure_url;
  //       console.log("inside getImgURL", img);
  //       return img;
  //     })
  //     .catch((error) => {
  //       console.log("error", JSON.stringify(error, null, 2));
  //     });
  // };

  // cloudinary.uploader
  //   .upload(req.file.path)
  //   .then((result) => {
  //     //JSON.stringify will provide a formatted string
  //     //1st param is the value to be output
  //     //2st param null is a function that can be applied to the output
  //     //3st param is the number of space characters to use for whitespace in formatting the output
  //     console.log("success", JSON.stringify(result, null, 2));
  //     const img = result.secure_url;
  //   })
  //   .catch((error) => {
  //     console.log("error", JSON.stringify(error, null, 2));
  //   });

  // let emptyFields = [];

  // if (!title) {
  //   emptyFields.push("title");
  // }

  // if (!subtitle) {
  //   emptyFields.push("subtitle");
  // }

  // if (!img) {
  //   emptyFields.push("img");
  // }

  // if (!content) {
  //   emptyFields.push("content");
  // }

  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please Fill in all the fields.", emptyFields });
  // }

  // const inputValidation = async () => {
  //   const img = await getImgURL();

  //   console.log("undefined should NOT be here ---> ", img);

  //   let emptyFields = [];

  // if (!title) {
  //   emptyFields.push("title");
  // }

  // if (!subtitle) {
  //   emptyFields.push("subtitle");
  // }

  // if (!img) {
  //   emptyFields.push("img");
  // }

  // if (!content) {
  //   emptyFields.push("content");
  // }

  //   if (emptyFields.length > 0) {
  //     return res
  //       .status(400)
  //       .json({ error: "Please Fill in all the fields.", emptyFields });
  //   }

  //   return img;
  // };

  // const create = async () => {
  //   const img = await inputValidation();

  //   try {
  //     const article = await Article.create({
  //       title,
  //       subtitle,
  //       img: img,
  //       content,
  //     });
  //     res.status(200).json(article);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // create();

  // try {
  //   const article = await Article.create({
  //     title,
  //     subtitle,
  //     img,
  //     content,
  //   });
  //   res.status(200).json(article);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
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
