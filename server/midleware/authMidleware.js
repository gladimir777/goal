const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userAuth = (err, req, res, next) => {
	let token;
	try {
		if (req.headers.authorisation && req.headers.authorisation.Bearer) {
			token = req.headers.authorisation.split(' ');

			const decodedUser = jwt.verify(token, process.env.SECRETE);

			const user = User.findById(decodedUser.id).select('-password');
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
