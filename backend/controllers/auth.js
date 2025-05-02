const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User with this email doesn't exist" })
        }

        const isValidpass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidpass) {
            return res.status(400).json({ message: "Wrong email or password" });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData } = user._doc;

        res.status(201).json({
            ...userData,
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Login failed" })
    }
};

const register = async (req, res) => {
    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const doc = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData } = user._doc;

        res.status(201).json({
            ...userData,
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" })
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if(!user) {
            return res.status(404).json({ messaje: 'User not found' })
        }

        const { passwordHash, ...userData } = user._doc;

        res.status(201).json({userData});
    } catch (error) {
        res.status(500).json({ messaje: 'No access' })
    }
};

const updateUser = async (req, res) => {
    try {
      const userId = req.userId;
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Delete old avatar if new one is different
      const deleteImage = (imagePath) => {
        if (imagePath) {
          const filename = path.basename(imagePath);
          const fullPath = path.join(__dirname, "..", "assets", "avatars", filename);
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error(`Error deleting avatar: ${fullPath}`, err);
            } else {
              console.log(`Deleted avatar: ${fullPath}`);
            }
          });
        }
      };
  
      if (req.body.avatarUrl && req.body.avatarUrl !== existingUser.avatarUrl) {
        deleteImage(existingUser.avatarUrl);
      }
  
      const updates = {
        fullName: req.body.fullName,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
      };
  
      // If password is provided, hash it
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updates.passwordHash = await bcrypt.hash(req.body.password, salt);
      }
  
      await User.updateOne({ _id: userId }, updates);
  
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("User update failed:", err);
      res.status(500).json({ message: "Couldn't update the user." });
    }
};

const removeImage = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Delete image file if exists
      if (user.avatarUrl) {
        const imagePath = path.join(__dirname, '..', 'assets', 'avatars', path.basename(user.avatarUrl));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
  
      user.avatarUrl = null;
      await user.save();
  
      res.status(200).json({ message: "Image deleted", user: user._id }); // return skillId here
    } catch (error) {
      res.status(500).json({ message: "Failed to delete image" });
    }
};

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    removeImage
}