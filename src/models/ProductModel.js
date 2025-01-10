const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {type: String, required: true},
    categoryID: {type: mongoose.Types.ObjectId, required: true},
    brandID: {type: mongoose.Types.ObjectId, required: true},
    image: {type: String, required: true},
    discount: {type: Boolean, required: true},
    price: {type: String, required: true},
    discountPrice: {type: String, required: true},
    remark: {type: String, required: true},
    stock: {type: String, required: true},
    rating: {type: String, required: true},
    size: {type: String, required: false},
    color: {type: String, required: false}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const ProductModel = mongoose.model('products', brandSchema);

module.exports = ProductModel;
