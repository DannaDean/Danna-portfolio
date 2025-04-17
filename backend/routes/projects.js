const express = require("express");
const router = express.Router();
const createStorage = require('../utils/storage');
const multer = require('multer');
const { getProjects, createProject } = require('../controllers/projects')

// Show path where to store the images
const upload = multer({ storage: createStorage('projects') });

// @des Get all projects
router.get('/', getProjects);

// @des Get single project with id
router.get('/:id', (req, res ) => res.send('Get single project'));

// @des Create a project
router.post('/', 
    upload.fields([
        { name: 'projectDeskImg', maxCount: 1 },
        { name: 'projectMobileImg', maxCount: 1 }
      ]), 
    createProject
);



module.exports = router;