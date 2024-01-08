const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

// Display list of all Users.
exports.user_list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "name username email admin")
    .sort({ username: 1 })
    .exec();
  res.json(allUsers);
});

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  const [user, allCommentsByUser] = await Promise.all([
    User.findById(req.params.userID).exec(),
    Comment.find({ user: req.params.userID }, "text timestamp blogPost").exec(),
  ]);

  if (user === null) {
    // No results.
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.json({ user, allCommentsByUser });
});

// Display User sign up form on GET.
exports.user_sign_up_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User create GET");
});

// Handle User sign up on POST.
exports.user_sign_up_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User create POST");
});

// Display User sign in form on GET.
exports.user_sign_in_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User sign in GET");
});

// Display User sign in form on Post.
exports.user_sign_in_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User sign in POST");
});

// Display User sign out form on GET.
exports.user_sign_out_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User sign out GET");
});

// Display User sign out form on POST.
exports.user_sign_out_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User sign out POST");
});
