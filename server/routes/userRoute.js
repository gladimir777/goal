const express = require('express');
const router = express.Router();

const {
	registerUser,
	login,
	getUser,
} = require('../controller/userController');
const userAuth = require('../midleware/authMidleware');

router.post('/', registerUser);
router.post('/login', login);
router.get('/me', userAuth, getUser);
module.exports = router;
