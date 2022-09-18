const express = require('express');
const router = express.Router();

const isLoggedIn = require('./auth');
router.use(isLoggedIn);

const Bill = require('../models/bill');

// save bill
router.post('/', async (req, res) => {
  try {
    const { payment_method, cash, quantity } = req.body;
    const bill = new Bill({
      payment_method: payment_method,
      cash: cash,
      quantity: quantity,
      user_id: req.user._id
    });

    await bill.save();
    res.json({ message: 'successfully save bill', bill_id: bill._id });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;