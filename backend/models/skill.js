const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }, 
},
{
    timestamps: true, 
},
)

module.exports = mongoose.model('Skill', skillSchema)