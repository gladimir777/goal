const getGoals = (req, res) => {
	res.send('get all my goals');
};

const createGoals = (req, res) => {
	if (!req.body.id) {
		throw new Error('Error field undefine');
	}
	res.send('get all my goals');
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
