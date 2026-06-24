const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    const io = req.app.get('io');

    if (io) {
      io.emit('new-order', savedOrder);
      console.log('📦 new-order emitted');
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order Save Error:', error);
    res.status(500).json({
      message: 'Error creating order',
      error: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Order Get Error:', error);
    res.status(500).json({
      message: 'Error getting orders',
      error: error.message
    });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    const io = req.app.get('io');

    if (io) {
      io.emit('order-status-changed', updatedOrder);
      console.log('🔄 order-status-changed emitted');
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Order Status Update Error:', error);
    res.status(500).json({
      message: 'Error updating order status',
      error: error.message
    });
  }
});

module.exports = router;
