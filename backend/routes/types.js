const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./auth')

const ItemType = require('../models/item_type')


router.use(isLoggedIn)


// add type
router.post('/', (req, res, next) => {
	const { type_name } = req.body;

	const item = new ItemType({
		type_name: type_name,
		user_id: req.user._id
	});

	ItemType.findOne({'type_name': type_name, user_id: req.user._id}, (err, result) => {
		if (err) {
			res.status(400).json(err)
		}
		if (result) {
			res.status(409).json({'message': 'type_name is already exists'})
		} else {
			item.save((err) => {
				if (err) {
					res.status(400).json(err)
				}
		    	res.end()
			})
		}
	})

	
});


// get type list
router.get('/', (req, res, next) => {
	ItemType.find({'user_id': req.user._id}, (err, data) => {
		if (err) {
			res.status(400).json(err)
		}
		res.json(data)
	})
})


// get one type by id
router.get('/:type_id', (req, res, next) => {
	const type_id = req.params['type_id'];

	ItemType.findOne({'_id': type_id, 'user_id': req.user._id}, (err, data) => {
		if (err) {
			res.status(400).json(err)
		}
		res.json(data)
	})
})


// delete type
router.delete('/:type_id', (req, res, next) => {
	const type_id = req.params['type_id'];

	ItemType.deleteOne({'_id': type_id, 'user_id': req.user._id}, (err, data) => {
		if (err) {
			res.status(400).json(err)
		}
		res.json(data)
	})
})


module.exports = router