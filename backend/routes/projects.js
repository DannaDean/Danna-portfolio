const express = require("express");
const router = express.Router();
// const createStorage = require('../utils/storage');
// const multer = require('multer');
const { projectCreateValidator } = require('../validations')
const { getAll, getOne, create, remove, update } = require('../controllers/projects')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// Show path where to store the images
// const upload = multer({ storage: createStorage('projects') });

// @des Get all projects
router.get('/', getAll);

// @des Get single project with id
router.get('/:id', getOne);

// @des Create a project
router.post('/', checkAuth, projectCreateValidator, handleValidationErrors, create);

// @des Update a project
router.patch('/:id', checkAuth, projectCreateValidator, handleValidationErrors, update);

// @des Delete a project
router.delete('/:id', checkAuth, remove);

module.exports = router;