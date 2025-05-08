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
    body('link')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Link must be a valid URL'),
    body('deskImg', 'Project desktop image').optional().isString(),
    body('mobileImg', 'Project mobile image').optional().isString(),
    body('categories', 'Categories must be an array of values').optional().isArray(),
]

const skillCreateValidator = [
    body('title').optional({ checkFalsy: true }).isString(),
    body('image', 'Add an image').optional().isString(),
]

const factCreateValidator = [
    body('title', 'Title must be at least 5 characters long').isLength({min: 5}).isString(),
    body('text').optional({ checkFalsy: true }).isString().isLength({ min: 10, max: 1000 }).withMessage('Text must be between 10 and 500 characters')
]

module.exports = {
    loginValidator,
    registerValidator,
    projectCreateValidator,
    skillCreateValidator,
    factCreateValidator
};