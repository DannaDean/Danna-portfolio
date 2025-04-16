const Project = require('../models/project');

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({message: "Coundn't find the list of projects. Try again"})
    }
};

const createProject = async (req, res) => {
    const errors = {};

    if (!req.body.name) {
        errors.name = { message: "Please add a name" };
    }

    const deskFile = req.files?.projectDeskImg?.[0];
    const mobileFile = req.files?.projectMobileImg?.[0];

    if (!deskFile) {
        errors.projectDeskImg = { message: "Please add an image for desktop" };
    }

    if (!mobileFile) {
        errors.projectMobileImg = { message: "Please add an image for mobile" };
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const { name, link, categories } = req.body;

        const project = await Project.create({
            name,
            link,
            projectDeskImg: `http://localhost:${process.env.PORT}/static/${deskFile.filename}`,
            projectMobileImg: `http://localhost:${process.env.PORT}/static/${mobileFile.filename}`,
            categories: categories ? JSON.parse(categories) : []
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Couldn't create a project" });
    }
};

module.exports = {
    getProjects,
    createProject
}