const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  admin: { type: Boolean, required: true },
});

// A static method to the User model for finding a user by username
UserSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username });
};

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/blog/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
