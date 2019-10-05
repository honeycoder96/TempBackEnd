const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	house: {
		type: String,
		default: ''
	},
	city: {
		type: String,
		required: true,
		default: ''
	},
	state: {
		type: String,
		required: true,
		default: ''
	},
	country: {
		type: String,
		required: true,
		default: ''
	}
});

module.exports = addressSchema;
