const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const { io } = require('../server');
// ثبت سفارش توسط کاربر
router.post('/', async (req, res) => {
  try {

    const order = new Order(req.body);
    await order.save();

    // ارسال event به پنل ادمین
    io.emit('new-order', order);

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
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
