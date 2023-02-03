const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

// description    Register user
// route         POST /api/v1/auth/register
// access        Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //check if the user is already in database
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(
      new ErrorResponse(`The user with '${email}' already exists`, 400)
    );
  }

  //create user
  const user = await User.create({ name, email, password });

  //Create token
  const accessToken = user.GenerateJWT();

  res.status(200).json({ success: true, accessToken });
});

// description  Login User
// route        POST /api/v1/auth/login
// access       Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide credentials`, 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(`The user with '${email}' not  exists`, 400));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials entered`, 400));
  }

  if (user && !user.status) {
    return next(new ErrorResponse(`User account is blocked`, 400));
  }

  const accessToken = user.GenerateJWT();

  res.status(201).json({ success: true, accessToken });
});


