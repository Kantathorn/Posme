const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { isLoggedIn }  = require('./auth');

router.use(isLoggedIn);

// import model
const Item = require('../models/item');
const Quantity = require('../models/quantity');
const Bill = require('../models/bill');
const User = require('../models/user');


// get item data from scan barcode
router.get('/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;

    const item = await Item.findOne({ barcode: barcode });

    let { _id, name, price, discount } = item;
    const { is_discount, discount_price, end_date } = discount;
    const now = new Date();

    if (is_discount && end_date >= now) {
      price -= discount_price;
    }

    res.status(200).json({
      id: _id.toString(),
      name: name,
      price_each: price
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// create bill
// ส่งมาเป็น array [{ id, name, price, total }, ...]
router.post('/', async (req, res) => {
  try {
    const cart = req.body;

    const payload = [];

    for (let i = 0; i < cart.length; i++) {
      let { id, name, price, total }= cart[i];
      let _id = new mongoose.Types.ObjectId(id);
      let quantity = new Quantity({
        item_name: name,
        price_each: price,
        quantity: total,
        item: _id
      });
      payload.push(quantity._id);

      quantity.save();
    }

    const bill=  new Bill({ quantity: payload });
    await bill.save();
    
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { bill: bill._id } },
      { safe: true, upsert: true }
    );

    res.status(200).json({
      message: 'create bill complete',
      id: bill._id.toString()
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/bill/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);

    const bill = await Bill.findOne({ _id: _id }).populate('quantity');

    let { quantity } = bill;

    const result = [];
    quantity.forEach(e => {
      let { item_name, price_each, quantity } = e;
      let obj = {
        name: item_name,
        amount: price_each*quantity,
        total: quantity
      }
      result.push(obj);
    });

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;