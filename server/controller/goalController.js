const erroHandler = require('../midleware/errorMidleware');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = async (req, res) => {
	try {
		const { _id } = req.user;
		const goal = await Goal.find({ user: _id });
		res.status(200).json(goal);
	} catch (error) {
		throw new Error('Somting wrong just happened', error);
	}
};

const createGoals = async (req, res) => {
	if (!req.body.text) {
		throw new Error('Error field undefined');
	}

	try {
		const user = req.user;
		const goal = await Goal.create({ text: req.body.text, user: user._id });
		res.status(200).json(goal);
	} catch (error) {
		throw new Error('Error field undefined', error);
	}
};

const editGoals = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const user = await User.findById(_id).select('-password');
		if (!user) {
			res.status(404);
			nex(new Error('User not found'));
		}
		const goal = await Goal.findById(req.params.id);
		if (!goal) {
			res.status(404);
			next(new Error('Goal not exist'));
		}

		if (goal.user == user.id) {
			const updatedGoal = await Goal.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);
			res.status(200).json(updatedGoal);
			next();
		} else {
			res.status(401);
			next(new Error('User not authorized'));
		}
	} catch (error) {
		console.log(error);
		next(new Error('Someting wrong just happened'));
	}
};

const deleteGoals = async (req, res) => {
	try {
		if (!req.params.id) {
			throw new Error('Please provide an id');
		}
		const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
		res.status(200).json(deletedGoal);
	} catch (error) {
		res.status(500);
		throw new Error('Someting wrong just happened');
	}
};

module.exports = {
	getGoals,
	createGoals,
	editGoals,
	deleteGoals,
};
