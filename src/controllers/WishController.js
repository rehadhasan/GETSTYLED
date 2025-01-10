const WishModel = require('../models/WishModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.SaveWish = async (req, res) => {
    try{
        let userID = new ObjectId(req.headers.userID);
        let productID = new ObjectId(req.params.productID);
        let data = await WishModel.updateOne({userID:userID, productID:productID},{$set:{userID:userID, productID:productID}}, {upsert:true})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.UpdateWish = async (req, res) => {
    try{
        let userID = new ObjectId(req.headers.userID);
        let wishID = new ObjectId(req.params.wishID);
        let productID = new ObjectId(req.params.productID);
        let data = await WishModel.updateOne({_id:wishID, userID:userID}, {productID:productID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.WishDetails = async (req, res) => {
    try{
        let productID = new ObjectId(req.params.productID);
        let userID = new ObjectId(req.headers.userID);
        let matchStage = {$match:{productID:productID, userID:userID}}
        let joinWithProduct = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as:'product'}}
        let unwindProduct = {$unwind: '$product'}
        let data = await WishModel.aggregate([
            matchStage, joinWithProduct, unwindProduct
        ])
        return res.status(200).json({status:'success', data:data[0]})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.RemoveWish = async (req, res) => {
    try{
        let productID = new ObjectId(req.params.productID);
        let userID = new ObjectId(req.headers.userID);
        let data = await WishModel.deleteOne({productID:productID, userID:userID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.WishList = async (req, res) => {
    try{
        let userID = new ObjectId(req.headers.userID);
        let matchStage = {$match: {userID:userID}}
        let joinWithProduct = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as:'product'}}
        let unwindProduct = {$unwind: '$product'}

        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "productID", // Match Product _id with productID in Review
                foreignField: "productID", // Review productID field
                as: "reviews" // Alias for the joined data
            }
        }
        let AddFieldStage = {
            $addFields: {
                // Total rating: sum of all ratings
                totalRating: {
                    $sum: {
                        $map: {
                            input: "$reviews",
                            as: "review",
                            in: { $toDouble: "$$review.rating" } // Convert rating string to number
                        }
                    }
                },
                // Count of reviews
                reviewCount: { $size: "$reviews" }, // Count the number of reviews
                // Average rating: calculate average of all reviews
                averageRating: {
                    $cond: {
                        if: { $gt: [{ $size: "$reviews" }, 0] },
                        then: {
                            $avg: {
                                $map: {
                                    input: "$reviews",
                                    as: "review",
                                    in: { $toDouble: "$$review.rating" }
                                }
                            }
                        },
                        else: 0
                    }
                }
            }
        }

        let data = await WishModel.aggregate([
            matchStage, joinWithProduct, unwindProduct, joinWithReviewStage, AddFieldStage
        ])
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}
