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
		throw new Error('Error field undefine');
	}

	try {
		const goal = await Goal.create({ text: req.body.text });
		res.status(200).json(goal);
	} catch (error) {
		throw new Error('Error field undefined', error);
	}
};

const editGoals = (req, res) => {
	res.send('get all my goals');
};

const deleteGoals = (req, res) => {
	res.send('get all my goals');
};

module.exports = {
	getGoals,
	createGoals,
	editGoals,
	deleteGoals,
};
