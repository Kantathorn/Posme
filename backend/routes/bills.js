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
      return res.json(bill);
    } else if (date) {
      date = new Date(date);
      const bills = await Bill.find({user_id: req.user._id}).populate('user_id');
      const result = bills.filter(bill => {
        const { time } = bill;
        return time.getFullYear() === date.getFullYear() && time.getMonth()+1 === date.getMonth()+1 && time.getDate() === date.getDate()
      });
      return res.json(result)
    }
    const bills = await Bill.find( {user_id: req.user._id} ).populate('user_id');
    return res.json(bills);

  } catch (err) {
    return res.status(400).json(err);
  }
});


// ยอดขาย
router.post('/total', async (req, res) => {
  try {
    const { date } = req.body;
    let month = Number(date.slice(5, 7))
    let year = Number(date.slice(0, 4))

    const bills = await Bill.find({ user_id: req.user._id });
    let sum = 0;
    for (let i = 0; i < bills.length; i++) {
      let { time } = bills[i];
      if (time.getMonth()+1 === month && year === time.getFullYear()) {
        for (let j = 0; j < bills[i].quantity.length; j++) {
          let price_each = bills[i].quantity[j].price_each;
          let quantity = bills[i].quantity[j].quantity;
          sum += price_each * quantity
        }
      }
    }
    return res.json({total: sum});
  } catch (err) {
    return res.status(400).json(err);
  }
});


// best selling item
router.post('/bestselling', async (req, res) => {
  try {

    const { sort, date } = req.body
    if (sort == null && date == null) {
      return res.status(400).json( {message: "required 'sort' and 'date'"} )
    }
    let month = Number(date.slice(5, 7))
    let year = Number(date.slice(0, 4))

    const bills = await Bill.find({ user_id: req.user._id });
    let items_data = []
    for (let i = 0; i < bills.length; i++) {
      let { time } = bills[i];
      if (time.getMonth()+1 === month && year === time.getFullYear()) {
        for (let j = 0; j < bills[i].quantity.length; j++) {
          items_data.push(bills[i].quantity[j])
        }
      }
    }

    let items_group = []
    items_data.reduce((res, value) => {
      if (!res[value.item]) {
        res[value.item] = { item: value.item, item_name: value.item_name, amount: 0, total_sales: 0}
        items_group.push(res[value.item])
      }
      res[value.item].amount += value.quantity
      res[value.item].total_sales += value.price_each * value.quantity
      return res
    }, {})

    items_group.sort(dynamicSort("-" + sort))

    return res.json(items_group)

  } catch (err) {
    return res.status(400).json(err)
  }
})


function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}


module.exports = router;