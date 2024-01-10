const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  blogPost: { type: Schema.Types.ObjectId, ref: "BlogPost", required: true },
});

//Virtual for Comment time/date/year
CommentSchema.virtual("timestamp_formatted").get(function () {
  let current_timestamp = this.timestamp;
  current_timestamp = current_timestamp.toISOString();
  current_timestamp =
    DateTime.fromISO(current_timestamp).toLocaleString(DateTime.TIME_SIMPLE) +
    ", " +
    DateTime.fromISO(current_timestamp).toLocaleString(DateTime.DATE_MED);
  return current_timestamp;
});

// Virtual for comment's URL
CommentSchema.virtual("url").get(function () {
  return `/blog/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
