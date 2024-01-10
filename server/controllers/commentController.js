const Comment = require("../models/comment");
const BlogPost = require("../models/blogpost");
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display detail page for a specific comment.
exports.comment_detail = asyncHandler(async (req, res, next) => {
  const [comment, postForComment] = await Promise.all([
    Comment.findById(req.params.commentID).exec(),
    BlogPost.findById(req.params.postID).exec(),
  ]);

  if (comment === null) {
    // No results.
    const err = new Error("Comment not found");
    err.status = 404;
    return next(err);
  }

  res.json({
    user: req.user,
    title: postForComment.title,
    post: postForComment,
    comment: comment,
  });
});

// Example Comment Details
// curl -X GET http://localhost:3000/blogAPI/post/659dcb1e79c055d658b678d3/659dd94a9bde19174142e486
// Worked 1/10 9:30am

// Display comment create form on GET.
exports.comment_create_get = asyncHandler(async (req, res, next) => {
  const [postForComment] = await Promise.all([
    BlogPost.findById(req.params.postID).exec(),
  ]);
  res.json({
    user: req.user,
    post: postForComment,
    title: `Comment for Post: ${postForComment.title}`,
  });
});

// Example Comment Create Form
// curl -X GET http://localhost:3000/blogAPI/post/659dcb1e79c055d658b678d3/create
// Worked 1/10 9:30am

// Handle comment create on POST.
exports.comment_create_post = [
  // // Validate and sanitize fields.
  body("text").trim().isLength({ min: 1 }),
  body("userID").trim().isLength({ min: 1 }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create post object with escaped and trimmed data
    const dateTime = new Date();
    const comment = new Comment({
      blogPost: req.params.postID,
      text: req.body.text,
      timestamp: dateTime,
      user: req.body.userID,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json({
        user: req.body.userID,
        blogPost: req.params.postID,
        title: "New Comment",
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save post.
      await comment.save();
      // Redirect to Posts
      res.redirect("/blogAPI/posts");
    }
  }),
];

// Example Comment Create
// curl -X POST http://localhost:3000/blogAPI/post/659ed126bc9eb19ff71d27c6/create -H "Content-Type: application/json" -d '{"text":"Fake Comment", "userID":"659ece2ab68d0bb1e4107a49"}'
// Worked 1/10 9:30am

// Display comment delete form on GET.
exports.comment_delete_get = asyncHandler(async (req, res, next) => {
  const [comment, postForComment] = await Promise.all([
    Comment.findById(req.params.commentID).exec(),
    BlogPost.findById(req.params.postID).exec(),
  ]);
  res.json({
    user: req.user,
    post: postForComment,
    comment: comment,
    title: "Delete Comment",
  });
});

// Example Delete Comment Form
// curl -X GET http://localhost:3000/blogAPI/post/659dcb1e79c055d658b678d3/659ed582ff92710fa6d51319/delete
// Worked 1/10 9:30am

// Handle comment delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of comment and post
  const [comment, postForComment] = await Promise.all([
    Comment.findById(req.params.commentID).exec(),
    BlogPost.findById(req.params.postID).exec(),
  ]);

  //Delete comment and redirect to post.
  await Comment.findByIdAndDelete(req.params.commentID);
  res.redirect(`/blogApi/post/${req.params.postID}`);
});

// Example Delete Comment
// curl -X POST http://localhost:3000/blogAPI/post/659dcb1e79c055d658b678d3/659ed582ff92710fa6d51319/delete
// Worked 1/10 9:30am
