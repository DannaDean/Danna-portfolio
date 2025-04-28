const express = require('express');
const router = express.Router();
const { factCreateValidator } = require('../validations')
const { getAll, create, remove, update } = require('../controllers/facts')
const {checkAuth, handleValidationErrors} = require('../utils/index');

// @des Get all facts
router.get('/', getAll);

// @des Create a fact
router.post('/', checkAuth, factCreateValidator, handleValidationErrors, create);

// @des Update a fact
router.patch('/:id', checkAuth, factCreateValidator, handleValidationErrors, update);

// @des Delete a fact
router.delete('/:id', checkAuth, remove);

module.exports = router;
