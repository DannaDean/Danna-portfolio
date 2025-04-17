const { body } = require('express-validator')

const registerValidator = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
    body('fullName', 'Full name must be at least 3 characters').isLength({min: 3}),
    body('avatarUrl', 'Avatar must be a valid URL').optional().isURL(),
]

module.exports = {
    registerValidator,
};