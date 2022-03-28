const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please add an name'],
	},
	email: {
		type: String,
		required: [true, 'please add an email'],
	},
	password: {
		type: String,
		required: [true, 'please add an password'],
	},
});

module.exports = mongoose.model('User', userSchema);
