const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    userID: {type: mongoose.Types.ObjectId, required: true},
    productID: {type: mongoose.Types.ObjectId, required: true},
    size: {type: String, required: true},
    color: {type: String, required: true},
    qty: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const CartModel = mongoose.model('carts', brandSchema);

module.exports = CartModel;
