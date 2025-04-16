const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    projectDeskImg: {
        type: String,
        required: true
    },
    projectMobileImg: {
        type: String,
        required: true
    }, 
    categories:  {
        type: [String]
    }
})

module.exports = mongoose.model('Project', projectSchema)