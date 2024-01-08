const Comment = require("../models/comment");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display detail page for a specific comment.
exports.comment_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Comment detail: ${req.params.id}`);
});

// Display comment create form on GET.
exports.comment_create_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Create Comment GET`);
});

// Handle comment create on POST.
exports.comment_create_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Create Comment POST`);
});

// Display comment delete form on GET.
exports.comment_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Delete Comment GET`);
});

// Handle comment delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Delete Comment POST`);
});
