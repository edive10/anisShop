const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// ثبت سفارش توسط کاربر
router.post("/", async (req, res) => {
  try {
    const { customerName, email, address, phone, items, totalPrice } = req.body;

    if (!customerName || !email || !address || !items || !items.length || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      customerName,
      email,
      address,
      phone,
      items,
      totalPrice,
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
});

// گرفتن همه سفارش‌ها برای ادمین
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// تغییر وضعیت سفارش توسط ادمین
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "paid",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
});

module.exports = router;
