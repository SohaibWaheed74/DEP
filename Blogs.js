const mongoose = require('mongoose');

// Define the schema for a blog post
const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: {
        type: Date,
        default: Date.now,
    },
});

// Export the Blog model
module.exports = mongoose.model('Blog', blogSchema);
