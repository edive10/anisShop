/* -------------------------------------------
   Load Environment Variables FIRST
-------------------------------------------- */
require('dotenv').config();

/* -------------------------------------------
   Imports
-------------------------------------------- */
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

/* -------------------------------------------
   Security Variables
-------------------------------------------- */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
const JWT_SECRET = process.env.JWT_SECRET;

console.log("ADMIN_EMAIL from env:", ADMIN_EMAIL);

/* -------------------------------------------
   App Setup
-------------------------------------------- */
const app = express();
const server = http.createServer(app);
const PORT = 3000;

/* -------------------------------------------
   Socket.IO
-------------------------------------------- */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

/* -------------------------------------------
   Middlewares
-------------------------------------------- */
app.use(cors());
app.use(express.json());

/* -------------------------------------------
   Static Files
-------------------------------------------- */
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* -------------------------------------------
   Database Schemas
-------------------------------------------- */
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

/* -------------------------------------------
   Multer (File Upload)
-------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

/* -------------------------------------------
   Admin Auth Middleware
-------------------------------------------- */
function verifyAdminToken(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* -------------------------------------------
   Admin Login Route
-------------------------------------------- */
app.post('/admin/login', (req, res) => {

  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL)
    return res.status(401).json({ message: "Invalid email" });

  const isMatch = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { role: "admin" },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

/* -------------------------------------------
   Books API
-------------------------------------------- */
app.get("/books", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

/* -------------------------------------------
   Reviews
-------------------------------------------- */
app.get("/books/:id/reviews", async (req, res) => {
  const reviews = await Review.find({ bookId: req.params.id });
  res.json(reviews);
});

app.post("/books/:id/reviews", async (req, res) => {
  const review = new Review({
    bookId: req.params.id,
    author: req.body.author,
    text: req.body.text,
    rating: req.body.rating
  });

  await review.save();
  res.json(review);
});

/* -------------------------------------------
   Add Book (Protected)
-------------------------------------------- */
app.post('/books', verifyAdminToken, upload.single('image'), async (req, res) => {
  try {
    const book = new Book({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      pages: Number(req.body.pages),
      language: req.body.language,
      isBestSeller: req.body.isBestSeller === "true" || req.body.isBestSeller === true,
      isNewArrival: req.body.isNewArrival === "true" || req.body.isNewArrival === true,
      isActive: req.body.isActive === "false" ? false : true,
      discount: Number(req.body.discount) || 0,
      image: req.file ? req.file.filename : null
    });

    await book.save();
    io.emit("booksChanged");

    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({
      message: "Error adding book",
      error
    });
  }
});

/* -------------------------------------------
   Update Book (Protected)
-------------------------------------------- */
app.put('/books/:id', verifyAdminToken, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(

      req.params.id,

      {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        stock: Number(req.body.stock),
        pages: Number(req.body.pages),
        language: req.body.language,
        image: req.body.image,
        isBestSeller: req.body.isBestSeller,
        isNewArrival: req.body.isNewArrival,
        isActive: req.body.isActive,
        discount: Number(req.body.discount) || 0
      },

      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    io.emit("booksChanged");
    res.json(updatedBook);

  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

/* -------------------------------------------
   Delete Book (Protected)
-------------------------------------------- */
app.delete('/books/:id', verifyAdminToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).json({ message: "Book not found" });

    if (book.image) {
      const imagePath = path.join(__dirname, "uploads", book.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Book.findByIdAndDelete(req.params.id);
    io.emit("booksChanged");

    res.json({ message: "Book deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

/* -------------------------------------------
   Start Server
-------------------------------------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    server.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
