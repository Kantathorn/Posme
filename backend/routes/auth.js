const express = require('express')  
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()


// register
router.post('/register', (req, res, next) => {
	const { username, password, store_name, address, f_name, l_name, email, tax_id, promptpay_number } = req.body;
	const this_user = new User({
		username: username,
		store_name: store_name,
		address: address,
		f_name: f_name,
		l_name: l_name,
		email: email,
		tax_id: tax_id,
		promptpay_number: promptpay_number
	})
	User.register(this_user, password, (err) => {
		console.log('check!')
		if (err) {
			res.status(400).json(err)
		}
		res.json({'message': 'successfully created account'})
		
	})
})


// login
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.json({'message': `successfully login as (${req.user.username})`})
})


router.post('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			res.status(400).json(err)
		}
		res.json({'message': 'successfully logged-out'})
	})
})


// middleware isLoggedIn func
function isLoggedIn (req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(401).json({'message': 'not logged-in'})
	} else {
		return next()
	}
}


// is logged in check
router.get('/is_logged_in_check', isLoggedIn, (req, res, next) => {
	res.json({'message': `logged-in as (${req.user.username})`})
})


// get user id
router.get('/user_id', isLoggedIn, (req, res, next) => {
	res.json({"user_id": `${req.user._id}`})
})


// get all user info
router.get('/user', isLoggedIn, (req, res, next) => {
	res.json(req.user)
})


module.exports = router
module.exports.isLoggedIn = isLoggedIn






