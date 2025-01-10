const BlogModel = require('../models/BlogModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.SaveBlog = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await BlogModel.create(reqBody)
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.UpdateBlog = async (req, res) => {
    try{
        let blogID = new ObjectId(req.params.blogID)
        let reqBody = req.body;
        let data = await BlogModel.updateOne({_id:blogID},reqBody)
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.BlogDetails = async (req, res) => {
    try{
        let blogID = new ObjectId(req.params.blogID)
        let data = await BlogModel.findOne({_id:blogID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.RemoveBlog = async (req, res) => {
    try{
        let blogID = new ObjectId(req.params.blogID)
        let data = await BlogModel.deleteOne({_id:blogID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.BlogList = async (req, res) => {
    try{
        let data = await BlogModel.find()
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.ActiveBlogList = async (req, res) => {
    try{
        let data = await BlogModel.find({status:'active'})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}

exports.BlogListByCategory = async (req, res) => {
    try{
        let categoryID = new ObjectId(req.params.categoryID)
        let data = await BlogModel.find({categoryID:categoryID})
        return res.status(200).json({status:'success', data:data})
    }catch (e) {
        return res.status(200).json({status:'fail', data:e.toString()})
    }
}