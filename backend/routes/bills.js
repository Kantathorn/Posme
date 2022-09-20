const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('./auth');
router.use(isLoggedIn);

const Bill = require('../models/bill');
const Item = require('../models/item')
const ItemType = require('../models/item_type')


// save bill
router.post('/', async (req, res) => {
  try {
    const { payment_method, cash, quantity } = req.body;

    console.log(quantity)

    let quan_bill = []
    for (let i = 0; i < quantity.length; i++) {
        Item.findOne({'_id': quantity[i]._id}, (err, data) => {
            if (err) {
                return res.status(400).json(err)
            } else if (!data) {
                return res.status(400).json({'message': `no item _id: ${quantity[i]._id}`})
            } else {      
                quan_bill.push({
                    item_name: data.name,
                    price_each: data.price,
                       quantity: quantity[i].amount,
                    item: quantity[i]._id
                })

                console.log({
                    item_name: data.name,
                    price_each: data.price,
                    quantity: quantity[i].amount,
                    item: quantity[i]._id
                }) 
                
            }       
        })
    }   
    

    console.log(quan_bill)

    const bill = new Bill({
      payment_method: payment_method,
      cash: cash,
      quantity: quan_bill,
      user_id: req.user._id
    });

    console.log(bill)

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