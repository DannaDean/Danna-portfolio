const express = require("express");
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projects')
const path = require('path');
const multer = require('multer');

// Show path where to store the images
const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});

// @route GET /api/projects
// @des Get all projects
router.get('/', getProjects);

// @route GET /api/projects/:id
// @des Get single project with id
router.get('/:id', (req, res ) => res.send('Get single project'));

// @route POST/api/projects
// @des Create a project
router.post('/', 
    upload.fields([
        { name: 'projectDeskImg', maxCount: 1 },
        { name: 'projectMobileImg', maxCount: 1 }
      ]), 
    createProject
);



module.exports = router;