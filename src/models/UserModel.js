const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String, required:false, default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqTalRtNSLyUU_nNW2Z8_qQO8hTz9bXUh_jg&s'}
}, {
    versionKey: false,
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const UserModel = mongoose.model('users', brandSchema);

module.exports = UserModel;
