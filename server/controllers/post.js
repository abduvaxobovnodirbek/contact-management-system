const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Post = require("../models/Post");
const User = require("../models/User");
const { cloudinary } = require("../utils/cloudinary");
const { default: mongoose } = require("mongoose");

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("user").sort("-createdAt");

  if (!posts) {
    return next(new ErrorResponse(`Posts not found`, 404));
  }

  res.status(200).json({ success: true, data: posts });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("user");

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  let publicIds = [];

  if (req.body.imageList.length) {
    req.body.imageList.map(async (image, index) => {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "dev_setups",
      });
      if (uploadResponse.public_id) {
        publicIds = [...publicIds, uploadResponse.public_id.slice(11)];
        if (publicIds.length === req.body.imageList.length) {
          const post = await Post.create({
            ...req.body,
            imageList: publicIds,
          });
          res.status(201).json({
            success: true,
            data: post,
          });
        }
      }
    });
  } else {
    const post = await Post.create({
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  }
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  req.body = { ...req.body, user: req.body.userId };

  let post = await Post.findById(req.params.id);
  let images = [...req.body.imageList];
  let new_images = [];

  if (!post) {
    return next(
      new ErrorResponse(`post not found with id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== "super_admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to update this post`,
        401
      )
    );
  }

  if (images.length) {
    images.map(async (image) => {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "dev_setups",
      });
      if (uploadResponse.public_id) {
        new_images = [...new_images, uploadResponse.public_id.slice(11)];
        if (new_images.length === req.body.imageList.length) {
          const post = await Post.findOneAndUpdate(
            req.params.id,
            { ...req.body, imageList: new_images },
            {
              new: true,
              runValidators: true,
            }
          );
          res.status(201).json({
            success: true,
            data: post,
          });
        }
      }
    });
  } else {
    const post = await Post.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: post });
  }
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== "super_admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to delete this post`,
        401
      )
    );
  }

  post.remove();

  res.status(200).json({ success: true, data: {} });
});

exports.getTags = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  let tags = [];
  if (posts.length) {
    posts.map((data) => {
      data.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  }

  res.status(200).json({ success: true, tags });
});
