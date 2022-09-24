const express = require('express');
const router = express.Router();

const isLoggedIn = require('./auth');
router.use(isLoggedIn);

const Bill = require('../models/bill');

// save bill
router.post('/', async (req, res) => {
  try {
    const { payment_method, cash, quantity } = req.body;
    let quan_bill = [];

    for (let q of quantity) {
      let data = await Item.findOne({ _id: q._id });
      if (!data) {
        return res.status(400).json('item not found');
      }

      quan_bill.push({
        item_name: data.name,
        price_each: data.price,
        quantity: q.amount,
        item: q._id
      });
    }

    const bill = new Bill({
      payment_method: payment_method,
      cash: cash,
      quantity: quan_bill,
      user_id: req.user._id
    });

    await bill.save();
    return res.json({ message: 'successfully save bill', bill_id: bill._id });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// get bill
router.get('/', async (req, res) => {
  try {
    let { receipt_no, date } = req.query;

    if (receipt_no) {
      const bill = await Bill.findOne({ _id: receipt_no }).populate('user_id');
      res.json(bill);
    } else if (date) {
      date = new Date(date);
      const bills = await Bill.find({user_id: req.user._id}).populate('user_id');
      const result = bills.filter(bill => {
        const { time } = bill;
        return time.getFullYear() === date.getFullYear() && time.getMonth()+1 === date.getMonth()+1 && time.getDate() === date.getDate()
      });
      res.json(result)
    }
    const bills = await Bill.find( {user_id: req.user._id} ).populate('user_id');
    res.json(bills);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;