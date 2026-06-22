const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "").trim();

  const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = String(process.env.ADMIN_PASSWORD || "").trim();
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({ message: "Admin env variables are missing" });
  }

  if (email !== adminEmail) {
    return res.status(401).json({ message: "Invalid email" });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      email: process.env.ADMIN_EMAIL,
      isAdmin: true
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({
    message: "Login successful",
    token
  });
});

module.exports = router;
