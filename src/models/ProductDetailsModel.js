const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    productID: {type: mongoose.Types.ObjectId, required: true},
    description: {type: String, required: true},
    img1: {type: String, required: true},
    img2: {type: String, required: true},
    img3: {type: String, required: true},
    img4: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const ProductDetailsModel = mongoose.model('productDetails', brandSchema);

module.exports = ProductDetailsModel;
