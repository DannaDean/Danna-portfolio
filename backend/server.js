require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require('multer');
const {checkAuth} = require('./utils/index');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

// For parsing aplication/json
app.use(express.json());
// For parsing aplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Path to images file
app.use("/assets", express.static('assets'))
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'assets');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage })
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/assets/${req.file.originalname}`,
    })
});

app.use('/api/projects', require('./routes/projects'));
app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => {
    res.send('API is running...');
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })
    })