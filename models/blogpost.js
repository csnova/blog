const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true },
});

//Virtual for Blog Post time/date/year
BlogPostSchema.virtual("timestamp_formatted").get(function () {
  let current_timestamp = this.timestamp;
  current_timestamp = current_timestamp.toISOString();
  current_timestamp =
    DateTime.fromISO(current_timestamp).toLocaleString(DateTime.TIME_SIMPLE) +
    ", " +
    DateTime.fromISO(current_timestamp).toLocaleString(DateTime.DATE_MED);
  return current_timestamp;
});

// Virtual for blog post's URL
BlogPostSchema.virtual("url").get(function () {
  return `/blog/post/${this._id}`;
});

// Export model
module.exports = mongoose.model("BlogPost", BlogPostSchema);
