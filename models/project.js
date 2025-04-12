const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    projectDeskImg: {
        type: String,
        required: true
    },
    projectMobileImg: {
        type: String,
        required: true
    }, 
    categories: {
        type: Object
    }
})

module.exports = mongoose.model('Project', projectSchema)