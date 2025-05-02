const express = require("express");
const router = express.Router();
const { register, login, getUser, updateUser, removeImage} = require('../controllers/auth')
const { registerValidator, loginValidator } = require('../validations')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// Login
router.post('/login', loginValidator, handleValidationErrors, login);

// Register
router.post('/register', registerValidator, handleValidationErrors, register);

// Get user info
router.get('/user', checkAuth, getUser);

// Update user info
router.patch('/update', checkAuth, handleValidationErrors, updateUser);

// Delete a single image from the auth user
router.delete("/delete-image", checkAuth, removeImage);

module.exports = router;