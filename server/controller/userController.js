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
			res.status(201).json({ _id: user.id, name, email });
		}
	} catch (error) {
		res.status(500);
		next(new Error(error));
	}
};

const login = async (req, res) => {
	const body = req.body;
	try {
		const user = await User.findOne(body);
		res.status(200).json(user);
	} catch (error) {}
};

const getUser = async (req, res) => {
	const body = req.body;
	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (error) {}
};

module.exports = {
	registerUser,
	login,
	getUser,
};
