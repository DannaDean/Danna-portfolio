require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// For parsing aplication/json
app.use(express.json());
// For parsing aplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Path to images file
app.use("/static", express.static(__dirname + "/assets"))

app.use('/api/projects', require('./routes/projects'));
app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => {
    res.send('API is running...');
});

// app.post('/auth/login', (req, res) => {

// })

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })
    })