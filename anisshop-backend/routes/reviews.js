const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

/* Get reviews for a book */
router.get("/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

/* Add review */
router.post("/:bookId", async (req, res) => {
  try {

    const review = new Review({
      bookId: req.params.bookId,
      author: req.body.author,
      text: req.body.text,
      rating: req.body.rating
    });

    await review.save();

    res.json(review);

  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

module.exports = router;
