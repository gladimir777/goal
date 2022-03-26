const Goal = require('../models/goalModel');

const getGoals = async (req, res) => {
	try {
		const goal = await Goal.find();
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
		const goal = await Goal.create({ text: req.body.text });
		res.status(200).json(goal);
	} catch (error) {
		throw new Error('Error field undefined', error);
	}
};

const editGoals = async (req, res) => {
	try {
		const goal = await Goal.findById(req.params.id);
		if (!goal) {
			res.status(404);
			throw new Error('Goal not exist');
		}

		const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(updatedGoal);
	} catch (error) {
		throw new Error('Someting wrong just happened');
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
