const express = require('express');
const {
	getGoals,
	createGoals,
	editGoals,
	deleteGoals,
} = require('../controller/goalController');
const authMidleware = require('../midleware/authMidleware');

const router = express.Router();

router.get('/', authMidleware, getGoals);

router.post('/', authMidleware, createGoals);

router.put('/:id', authMidleware, editGoals);

router.delete('/:id', authMidleware, deleteGoals);

module.exports = router;
