const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    userID: {type: mongoose.Types.ObjectId, required: true},
    productID: {type: mongoose.Types.ObjectId, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const WishModel = mongoose.model('wishes', brandSchema);

module.exports = WishModel;
