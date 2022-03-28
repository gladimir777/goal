const express = require('express');
const router = express.Router();

const {
	registerUser,
	login,
	getUser,
} = require('../controller/userController');

router.post('/', registerUser);
router.post('/login', login);
router.get('/me', getUser);
module.exports = router;
