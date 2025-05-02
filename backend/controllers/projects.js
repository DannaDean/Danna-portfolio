const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

const getAll = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Coundn't find the list of projects. Try again" })
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

        const deleteImage = (imagePath) => {
            if (imagePath) {
                const filename = path.basename(imagePath);
        
                const fullPath = path.join(__dirname, '..', 'assets', 'projects', filename);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${fullPath}`, err.message);
                    } else {
                        console.log(`Deleted file: ${fullPath}`);
                    }
                });
            }
        };

        deleteImage(doc.deskImg);
        deleteImage(doc.mobileImg);

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete the project. Try again" });
    }
};

const update = async (req, res) => {
    try {
        const projectId = req.params.id;

        const existingProject = await Project.findById(projectId);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" })
        }

        const deleteImage = (imagePath) => {
            if (imagePath) {
                const filename = path.basename(imagePath);
                const fullPath = path.join(__dirname, '..', 'assets', 'projects', filename);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${fullPath}`);
                    } else {
                        console.log(`Deleted file: ${fullPath}`);
                    }
                })
            }
        };

        if (req.body.deskImg && req.body.deskImg !== existingProject.deskImg) {
            deleteImage(existingProject.deskImg);
        }

        if (req.body.mobileImg && req.body.mobileImg !== existingProject.mobileImg) {
            deleteImage(existingProject.mobileImg);
        }

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

const removeImage = async (req, res) => {
    const { id } = req.params;
    const { imageType } = req.body; // "desktop" or "mobile"
  
    try {
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      // Determine which image to delete based on imageType
      let imagePath;
      if (imageType === "desktop") {
        imagePath = project.deskImg;
        project.deskImg = "";
      } else if (imageType === "mobile") {
        imagePath = project.mobileImg;
        project.mobileImg = "";
      }
  
      // Delete the image from the file system
      if (imagePath) {
        const filename = path.basename(imagePath);
        const fullPath = path.join(__dirname, "..", "assets", "projects", filename);
  
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${fullPath}`, err.message);
          } else {
            console.log(`Deleted file: ${fullPath}`);
          }
        });
      }
  
      // Save the updated project
      await project.save();
  
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting image" });
    }
};
  

module.exports = {
    getAll,
    create,
    remove,
    update,
    removeImage,
}