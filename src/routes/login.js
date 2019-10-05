//const hydraExpress=require('hydra-express')
//const express=hydraExpress.getExpress();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../utilities/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const sanitize = require('mongo-sanitize');
const { validationResult } = require('express-validator/check');

const User = require('../models/User');

const validator = require('../utilities/validator');

// @route    GET api/auth
// @desc     Get logged user
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findOne({ uid: req.user.uid }).select('-password');
		res.json(user);
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', async (req, res) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	const { email, password } = sanitize(req.body);

	//try{
	//validator.userEmail(email);
	//validator.userPassword(password);
	// }catch(err){
	//  next(err)
	// }

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ msg: 'Email doesnt exist' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Credentials' });
		}

		const payload = {
			user: {
				uid: user.uid,
				name: user.name
			}
		};

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
