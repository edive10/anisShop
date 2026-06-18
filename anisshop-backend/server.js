const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

/* ---------- MongoDB Connection ---------- */

mongoose.connect('mongodb://127.0.0.1:27017/anisshop')
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log(err));

/* ---------- Static Assets ---------- */

app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

/* ---------- Schemas ---------- */

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  author: String,
  text: String,
  rating: Number
});

const Book = mongoose.model("Book", bookSchema);
const Review = mongoose.model("Review", reviewSchema);

/* ---------- Books API ---------- */

// گرفتن همه کتاب‌ها
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// گرفتن یک کتاب
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// اضافه کردن کتاب (برای تست)
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

/* ---------- Reviews API ---------- */

// گرفتن نظرات یک کتاب
app.get('/books/:id/reviews', async (req, res) => {

  const bookReviews = await Review.find({
    bookId: req.params.id
  });

  res.json(bookReviews);
});

// اضافه کردن نظر
app.post('/books/:id/reviews', async (req, res) => {

  const newReview = new Review({
    bookId: req.params.id,
    author: req.body.author,
    text: req.body.text,
    rating: req.body.rating
  });

  await newReview.save();

  res.json(newReview);
});

/* ---------- Start Server ---------- */

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
