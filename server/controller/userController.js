const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			res.status(400);
			next(new Error('Please add all field'));
		}
		const userFound = await User.findOne({ email });
		if (userFound) {
			res.status(400);
			next(new Error('User aleready exist'));
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = await User.create({ name, email, password: hashedPassword });
			const token = genToken(user.id);
			res.status(201).json({ _id: user.id, name, email, token });
		}
	} catch (error) {
		res.status(500);
		next(new Error(error));
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		console.log('Login', user.id);
		if (!user) {
			res.status(404);
			next(new Error('User Not found'));
		} else {
			const verifyPassword = await bcrypt.compare(password, user.password);
			if (verifyPassword) {
				const token = genToken(user.id);
				res.status(200).json({ token, name: user.name });
			} else {
				res.status(400);
				next(new Error('Invalid user'));
			}
		}
	} catch (error) {
		next(new Error(error));
	}
};

const genToken = (payload) => {
	return jwt.sign({ _id: payload }, process.env.SECRETE, {
		expiresIn: '2h',
	});
};

const getUser = async (req, res) => {
	const body = req.body;
	try {
		//const user = await User.find();
		res.status(200).json(req.user);
	} catch (error) {}
};

module.exports = {
	registerUser,
	login,
	getUser,
};
