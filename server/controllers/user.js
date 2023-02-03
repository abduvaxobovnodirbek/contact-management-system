const User = require("../models/User");
const asyncHandler = require("../middlewares/async");

// description    Get me (authenticated user)
// route         GET /api/v1/user/me
// access        Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
