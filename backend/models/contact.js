const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    text: { 
        type: String,
     },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);