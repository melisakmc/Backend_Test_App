const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({        //creating post schema for the database
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    listOfHashtags: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum : ['Draft','Scheduled','Published'],
        default: 'Draft'
    },
    authorName: {
        type: String,
        default: 'Brian Fox',
        immutable: true         //unchangeable
    }
})

module.exports = mongoose.model('Post', postSchema);