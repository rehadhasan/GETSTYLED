const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    icon: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const FeaturesModel = mongoose.model('features', brandSchema);

module.exports = FeaturesModel;
