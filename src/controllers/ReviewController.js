const ReviewModel = require('../models/ReviewModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.SaveReview = async (req,res)=>{
    try{
        let reqBody = req.body;
        reqBody['userID'] = new ObjectId(req.headers.userID);
        let data = await ReviewModel.create(reqBody)
        return res.status(200).json({status:"success",data:data})
    }catch (e) {
        return res.status(200).json({status:"fail",data:e.toString()})
    }
}

exports.UpdateReview = async (req,res)=>{
    try{
        let reqBody = req.body;
        let userID = new ObjectId(req.headers.userID);
        let reviewID = new ObjectId(req.params.reviewID);
        let data = await ReviewModel.updateOne({userID:userID, _id:reviewID},reqBody)
        return res.status(200).json({status:"success",data:data})
    }catch (e) {
        return res.status(200).json({status:"fail",data:e.toString()})
    }
}

exports.ReadReview = async (req,res)=>{
    try{
        let userID = new ObjectId(req.headers.userID);
        let reviewID = new ObjectId(req.params.reviewID);
        let matchStage = {$match:{userID:userID, _id:reviewID}}
        let joinStage = {$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'product'}}
        let unwindStage = {$unwind:'$product'}
        let data = await ReviewModel.aggregate([
            matchStage,joinStage,unwindStage
        ])
        return res.status(200).json({status:"success",data:data[0]})
    }catch (e) {
        return res.status(200).json({status:"fail",data:e.toString()})
    }
}

exports.RemoveReview = async (req,res)=>{
    try{
        let userID = new ObjectId(req.headers.userID);
        let reviewID = new ObjectId(req.params.reviewID);
        let data = await ReviewModel.deleteOne({userID:userID, _id:reviewID})
        return res.status(200).json({status:"success",data:data})
    }catch (e) {
        return res.status(200).json({status:"fail",data:e.toString()})
    }
}

exports.ReviewList = async (req, res) => {
    try {
        let productID = new ObjectId(req.params.productID);
        let matchStage = { $match: { productID: productID } };

        // Lookup to join with the UserModel
        let lookupStage = {$lookup: {from: 'users', localField: 'userID', foreignField: '_id', as: 'userInfo'}};

        let unwindStage = { $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true } };

        // Stage to calculate the review statistics
        let CalculateReviewStage = {
            $group: {
                _id: '$productID',
                totalRating: { $sum: { $toDouble: '$rating' } }, // Sum of all ratings, converting to double
                averageRating: { $avg: { $toDouble: '$rating' } }, // Average of all ratings
                reviewCount: { $sum: 1 }, // Count the number of reviews
                reviews: { $push: '$$ROOT' } // Push all reviews into an array
            }
        };

        // Stage to handle cases where no reviews are found
        let handleNoReviewsStage = {
            $project: {
                totalRating: { $ifNull: ['$totalRating', 0] }, // If no reviews, set totalRating to 0
                averageRating: { $ifNull: ['$averageRating', 0] }, // If no reviews, set averageRating to 0
                reviewCount: { $ifNull: ['$reviewCount', 0] }, // If no reviews, set reviewCount to 0
                reviews: { $ifNull: ['$reviews', []] } // If no reviews, set reviews to an empty array
            }
        };

        // Aggregate reviews data with the above stages
        let data = await ReviewModel.aggregate([
            matchStage,
            lookupStage,
            unwindStage,
            CalculateReviewStage,
            handleNoReviewsStage // Add this to ensure the response has zero values if no reviews
        ]);

        // If no reviews, send the response with zero values
        if (data.length === 0) {
            return res.status(200).json({
                status: 'success',
                data: {
                    _id: productID,
                    totalRating: 0,
                    averageRating: 0,
                    reviewCount: 0,
                    reviews: []
                }
            });
        }

        return res.status(200).json({ status: 'success', data: data[0]});
    } catch (e) {
        return res.status(200).json({ status: 'fail', data: e.toString() });
    }
};








