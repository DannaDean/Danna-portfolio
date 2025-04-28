const mongoose = require('mongoose');
const factSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
},
{
    timestamps: true, 
},
)

module.exports = mongoose.model('Fact', factSchema)