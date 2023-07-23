const express = require('express');
const router = express.Router();
const Validate = require('../middleware/validator');
const { login, logout } = require('../controllers/authController');


router.post('/login', Validate('login'), login);
router.get('/logout', logout);


module.exports = router