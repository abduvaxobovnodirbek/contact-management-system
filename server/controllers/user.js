const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const { cloudinary } = require("../utils/cloudinary");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  let user = await User.find();
  user = user.filter((person) => person.role !== "super_admin");
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  if (user.id.toString() !== req.user.id && req.user.role !== "super_admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to update this user`,
        401
      )
    );
  }

  if (req.body.image) {
    const cloudinaryUpload = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "dev_setups",
    });
    await cloudinary.uploader.destroy(
      "dev_setups/" + req.body.public_id,
      function (err, result) {}
    );
    req.body.image = cloudinaryUpload.public_id.slice(11);
  }

  user = await User.findOneAndUpdate({ email: req.body.email }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

exports.statusChange = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  user.status = req.body.status;
  await user.save();

  res.status(200).json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (req.user.role !== "super_admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to delete this user`,
        401
      )
    );
  }

  await user.remove();
  const posts = await Post.find({
    user: mongoose.Types.ObjectId(req.params.id),
  });
  await posts.map(async (review) => {
    if (post) {
      await review.remove();
    }
  });

  res.status(200).json({ success: true, data: {} });
});
