const CategoryModel = require('../models/CategoryModel')
const BrandModel = require('../models/BrandModel')
const ProductModel = require('../models/ProductModel')
const ProductDetailsModel = require('../models/ProductDetailsModel')
const ProductSliderModel = require('../models/ProductSliderModel')
const AdsModel = require('../models/AdsModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.CreateCategory = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await CategoryModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateCategory = async (req,res)=>{
    try{
        let categoryId = req.params.categoryId;
        let reqBody = req.body;
        let data = await CategoryModel.updateOne({_id:categoryId},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ReadCategory = async (req,res)=>{
    try{
        let categoryId = req.params.categoryId;
        let data = await CategoryModel.findOne({_id:categoryId})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.RemoveCategory = async (req,res)=>{
    try{
        let categoryId = req.params.categoryId;
        let data = await CategoryModel.deleteOne({_id:categoryId})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.CategoryList = async (req,res)=>{
    try{
        let data = await CategoryModel.find()
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.CreateBrand = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await BrandModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateBrand = async (req,res)=>{
    try{
        let brandId = req.params.brandId;
        let reqBody = req.body;
        let data = await BrandModel.updateOne({_id:brandId},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ReadBrand = async (req,res)=>{
    try{
        let brandId = req.params.brandId;
        let data = await BrandModel.findOne({_id:brandId})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.RemoveBrand = async (req,res)=>{
    try{
        let brandId = req.params.brandId;
        let data = await BrandModel.deleteOne({_id:brandId})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.BrandList = async (req,res)=>{
    try{
        let data = await BrandModel.find()
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.SaveProduct = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await ProductModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.SaveProductDetails = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await ProductDetailsModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateProduct = async (req,res)=>{
    try{
        let productID = req.params.productID;
        let reqBody = req.body;
        let data = await ProductModel.updateOne({_id:productID},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateProductDetails = async (req,res)=>{
    try{
        let productID = new ObjectId(req.params.productID);
        let reqBody = req.body;
        let data = await ProductDetailsModel.updateOne({productID:productID},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductDetails = async (req,res)=>{
    try{
        let productID = new ObjectId(req.params.productID);
        let matchStage = {$match:{_id:productID}}
        let joinStage = {$lookup:{from:'productdetails',localField:'_id',foreignField:'productID',as:'details'}}
        let unwindStage = {$unwind:"$details"}
        let joinWithCategoryStage = {$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'category'}}
        let unwindCategoryStage = {$unwind:"$category"}
        let joinWithBrandStage = {$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'brand'}}
        let unwindBrandStage = {$unwind:"$brand"}
        let joinWithReviewStage = {
                $lookup: {
                    from: "reviews", // Review collection
                    localField: "_id", // Match Product _id with productID in Review
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
        let data = await ProductModel.aggregate([
            matchStage,
            joinStage,
            unwindStage,
            joinWithCategoryStage,
            unwindCategoryStage,
            joinWithBrandStage,
            unwindBrandStage,
            joinWithReviewStage,
            AddFieldStage
        ])
        return res.status(200).json({status:"success", data:data[0]})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.DeleteProduct = async (req,res)=>{
    try{
        let productID = req.params.productID;
        let data = await ProductModel.deleteOne({_id:productID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.DeleteProductDetails = async (req,res)=>{
    try{
        let productID = req.params.productID;
        let data = await ProductDetailsModel.deleteOne({productID:productID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductList = async (req,res)=>{
    try{
        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "_id", // Match Product _id with productID in Review
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
        let data = await ProductModel.aggregate([
            joinWithReviewStage, AddFieldStage
        ]);
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductListByCategory = async (req,res)=>{
    try{
        let categoryID = new ObjectId(req.params.categoryID);
        let matchStage = {$match:{categoryID:categoryID}}
        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "_id", // Match Product _id with productID in Review
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
        let data = await ProductModel.aggregate([
            matchStage, joinWithReviewStage, AddFieldStage
        ])
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductListByBrand = async (req,res)=>{
    try{
        let brandID = new ObjectId(req.params.brandID);
        let matchStage = {$match:{brandID:brandID}}
        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "_id", // Match Product _id with productID in Review
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
        let data = await ProductModel.aggregate([
            matchStage, joinWithReviewStage, AddFieldStage
        ])
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductListByRemark = async (req,res)=>{
    try{
        let remark = req.params.remark;
        let matchStage = {$match:{remark:remark}}
        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "_id", // Match Product _id with productID in Review
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
        let data = await ProductModel.aggregate([
            matchStage, joinWithReviewStage, AddFieldStage
        ])
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductListByKeyword = async (req,res)=>{
    try{
        let RegexStage = {"$regex":req.params.keyword, "$options":"i"}
        let SearchStage = [{name:RegexStage}]
        let QueryStage = {$or:SearchStage}

        let MatchStage = {$match: QueryStage}

        let JoinWithBrandStage = {$lookup:{from:"brands", localField:"brandID", foreignField:"_id", as:"brand"}}
        let JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as:"category"}}

        let UnwindBrand = {$unwind:"$brand"}
        let UnwindCategory = {$unwind:"$category"}

        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "_id", // Match Product _id with productID in Review
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

        let data =await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            UnwindBrand,
            JoinWithCategoryStage,
            UnwindCategory,
            joinWithReviewStage,
            AddFieldStage
        ])
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductListByFilter = async (req,res)=>{
    try {
        let searchCondition = {}; // Initialize searchCondition as an empty object
        let matchCondition = {};

        // Search by keyword
        if (req.body['keyword']) {
            let RegexStage = { "$regex": req.body['keyword'], "$options": "i" };
            let SearchStage = [
                { name: RegexStage }
            ];
            searchCondition = { $or: SearchStage };
        }

        // Filter by brandID
        if (req.body['brandID']) {
            matchCondition.brandID = new ObjectId(req.body['brandID']);
        }

        // Filter by categoryID
        if (req.body['categoryID']) {
            matchCondition.categoryID = new ObjectId(req.body['categoryID']);
        }

        // Filter by rating
        if (req.body['rating']) {
            matchCondition.rating = { $gte: req.body['rating'] };
        }

        // Convert price to integer and filter by price range
        let addFieldStage = {
            $addFields: {
                NumericPrice: {
                    $cond: {
                        if: { $eq: ["$discount", true] },
                        then: { $toInt: "$discountPrice" },
                        else: { $toInt: "$price" }
                    }
                }
            }
        };

        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let priceCondition = {};

        if (!isNaN(priceMin)) {
            priceCondition['NumericPrice'] = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            priceCondition['NumericPrice'] = {
                ...(priceCondition['NumericPrice'] || {}),
                $lte: priceMax
            };
        }

        // Aggregation pipeline
        let pipeline = [];

        if (Object.keys(searchCondition).length > 0) {
            pipeline.push({ $match: searchCondition });
        }
        if (Object.keys(matchCondition).length > 0) {
            pipeline.push({ $match: matchCondition });
        }

        pipeline.push(addFieldStage);

        if (Object.keys(priceCondition).length > 0) {
            pipeline.push({ $match: priceCondition });
        }

        // Join with brand collection
        let JoinWithBrandStage = {
            $lookup: {from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand'}};
        pipeline.push(JoinWithBrandStage);

        // Unwind the joined category field
        let UnwindBrand = { $unwind: "$brand" };
        pipeline.push(UnwindBrand);

        // Join with category collection
        let JoinWithCategoryStage = {
            $lookup: {from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'}};
        pipeline.push(JoinWithCategoryStage);

        // Unwind the joined category field
        let UnwindCategory = { $unwind: "$category" };
        pipeline.push(UnwindCategory);

        let joinWithReviewStage = {
            $lookup: {
                from: "reviews", // Review collection
                localField: "_id", // Match Product _id with productID in Review
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

        pipeline.push(joinWithReviewStage)
        pipeline.push(AddFieldStage)

        // Execute aggregation
        let data = await ProductModel.aggregate(pipeline);

        // Success response
        return res.status(200).json({ status: "success", data: data });
    } catch (e) {
        // Error response with a 500 status code
        return res.status(200).json({ status: 'fail', data: e.toString() });
    }
}

exports.SaveProductSlider = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await ProductSliderModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateProductSlider = async (req,res)=>{
    try{
        let sliderID = new ObjectId(req.params.sliderID);
        let reqBody = req.body;
        let data = await ProductSliderModel.updateOne({_id:sliderID},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductSliderDetails = async (req,res)=>{
    try{
        let sliderID = new ObjectId(req.params.sliderID);
        let matchStage = {$match:{_id:sliderID}}
        let joinStage = {$lookup:{from:'products', localField:'productID', foreignField:'_id', as:'product'}};
        let unwindStage = {$unwind:'$product'}
        let data = await ProductSliderModel.aggregate([
            matchStage, joinStage, unwindStage
        ])
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.RemoveProductSlider = async (req,res)=>{
    try{
        let sliderID = new ObjectId(req.params.sliderID);
        let data = await ProductSliderModel.deleteOne({_id:sliderID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ProductSliderList = async (req,res)=>{
    try{
        let data = await ProductSliderModel.find()
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.SaveAds = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await AdsModel.create(reqBody)
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.UpdateAds = async (req,res)=>{
    try{
        let adsID = new ObjectId(req.params.adsID);
        let reqBody = req.body;
        let data = await AdsModel.updateOne({_id:adsID},reqBody)
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.AdsDetails = async (req,res)=>{
    try{
        let adsID = new ObjectId(req.params.adsID);
        let matchStage = {$match:{_id:adsID}}
        let joinStage = {$lookup:{from:'products', localField:'productID', foreignField:'_id', as:'product'}};
        let unwindStage = {$unwind:'$product'}
        let data = await AdsModel.aggregate([
            matchStage, joinStage, unwindStage
        ])
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.RemoveAds = async (req,res)=>{
    try{
        let adsID = new ObjectId(req.params.adsID);
        let data = await AdsModel.deleteOne({_id:adsID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.AdsList = async (req,res)=>{
    try{
        let data = await AdsModel.find()
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.ActiveAdsList = async (req,res)=>{
    try{
        let data = await AdsModel.find({status:'active'})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}





