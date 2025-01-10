const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    categoryID: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
    author: {type: String, required: true},
    tags: {type: String, required: true},
    status: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const BlogModel = mongoose.model('blogs', brandSchema);

module.exports = BlogModel;
