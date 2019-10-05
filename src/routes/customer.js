//const hydraExpress=require('hydra-express')
//const express=hydraExpress.getExpress();
const expres = require('express');
const router = express.Router();

//const { check, validationResult } = require('express-validator/check');
const auth = require('../utilities/auth');
const sanitize = require('mongo-sanitize');

const Contact = require('../models/customer');
const User = require('../models/User');

// @route    GET customer/getOrders
// @desc     Get all orders for a customer
// @access   Private
router.get('/getOrders/:uid', async (req, res) => {
	//console.log('received:', req.params.uid);
	try {
		let uid = req.params.uid;
		const orders = await User.find({ uid }, { _id: 0, orders: 1 }).sort({
			date: -1
		});
		res.json(orders);
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST customer/addAddress
// @desc     Create a contact
// @access   Private
router.post('/address/:uid', auth, async (req, res) => {
	try {
		let uid = req.params.uid;
		const newAddress = sanitize(req.body);
		const address = await User.updateOne({ uid }, { newAddress });

		res.json(address);
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT customer/:uid
// @desc     Update a contact
// @access   Private
router.put('/updateUser/:uid', async (req, res) => {
	try {
		const uid = req.params.uid;
		const oldUser = await User.findOne({ uid });
		if (!oldUser) return res.status(404).json({ msg: 'User not found' });
		const reqData = sanitize(req.body);

		let update = await User.updateOne({ uid }, { $set: reqData });
		res.json(update);
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    PUT customer/:uid
// @desc     push in order
// @access   Private
router.put('/updateOrder/:uid', async (req, res) => {
	try {
		//console.log("hrtttttttterehreh")
		const uid = req.params.uid;
		const oldUser = await User.findOne({ uid });
		if (!oldUser) return res.status(404).json({ msg: 'User not found' });
		const reqData = sanitize(req.body);

		let update = await User.updateOne(
			{ uid },
			{ $push: { orders: reqData.oid } }
		);
		res.json({ data: update.n });
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    DELETE api/contacts/:id
// @desc     Delete a contact
// @access   Private
router.delete('/address/:uid', auth, async (req, res) => {
	try {
		const address = await User.findOne(
			{ uid: req.params.uid },
			{ _id: 0, address: 1 }
		);

		if (!address) return res.status(404).json({ msg: 'User not found' });

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Contact removed' });
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
