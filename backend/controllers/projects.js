const Project = require('../models/project');

const getAll = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Coundn't find the list of projects. Try again" })
    }
};

const getOne = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Coundn't find the project. Try again" })
    }
};

const create = async (req, res) => {
    try {
        const doc = new Project({
            title: req.body.title,
            link: req.body.link,
            categories: req.body.categories,
            deskImg: req.body.deskImg,
            mobileImg: req.body.mobileImg,
        })

        const project = await doc.save();

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Couldn't create a project" });
    }
};

const remove = async (req, res) => {
    try {
        const projectId = req.params.id;

        const doc = await Project.findOneAndDelete({ _id: projectId });

        if (!doc) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete the project. Try again" });
    }
};

const update = async (req, res) => {
    try {
        const projectId = req.params.id;

        await Project.updateOne(
            {
                _id: projectId,
            },
            {
                title: req.body.title,
                link: req.body.link,
                categories: req.body.categories,
                deskImg: req.body.deskImg,
                mobileImg: req.body.mobileImg,
            }
        );

        res.status(201).json({ succes: true })
    } catch (error) {
        res.status(500).json({ message: "Couldn't update the project." });
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update
}