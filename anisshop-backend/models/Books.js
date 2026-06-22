const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  pages: Number,
  language: String,
  image: String,

  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

module.exports = mongoose.model("Book", bookSchema);
