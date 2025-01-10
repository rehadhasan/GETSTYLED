const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    status: {type: String, required: true}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const OTPModel = mongoose.model('otps', brandSchema);

module.exports = OTPModel;
