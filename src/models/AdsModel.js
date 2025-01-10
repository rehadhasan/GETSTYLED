const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    productID: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    thumbnail: {type: String, required: true},
    status: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const AdsModel = mongoose.model('ads', brandSchema);

module.exports = AdsModel;
