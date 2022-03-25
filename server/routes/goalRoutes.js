const express = require('express');
const {
	getGoals,
	createGoals,
	editGoals,
	deleteGoals,
} = require('../controller/goalController');

const router = express.Router();

router.get('/', getGoals);

router.post('/', createGoals);

router.put('/:id', editGoals);

router.delete('/:id', deleteGoals);

module.exports = router;
