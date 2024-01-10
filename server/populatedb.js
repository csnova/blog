#! /usr/bin/env node

console.log(
  'This script populates some users, posts and comments. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/user");
const BlogPost = require("./models/blogpost");
const Comment = require("./models/comment");

const blogPosts = [];
const users = [];
const comments = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBlogPosts();
  await createUsers();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// post[0] will always be the first post, regardless of the order
// in which the elements of promise.all's argument complete.
async function blogPostCreate(index, title, text, timestamp, published) {
  const blogPost = new BlogPost({
    title: title,
    text: text,
    timestamp: timestamp,
    published: published,
  });
  await blogPost.save();
  blogPosts[index] = blogPost;
  console.log(`Added blog post: ${title}`);
}

async function userCreate(index, name, username, email, password, admin) {
  const userdetail = {
    name: name,
    username: username,
    email: email,
    password: password,
    admin: admin,
  };
  const user = new User(userdetail);

  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function commentCreate(index, text, timestamp, user, blogPost) {
  const commentdetail = {
    text: text,
    timestamp: timestamp,
    user: user,
    blogPost: blogPost,
  };
  const comment = new Comment(commentdetail);

  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${text}`);
}

async function createBlogPosts() {
  console.log("Adding Blog posts");
  await Promise.all([
    blogPostCreate(
      0,
      "First Post!",
      "Today is a big day for me! i have never made a blog post but i thought today would eb the day! Thank you all for signing up to read what I have to say",
      "2023-12-20T08:34",
      true
    ),
    blogPostCreate(
      1,
      "Today its raining",
      "Well I thought I was going to go out into the world today but then it decided to rain. I guess I am cozying up with some tea and video games today.",
      "2023-12-25T14:39",
      true
    ),
    blogPostCreate(
      2,
      "Maybe I'm not good at this!",
      "Its harder then i thought to come up with interesting things to say. Am I any good at this? Please (kindly) let me know in the comments!",
      "2023-01-02T09:14",
      true
    ),
  ]);
}

async function createUsers() {
  console.log("Adding Users");
  await Promise.all([
    userCreate(0, "Chandler", "csnova", "csnova@g.com", "hellothere", true),
    userCreate(1, "Patrick", "proth", "proth@gmail.com", "ilikecats", false),
    userCreate(2, "Isaac", "simov", "simov@yahoo.com", "authorwhat", false),
    userCreate(3, "Bob", "bbilll", "bbill@hotmail.com", "booksrock", false),
    userCreate(4, "Jim", "jjones", "jjones@aol.com", "writingrules", false),
  ]);
}

async function createComments() {
  console.log("Adding Comments");
  await Promise.all([
    commentCreate(
      0,
      "Thank you for Posting!",
      "2023-12-20T08:36",
      users[1],
      blogPosts[0]
    ),
    commentCreate(
      1,
      "Lets see how this goes!",
      "2023-12-20T08:41",
      users[2],
      blogPosts[0]
    ),
    commentCreate(
      2,
      "I don't think the blog post was specifically for you, proth!",
      "2023-12-20T08:42",
      users[3],
      blogPosts[0]
    ),
    commentCreate(
      3,
      "Are you actually telling us about the rain....",
      "2023-12-25T14:41",
      users[4],
      blogPosts[1]
    ),
    commentCreate(
      4,
      "Be nice or get out!",
      "2023-12-25T14:44",
      users[1],
      blogPosts[1]
    ),
    commentCreate(
      5,
      "Practice makes perfect!!",
      "2023-01-02T09:16",
      users[2],
      blogPosts[2]
    ),
  ]);
}
