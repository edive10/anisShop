const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  author: String,
  text: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Review", reviewSchema);
