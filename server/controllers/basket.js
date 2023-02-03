const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const UserBasket = require("../models/UserBasket");
const Post = require("../models/Post");

exports.createSavedPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.body.postId);
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.body.postId}`, 404)
    );
  }
  const user = await UserBasket.findOne({ user: req.user.id });

  if (!user) {
    const basket = await UserBasket.create({
      user: req.user.id,
      posts: [req.body.postId],
    });
    return res.status(200).json({ success: true });
  }

  user.posts.push(req.body.postId);

  await user.save();
  return res.status(200).json({ success: true });
});

exports.getSavedPosts = asyncHandler(async (req, res, next) => {
  const user = await UserBasket.findOne({ user: req.user.id }).populate(
    "posts"
  );

  if (!user) {
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json({ success: true, data: user.posts });
});

exports.removeSavedPost = asyncHandler(async (req, res, next) => {
  const user = await UserBasket.findOne({ user: req.user.id }).populate(
    "posts"
  );

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  user.posts = user.posts.filter((id) => id._id.toString() !== req.params.id);

  await user.save();

  return res.status(200).json({ success: true, data: user.posts });
});
