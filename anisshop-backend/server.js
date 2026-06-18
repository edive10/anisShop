require('dotenv').config(); // بارگذاری متغیرهای امن

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

/* ---------- MongoDB Connection ---------- */


/* ---------- Static Assets ---------- */

app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

/* ---------- Schemas ---------- */

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  pages: Number,
  language: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


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
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
