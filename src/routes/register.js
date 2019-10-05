//const hydraExpress=require('hydra-express')
//const express=hydraExpress.getExpress();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const sanitize = require('mongo-sanitize');
//const { check, validationResult } = require('express-validator/check');
const validator = require('../utilities/validator');

const User = require('../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', async (req, res) => {
	const { name, email, password } = sanitize(req.body);
	//try{
	// 	validator.userEmail(email);
	// 	validator.userPassword(password);
	// 	validator.userName(name);
	// 	validator.userPhone(phone);
	// }catch(err){
	// 	err=>next(err)
	// }

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}
		user = new User({
			uid: new Date().getTime(),
			name,
			email,
			password
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

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
	//console.groupEnd();
});

module.exports = router;
