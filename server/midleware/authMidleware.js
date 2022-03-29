const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userAuth = async (req, res, next) => {
	let token;

	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];

			const decodedUser = jwt.verify(token, process.env.SECRETE);

			const user = await User.findById(decodedUser._id).select('-password');

			req.user = user;
			next();
		} else {
			res.status(401);
			next(new Error('UnAuthorize'));
		}
	} catch (error) {
		res.status(401);
		next(new Error('Unauthorize'));
	}
};

module.exports = userAuth;
