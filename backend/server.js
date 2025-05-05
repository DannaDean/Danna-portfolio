require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const {checkAuth} = require('./utils/index');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: 'https://www.danaciub.org/',
}))

// For parsing aplication/json
app.use(express.json());
// For parsing aplication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Path to images file
app.use("/assets", express.static('assets'));

app.use('/upload', require('./routes/upload'));
app.use('/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/facts', require('./routes/facts'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
  