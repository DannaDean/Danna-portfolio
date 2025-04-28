const express = require('express');
const router = express.Router();
const multer = require('multer');
const createStorage = require('../utils/storage');
const { checkAuth } = require('../utils/index');

// Dynamic upload
router.post('/:folder', checkAuth, (req, res, next) => {
    const folder = req.params.folder;

    const upload = multer({ storage: createStorage(folder) }).single('image');

    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({ message: 'Upload error', error: err.message });
        }
        res.json({
            url: `/assets/${folder}/${req.file.originalname}`,
        });
    });
});

module.exports = router;
