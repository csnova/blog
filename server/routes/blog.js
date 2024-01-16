const express = require("express");
const router = express.Router();

// Require controller modules.
const blogpost_controller = require("../controllers/blogpostController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");

/// Blog Post ROUTES ///

// GET home page.
router.get("/", blogpost_controller.index);

// GET request for creating a post. NOTE This must come before routes that display posts (uses the post id).
router.get("/post/create", blogpost_controller.post_create_get);

// POST request for creating Post.
router.post("/post/create", blogpost_controller.post_create_post);

// GET request for deleting a Post.
router.get("/post/:postID/delete", blogpost_controller.post_delete_get);

// POST request for creating Post.
router.post("/post/:postID/delete", blogpost_controller.post_delete_post);

// GET request for deleting a Post.
router.get("/post/:postID/update", blogpost_controller.post_update_get);

// POST request for creating Post.
router.post("/post/:postID/update", blogpost_controller.post_update_post);

// GET request for one post.
router.get("/post/:postID", blogpost_controller.post_detail);

// GET request for list of all post items.
router.get("/posts", blogpost_controller.post_list);

/// Comment ROUTES ///

// GET request for creating a comment. NOTE This must come before routes that display comments (uses the comment id).
router.get("/post/:postID/create", comment_controller.comment_create_get);

// POST request for creating comment.
router.post("/post/:postID/create", comment_controller.comment_create_post);

// GET request for deleting a comment.
router.get(
  "/post/:postID/:commentID/delete",
  comment_controller.comment_delete_get
);

// POST request for deleting comment.
router.post(
  "/post/:postID/:commentID/delete",
  comment_controller.comment_delete_post
);

// GET request for one comment.
router.get("/post/:postID/:commentID", comment_controller.comment_detail);

/// User ROUTES ///

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get("/user/sign-up", user_controller.user_sign_up_get);

// POST request for creating User.
router.post("/user/sign-up", user_controller.user_sign_up_post);

// GET request User Sign In
router.get("/user/sign-in", user_controller.user_sign_in_get);

// POST request User Sign In
router.post("/user/sign-in", user_controller.user_sign_in_post);

// GET request User Sign Out
router.get("/user/sign-out", user_controller.user_sign_out_get);

// POST request User Sign Out
router.post("/user/sign-out", user_controller.user_sign_out_post);

// Post request to Update user.
router.post("/user/:userID/edit", user_controller.user_update_post);

// GET request for one User.
router.get("/user/:userID", user_controller.user_detail);

// GET request for list of all Users.
router.get("/users", user_controller.user_list);

module.exports = router;
