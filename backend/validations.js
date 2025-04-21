const { body } = require('express-validator')

const loginValidator = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
]

const registerValidator = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
    body('fullName', 'Full name must be at least 3 characters').isLength({min: 3}),
    body('avatarUrl', 'Avatar must be a valid URL').optional().isURL(),
]

const projectCreateValidator = [
    body('title', 'Title must be at least 5 characters long').isLength({min: 5}).isString(),
    body('link', 'Link must be a valid URL').optional().isURL(),
    body('deskImg', 'Project desktop image').optional().isString(),
    body('mobileImg', 'Project mobile image').optional().isString(),
    body(' categories', 'Categories must be an array of values').optional().isArray(),
]

module.exports = {
    loginValidator,
    registerValidator,
    projectCreateValidator
};