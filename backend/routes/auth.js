const express = require("express");
const router = express.Router();
const createStorage = require('../utils/storage');
const multer = require('multer');
const { register, login, me} = require('../controllers/auth')
const { registerValidator } = require('../validations/auth')

// Show path where to store the images
const upload = multer({ storage: createStorage('users') });

// Register
router.post('/register', upload.single('avatarUrl'), registerValidator, register);

// Login
router.post('/login', login);

// Get my info
router.post('/me', me);

// @route GET /api/projects/:id
// @des Get single project with id
// router.get('/:id', (req, res ) => res.send('Get single project'));

// @route POST/api/projects
// @des Create a project
// router.post('/', 
//     upload.fields([
//         { name: 'avatarUrl', maxCount: 1 }
//       ]), 
//     createProject
// );



module.exports = router;