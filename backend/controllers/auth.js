const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = {
    register,
    login,
    getUser
}