const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			requiered: true,
			ref: 'User',
		},
		text: {
			type: String,
			requiered: [true, 'Please add a text'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
