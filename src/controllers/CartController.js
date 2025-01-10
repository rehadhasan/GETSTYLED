const CartModel = require('../models/CartModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.SaveCart = async (req, res) => {
    try{
        let userID = new ObjectId(req.headers.userID);
        let reqBody = req.body;
        reqBody['userID'] = userID;
        let data = await CartModel.create(reqBody)
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.UpdateCart = async (req, res) => {
    try{
        let cartID = new ObjectId(req.params.cartID);
        let userID = new ObjectId(req.headers.userID);
        let reqBody = req.body;
        let data = await CartModel.updateOne({_id:cartID, userID:userID},reqBody)
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.CartDetails = async (req, res) => {
    try{
        let cartID = new ObjectId(req.params.cartID);
        let userID = new ObjectId(req.headers.userID);
        let matchStage = {$match:{_id:cartID, userID:userID}}
        let joinWithProduct = {$lookup:{from:'products', localField:'productID', foreignField:'_id', as:'product'}};
        let unwindProduct = {$unwind:'$product'}
        let data = await CartModel.aggregate([
            matchStage, joinWithProduct, unwindProduct
        ])
        return res.status(200).json({status:'success', data:data[0]})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.RemoveCart = async (req, res) => {
    try{
        let cartID = new ObjectId(req.params.cartID);
        let userID = new ObjectId(req.headers.userID);
        let data = await CartModel.deleteOne({_id:cartID, userID:userID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.CartList = async (req, res) => {
    try{
        let userID = new ObjectId(req.headers.userID);
        let matchStage = {$match: {userID:userID}}
        let joinWithProduct = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as:'product'}}
        let unwindProduct = {$unwind: '$product'}
        let data = await CartModel.aggregate([
            matchStage, joinWithProduct, unwindProduct
        ])
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}
