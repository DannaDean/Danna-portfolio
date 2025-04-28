const Skill = require('../models/skill');
const fs = require('fs');
const path = require('path');

const getAll = async (req, res) => {
    try {
        const skills = await Skill.find();

        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: "Coundn't find the list of skills. Try again" })
    }
};

const create = async (req, res) => {
    try {
        const doc = new Skill({
            title: req.body.title,
            image: req.body.image,
        })

        const skill = await doc.save();

        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: "Couldn't create a skill" });
    }
};

const remove = async (req, res) => {
    try {
        const skillId = req.params.id;

        const doc = await Skill.findOneAndDelete({ _id: skillId });

        if (!doc) {
            return res.status(404).json({ message: "Skill not found" });
        }

        const deleteImage = (imagePath) => {
            if (imagePath) {
                const filename = path.basename(imagePath);
        
                const fullPath = path.join(__dirname, '..', 'assets', 'skills', filename);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${fullPath}`, err.message);
                    } else {
                        console.log(`Deleted file: ${fullPath}`);
                    }
                });
            }
        };

        deleteImage(doc.image);

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete the skill. Try again" });
    }
};

const update = async (req, res) => {
    try {
        const skillId = req.params.id;

        const existingSkill = await Skill.findById(skillId);
        if (!existingSkill) {
            return res.status(404).json({ message: "Skill not found" })
        }

        const deleteImage = (imagePath) => {
            if (imagePath) {
                const filename = path.basename(imagePath);
                const fullPath = path.join(__dirname, '..', 'assets', 'skills', filename);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${fullPath}`);
                    } else {
                        console.log(`Deleted file: ${fullPath}`);
                    }
                })
            }
        };

        if (req.body.image && req.body.image !== existingSkill.image) {
            deleteImage(existingSkill.image);
        }

        await Skill.updateOne(
            {
                _id: skillId,
            },
            {
                title: req.body.title,
                image: req.body.image,
            }
        );

        res.status(201).json({ succes: true })
    } catch (error) {
        res.status(500).json({ message: "Couldn't update the skill." });
    }
}

module.exports = {
    getAll,
    create,
    remove,
    update
}