const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true 
    },
    coverLetterFile: { 
        type: String,
        required: true 
    },
}
, {timestamp: true,});



module.exports = mongoose.model('Application', applicationSchema);
