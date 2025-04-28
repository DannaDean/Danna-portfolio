const express = require("express");
const router = express.Router();
const { skillCreateValidator } = require('../validations')
const { getAll, create, remove, update } = require('../controllers/skills')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// @des Get all skills
router.get('/', getAll);

// @des Add a skill
router.post('/', checkAuth, skillCreateValidator, handleValidationErrors, create);

// @des Update a skill
router.patch('/:id', checkAuth, skillCreateValidator, handleValidationErrors, update);

// @des Delete a skill
router.delete('/:id', checkAuth, remove);

module.exports = router;