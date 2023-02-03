const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    post_name: {
      type: String,
      required: [true, "Please add a post title"],
    },
    description: {
      type: String,
      minLength: 100,
      required: [true, "Please add a description"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please add a post owner"],
    },
    tags: {
      type: [String],
      required: [true, "Please add a post tag"],
    },

    imageList: {
      type: [String],
    },
  },
  { timestamps: true }
);

PostSchema.index({ "$**": "text" });

module.exports = mongoose.model("Post", PostSchema);
