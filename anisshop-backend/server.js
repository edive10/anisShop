require('dotenv').config();

const Book = require("./models/Books");
const Review = require("./models/Review");
const verifyAdminToken = require("./middleware/verifyAdminToken");
const adminRoutes = require("./routes/admin");
const reviewRoutes = require("./routes/reviews");

/* -------------------------------------------
   Imports
-------------------------------------------- */
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
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
app.use("/admin", adminRoutes);
/* -------------------------------------------
   Static Files
-------------------------------------------- */
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/* -------------------------------------------
   Multer (File Upload)
-------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

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

app.use("/books", reviewRoutes);

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
