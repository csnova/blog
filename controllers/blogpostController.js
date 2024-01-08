const BlogPost = require("../models/blogpost");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home Page");
});

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post List");
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Post detail: ${req.params.pstID}`);
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Create Post GET`);
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Create Post POST`);
});

// Display post delete form on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Delete Post GET`);
});

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Delete Post POST`);
});
