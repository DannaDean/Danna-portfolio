const express = require("express");
const router = express.Router();
const { projectCreateValidator } = require('../validations')
const { getAll, create, remove, update, removeImage } = require('../controllers/projects')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// @des Get all projects
router.get('/', getAll);

// @des Create a project
router.post('/', checkAuth, projectCreateValidator, handleValidationErrors, create);

// @des Update a project
router.patch('/:id', checkAuth, projectCreateValidator, handleValidationErrors, update);

// @des Delete a project
router.delete('/:id', checkAuth, remove);

// @des Delete a single image from a project
router.delete("/:id/delete-image", checkAuth, removeImage);

module.exports = router;