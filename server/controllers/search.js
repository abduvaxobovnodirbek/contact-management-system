const { default: mongoose } = require("mongoose");
const asyncHandler = require("../middlewares/async");
const Post = require("../models/Post");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.selectedPosts = asyncHandler(async (req, res, next) => {
  const { tags } = req.query;
  const posts = await Post.find({ tags: { $in: [tags] } })
    .populate("user")
    .sort({ createdAt: -1 });
  if (!posts) {
    return next(new ErrorResponse(`Posts not found`, 404));
  }

  res.status(200).json({ success: true, data: posts });
});

exports.postFullTextSearch = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ $text: { $search: req.query.q } }).populate(
    "user"
  );
  if (!posts) {
    return next(new ErrorResponse(`Posts not found`, 404));
  }

  res.status(200).json({ success: true, data: posts });
});
