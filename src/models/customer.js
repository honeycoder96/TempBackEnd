const mongoose = require('mongoose');
const addressSchema = require('./Address');

const ordersSchema = new mongoose.Schema({
	oid: {
		type: String,
		required: true
	},
	pid: {
		type: String,
		required: true
	},
	uid: {
		type: String                                                                                   ,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	discount: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	},
	pmode: {
		type: String
	},
	daddress: {
		type: addressSchema
	},
	sellerName: {
		type: String
	},
	status: {
		type: String
	}
});

module.exports = ordersSchema;
