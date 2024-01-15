const User = require("../models/user");
const Comment = require("../models/comment");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Users.
exports.user_list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "name username email admin")
    .sort({ username: 1 })
    .exec();
  res.json(allUsers);
});

// Example for getting a list of users
// curl -X GET http://localhost:3000/blogAPI/users
// Worked 1/10 9:00am

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  const [specificUser, allCommentsByUser] = await Promise.all([
    User.findById(req.params.userID).exec(),
    Comment.find({ user: req.params.userID }, "text timestamp blogPost").exec(),
  ]);

  if (specificUser === null) {
    // No results.
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.json({
    user: req.user,
    title: specificUser.username,
    specificUser: specificUser,
    comments: allCommentsByUser,
  });
});

// Example for looking up a specific user
// curl -X GET http://localhost:3000/blogAPI/user/659d790596d909ba6396a9ba
// Worked 1/10 9:00am

// Display User sign up form on GET.
exports.user_sign_up_get = (req, res, next) => {
  res.json({ user: req.user, title: "Sign Up Form" });
};

// Example for looking up a specific user
// curl -X GET http://localhost:3000/blogAPI/user/sign-up
// Worked 1/10 9:00am

// Handle User sign up on POST.
exports.user_sign_up_post = [
  // Validate and sanitize fields.
  body("name").trim().isLength({ min: 1 }).escape(),
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long.")
    .custom(async (value) => {
      const existingUser = await User.findByUsername(value);
      if (existingUser) {
        // Will use the below as the error message
        throw new Error("A user already exists with this username");
      }
    })
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters.")
    .escape(),
  body("email").trim().isLength({ min: 5 }).escape(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .escape(),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords Do Not Match"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // Create Users object with escaped and trimmed data
      const user = new User({
        username: req.body.username.toLowerCase(), // Convert to lowercase
        password: hashedPassword,
        name: req.body.name,
        email: req.body.email,
        admin: false,
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.json({
          title: "Sign Up Form",
          user: user,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.

        // Save user.
        await user.save();

        // Log in the user after successful signup
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          // Redirect to homepage
          res.json(user);
        });
      }
    });
  }),
];

// Example Format for Adding a User
// curl -X POST http://localhost:3000/blogAPI/user/sign-up -H "Content-Type: application/json" -d '{"name":"Chip", "username":"spike", "email":"spike@gmail.com", "password":"nolaforlife", "confirm_password":"nolaforlife"}'
// Worked 1/10 9:00am

// Display User sign in form on GET.
exports.user_sign_in_get = asyncHandler(async (req, res, next) => {
  res.json({ user: req.user, title: "Sign In Form" });
});

// Example for display user sign in form
// curl -X GET http://localhost:3000/blogAPI/user/sign-in
// Worked 1/10 9:00am

// Handle User sign in on POST.
exports.user_sign_in_post = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Could not authenticate",
        user,
      });
    }
    if (err) res.send(err);
    jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) return res.status(400).json(err);
        res.json({
          token: token,
          user: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            admin: user.admin,
          },
        });
      }
    );
  })(req, res);
};

// Example Sign In
// curl -X POST http://localhost:3000/blogAPI/user/sign-in -H "Content-Type: application/json" -d '{"username":"csnova", "password":"hellothere"}'
// *Technically* Worked 1/10 9:00am (added token since then)

// Display User sign out form on GET.
exports.user_sign_out_get = asyncHandler(async (req, res, next) => {
  res.json({ user: req.user, title: "Sign Out" });
});

// Example for display user sign out form
// curl -X GET http://localhost:3000/blogAPI/user/sign-out
// Worked 1/10 9:00am

// Handle User sign out on POST.
exports.user_sign_out_post = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json("Success");
  });
});

// Example Sign Out
// curl -X POST http://localhost:3000/blogAPI/user/sign-out
// *Technically* Worked 1/10 9:00am
