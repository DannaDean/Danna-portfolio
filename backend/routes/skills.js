const express = require("express");
const router = express.Router();
const { skillCreateValidator } = require('../validations')
const { getAll, create, remove, update, removeImage } = require('../controllers/skills')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// Get all skills
router.get('/', getAll);

// Add a skill
router.post('/', checkAuth, skillCreateValidator, handleValidationErrors, create);

// Update a skill
router.patch('/:id', checkAuth, skillCreateValidator, handleValidationErrors, update);

// Delete a skill
router.delete('/:id', checkAuth, remove);

// Delete a single image from a skill
router.delete("/:id/delete-image", checkAuth, removeImage);

module.exports = router;