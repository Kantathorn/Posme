const express = require('express')  
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()


router.post('/register', (req, res, next) => {
	const { username, password, store_name, address, f_name, l_name, email, promptpay_number } = req.body;
	const this_user = new User({
		username: username,
		store_name: store_name,
		address: address,
		f_name: f_name,
		l_name: l_name,
		email: email,
		promptpay_number: promptpay_number
	})
	User.register(this_user, password, (err) => {
		console.log('check!')
		if (err) {
			res.status(400).json(err)
		}
		res.status(200).json({'message': 'successfully created account'})
		
	})
})


router.post('/login', passport.authenticate('local'), (req, res) => {
	res.status(200).json({'message': 'successfully login'})
})


router.post('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			res.status(400).json(err)
		}
		res.status(200).json({'message': 'successfully logged-out'})
	})
})


function isLoggedIn (req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(400).json({'message': 'not logged-in'})
	} else {
		return next()
	}
}


router.get('/is_logged_in_check', isLoggedIn, (req, res, next) => {
	res.status(200).json({'message': `logged-in as (${req.user.username})`})
})

router.get('/user_id', isLoggedIn, (req, res, next) => {
	res.json({"user_id": `${req.user._id}`})
})


module.exports = router
module.exports.isLoggedIn = isLoggedIn






