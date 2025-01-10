const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const ContactModel = mongoose.model('contacts', brandSchema);

module.exports = ContactModel;
