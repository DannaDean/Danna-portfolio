// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const createStorage = (folderName) => {
//     const fullPath = path.join(__dirname, '..', 'assets', folderName);

//     // Ensure folder exists
//     if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath, { recursive: true });
//     }

//     return multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, fullPath);
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + path.extname(file.originalname);
//             cb(null, file.fieldname + '-' + uniqueSuffix);
//         }
//     });
// };

// module.exports = createStorage;
