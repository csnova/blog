const BlogPost = require("../models/blogpost");
const User = require("../models/user");
const Comment = require("../models/comment");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { json } = require("express");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of Posts and user counts (in parallel)
  const [numPosts, numUsers, numComments] = await Promise.all([
    BlogPost.countDocuments({}).exec(),
    User.countDocuments({}).exec(),
    Comment.countDocuments({}).exec(),
  ]);

  res.json({
    user: req.user,
    title: "Home Page",
    post_count: numPosts,
    user_count: numUsers,
    comment_count: numComments,
  });
});

// Example Home Page Request
// curl -X GET http://localhost:3000/blogAPI/
// Worked 1/10 9:00am

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await BlogPost.find({}, "title text timestamp published")
    .sort({ timestamp: 1 })
    .exec();

  if (allPosts === null) {
    // No results.
    allPosts = "No Posts";
  }

  res.json({
    user: req.user,
    title: "Post List",
    post_list: allPosts,
  });
});

// Example Post List
// curl -X GET http://localhost:3000/blogAPI/posts
// Worked 1/10 9:00am (Takes 5 seconds to run)

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const [post, allComments] = await Promise.all([
    BlogPost.findById(req.params.postID).exec(),
    Comment.find({ blogPost: req.params.postID }, "text timestamp user")
      .populate("user")
      .exec(),
  ]);

  if (post === null) {
    // No results.
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json({
    user: req.user,
    title: post.title,
    post: post,
    comments: allComments,
  });
});

// Example Post Details
// curl -X GET http://localhost:3000/blogAPI/post/659dcb1e79c055d658b678d3
// Worked 1/10 9:00am

// Display post create form on GET.
exports.post_create_get = (req, res, next) => {
  res.json({ user: req.user, title: "Create Post" });
};

// Example Display Post Create
// curl -X GET http://localhost:3000/blogAPI/post/create
// Worked 1/10 9:00am

// Handle post create on POST.
exports.post_create_post = [
  // // Validate and sanitize fields.
  body("title").trim().isLength({ min: 1 }),
  body("text").trim().isLength({ min: 1 }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    jwt.verify(
      req.body.token,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          console.log(err);
          res.status(401).send();
        } else {
          // Create post object with escaped and trimmed data
          const dateTime = new Date();
          const blogPost = new BlogPost({
            title: req.body.title,
            text: req.body.text,
            timestamp: dateTime,
            published: req.body.published,
          });

          if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.json({
              user: req.user,
              title: "New Post",
              errors: errors.array(),
            });
            return;
          } else {
            // Data from form is valid.

            // Save post.
            await blogPost.save();
            //Send Back Post id
            res.json({
              blogPost: {
                _id: blogPost._id,
              },
            });
          }
        }
      }
    );
  }),
];

// Example Post
// curl -X POST http://localhost:3000/blogAPI/post/create -H "Content-Type: application/json" -d '{"title":"Lemon Blueberry Cake", "text":"Today I made this great lemon blueberry cake! Next time Im on Ill post the recipe.", "published": true}'
// Worked 1/10 9:00am

// Display post delete form on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
  const [blogPost] = await Promise.all([
    BlogPost.findById(req.params.postID).exec(),
  ]);

  if (blogPost === null) {
    // No results.
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json({
    user: req.user,
    blogPost: blogPost,
    title: "Delete Post",
  });
});

// Example Get For Post Delete
// curl -X GET http://localhost:3000/blogAPI/post/659ed199e9c69f28d65854dc/delete
// Worked 1/10 9:00am

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  jwt.verify(
    req.body.token,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(401).send();
      } else {
        // Get details of post
        const [blogPost] = await Promise.all([
          BlogPost.findById(req.params.postID).exec(),
        ]);

        //Delete post and send back info
        await BlogPost.findByIdAndDelete(req.params.postID);
        res.json("Success");
      }
    }
  );
});

// Example Post for Post Delete
// curl -X POST http://localhost:3000/blogAPI/post/659ed199e9c69f28d65854dc/delete
// Worked 1/10 9:00am

// Display post update form on GET.
exports.post_update_get = asyncHandler(async (req, res, next) => {
  // Get post
  const [blogPost] = await Promise.all([
    BlogPost.findById(req.params.postID).exec(),
  ]);

  if (blogPost === null) {
    // No results.
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json({
    user: req.user,
    blogPost: blogPost,
    title: "Update Post",
  });
});

// Example Display Post Update Form
// curl -X GET http://localhost:3000/blogAPI/post/659ed126bc9eb19ff71d27c6/update
// Worked 1/10 9:00am

// Handle post update on POST.
exports.post_update_post = [
  // Validate and sanitize fields.
  body("title").trim().isLength({ min: 1 }),
  body("text").trim().isLength({ min: 1 }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const [oldBlogPost] = await Promise.all([
      BlogPost.findById(req.params.postID).exec(),
    ]);
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    jwt.verify(
      req.body.token,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          console.log(err);
          res.status(401).send();
        } else {
          // Create the post object with escaped and trimmed data.
          const dateTime = new Date();
          const blogPost = new BlogPost({
            title: req.body.title,
            text: req.body.text,
            timestamp: oldBlogPost.timestamp,
            updated_timestamp: dateTime,
            published: req.body.published,
            _id: req.params.postID,
          });

          if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.json({
              errors: errors.array(),
            });
            return;
          } else {
            // Data from form is valid. Save Post Update.
            const updatePost = await BlogPost.findByIdAndUpdate(
              req.params.postID,
              blogPost,
              {}
            );
            //Send Back Post id
            res.json({
              blogPost: {
                _id: updatePost._id,
              },
            });
          }
        }
      }
    );
  }),
];

//Example of Updating a post
//curl -X POST http://localhost:3000/blogAPI/post/659dcb1e79c055d658b678d3/update -H "Content-Type: application/json" -d '{"title":"FirstPost", "text":"I did it!", "published": true}'
// Worked 1/10 9:00am
