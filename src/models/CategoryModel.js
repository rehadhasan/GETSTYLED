const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {type: String, required: true, unique: true},
    categoryImg: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const CategoryModel = mongoose.model('Categories', categorySchema);

module.exports = CategoryModel;
