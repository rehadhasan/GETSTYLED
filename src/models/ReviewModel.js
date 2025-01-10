const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
    {
        userID:{type:mongoose.Types.ObjectId, required:true},
        productID:{type:mongoose.Types.ObjectId, required:true},
        comment:{type:String, required:true},
        rating:{type:String, required:true}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const ReviewModel = mongoose.model('reviews', DataSchema)

module.exports = ReviewModel;