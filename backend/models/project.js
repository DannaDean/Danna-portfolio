const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    deskImg: {
        type: String,
    },
    mobileImg: {
        type: String,
    }, 
    categories:  {
        type: [String],
    },
},
{
    timestamps: true, 
},
)

module.exports = mongoose.model('Project', projectSchema)