const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    productID: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    subTitle: {type: String, required: true},
    buttonText: {type: String, required: true},
    image: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const ProductSliderModel = mongoose.model('productSliders', brandSchema);

module.exports = ProductSliderModel;
