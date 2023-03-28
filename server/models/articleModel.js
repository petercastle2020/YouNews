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
    user_id: {
      type: String,
      require: true,
    },
    user_email: {
      type: String,
      require: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
