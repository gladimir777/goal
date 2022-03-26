const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, 'please add an email'],
	},
	password: {
		type: String,
		required: [true, 'please add an password'],
	},
	name: {
		type: String,
		required: [true, 'please add an name'],
	},
});

module.exports = mongoose.model('User', userSchema);
