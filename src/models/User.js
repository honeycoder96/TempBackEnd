const mongoose = require('mongoose');
const ordersSchema = require('./orders');
const addressSchema = require('./Address');

const walletSchema = new mongoose.Schema({
	amount: {
		type: Number,
		default: 0
	},
	transactions: {
		type: [ordersSchema],
		default: []
	}
});

const usersSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
		unique: true
	},
	role: {
		type: String,
		reruired: true,
		enum: ['user', 'admin'],
		default: 'user'
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	address: {
		type: addressSchema
	},
	orders: [],
	wallet: {
		type: walletSchema
	},
	phone: {
		type: Number
		// required:true
	}
});

module.exports = mongoose.model('Users', usersSchema);
