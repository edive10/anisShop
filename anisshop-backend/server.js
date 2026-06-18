require('dotenv').config(); // بارگذاری متغیرهای امن

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

/* ---------- MongoDB Connection ---------- */


/* ---------- Static Assets ---------- */

app.use('/assets', express.static(path.join(__dirname, '../src/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

  isBestSeller: {
    type: Boolean,
    default: false
  },

  isNew: {
    type: Boolean,
    default: false
  },

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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });
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

app.put('/books/:id', async (req, res) => {

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedBook);

});
app.post('/books', upload.single('image'), async (req, res) => {

  try {

    const book = new Book({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      pages: req.body.pages,
      language: req.body.language,
      image: req.file ? req.file.filename : null
    });

    await book.save();

    res.status(201).json(book);

  } catch (error) {

    res.status(500).json({
      message: 'Error adding book',
      error: error
    });

  }

});

app.use('/uploads', express.static('uploads'));
