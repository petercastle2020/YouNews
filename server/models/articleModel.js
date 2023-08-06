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
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    user_handle: {
      type: String,
      require: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    sharedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sharedArticle: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
