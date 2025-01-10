const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    brandName: {type: String, required: true, unique: true},
    brandImg: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const BrandModel = mongoose.model('brands', brandSchema);

module.exports = BrandModel;
