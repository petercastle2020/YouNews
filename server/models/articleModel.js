const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
