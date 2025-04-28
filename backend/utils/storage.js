const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Dynamic storage generator
const createStorage = (folderName = '') => {
    const fullPath = path.join('assets', folderName);

    // Check if the folder exists, if not create it
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }

    return multer.diskStorage({
        destination: (_, __, cb) => {
            cb(null, fullPath);
        },
        filename: (_, file, cb) => {
            cb(null, file.originalname);
        },
    });
};

module.exports = createStorage;
