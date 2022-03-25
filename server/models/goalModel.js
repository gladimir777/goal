const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
	{
		text: {
			type: String,
			requiered: [true, 'please this field can not be undefined'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
