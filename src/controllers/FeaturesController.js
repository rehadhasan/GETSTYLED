const FeaturesModel = require('../models/FeaturesModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.SaveFeatures = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await FeaturesModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateFeatures = async (req,res)=>{
    try{
        let featureID = new ObjectId(req.params.featureID);
        let reqBody = req.body;
        let data = await FeaturesModel.updateOne({_id:featureID},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.FeaturesDetails = async (req,res)=>{
    try{
        let featureID = new ObjectId(req.params.featureID);
        let data = await FeaturesModel.findOne({_id:featureID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.DeleteFeatures = async (req,res)=>{
    try{
        let featureID = new ObjectId(req.params.featureID);
        let data = await FeaturesModel.deleteOne({_id:featureID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.FeaturesList = async (req,res)=>{
    try{
        let data = await FeaturesModel.find()
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}