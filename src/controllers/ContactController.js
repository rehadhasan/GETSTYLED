const mongoose = require('mongoose')
const ContactModel = require('../models/ContactModel')
const ObjectId = mongoose.Types.ObjectId;

exports.createContact = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await ContactModel.create(reqBody);
        return res.status(200).json({status: 'success', data: data});
    }catch (e) {
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
}

exports.updateContact = async (req, res) => {
    try{
        let contactID = new ObjectId(req.params.contactID);
        let reqBody = req.body;
        let data = await ContactModel.updateOne({_id:contactID}, reqBody);
        return res.status(200).json({status: 'success', data: data});
    }catch (e) {
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
}

exports.readContact = async (req, res) => {
    try{
        let contactID = new ObjectId(req.params.contactID);
        let data = await ContactModel.findOne({_id:contactID});
        return res.status(200).json({status: 'success', data: data});
    }catch (e) {
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
}

exports.removeContact = async (req, res) => {
    try{
        let contactID = new ObjectId(req.params.contactID);
        let data = await ContactModel.deleteOne({_id:contactID});
        return res.status(200).json({status: 'success', data: data});
    }catch (e) {
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
}

exports.ContactList = async (req, res) => {
    try{
        let data = await ContactModel.find();
        return res.status(200).json({status: 'success', data: data});
    }catch (e) {
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
}