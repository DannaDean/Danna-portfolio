const express = require('express');
const router = express.Router();
const { create, getAll, remove } = require('../controllers/contact');

// Send email
router.post('/', create);

// Get all messages
router.get('/', getAll);

// Delete message
router.delete('/:id', remove);

module.exports = router;
