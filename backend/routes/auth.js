const express = require("express");
const router = express.Router();
const { register, login, getUser} = require('../controllers/auth')
const { registerValidator, loginValidator } = require('../validations')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// Show path where to store the images

// Login
router.post('/login', loginValidator, handleValidationErrors, login);

// Register
router.post('/register', registerValidator, handleValidationErrors, register);

// Get user info
router.get('/user', checkAuth, getUser);

module.exports = router;