const UserModel = require('../models/UserModel')
const OTPModel = require('../models/OTPModel')
const ProfileModel = require('../models/ProfileModel')
const {EncodeToken} = require("../utility/TokenHelper");
const SendEmailHelper = require("../utility/SendEmailHelper");

exports.SaveUser = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await UserModel.create(reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.LoginUser = async (req, res) => {
    try {
        let reqBody = req.body;
        let email = reqBody['email'];

        // Check if user exists
        let result = await UserModel.find(reqBody).countDocuments();
        if (result === 1) {
            // Manage Token
            let userID = await UserModel.findOne(reqBody).select('_id');
            let token = await EncodeToken(email, userID['_id']);

            //Config cookie
            let CookieOptions = {expires:new Date(Date.now()+24*6060*1000), httpOnly:false, credentials:true}
            res.cookie('token', token, CookieOptions)

            // Return success response
            return res.status(200).json({ status: "success", data: token });
        }

        // If no user is found
        return res.status(404).json({ status: "fail", data: "No User Found!" });
    } catch (e) {
        // Handle error response
        return res.status(500).json({ status: "fail", data: e.toString() });
    }
};


exports.LogoutUser = async (req,res)=>{
    try{
        let CookieOptions = {expires:new Date(Date.now()-24*6060*1000), httpOnly:false}
        res.cookie("token", "", CookieOptions)
        return res.status(200).json({status:"success", data:"Logout Successful."})
    }catch (e) {
        return res.status(200).json({status:'fail',data:e.toString()})
    }
}

exports.ReadUser = async (req,res)=>{
    try{
        let userID = req.headers.userID;
        let data = await UserModel.findOne({_id:userID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.UpdateUser = async (req,res)=>{
    try{
        let userID = req.headers.userID;
        let reqBody = req.body;
        let data = await UserModel.updateOne({_id:userID},reqBody)
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.RemoveUser = async (req,res)=>{
    try{
        let userID = req.headers.userID;
        let data = await UserModel.deleteOne({_id:userID})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.SendOTP = async (req,res)=>{
    try{
        let email = req.params.email;
        let result = await UserModel.find({email:email}).countDocuments()

        if(result === 1){
            let code = Math.floor(100000+Math.random()*900000)
            await OTPModel.updateOne({email:email},{$set:{email:email,otp:code,status:'0'}},{upsert:true})

            let EmailSubject = 'Ecommerce Says Verify Your Email!';
            let EmailText = 'Your verification code is = '+' '+code;
            await SendEmailHelper(email,EmailText,EmailSubject)

            return res.status(200).json({status:"success", data:"OTP Send Successfully."})
        }else{
            return res.status(200).json({status:"fail", data:"No User Found!"})
        }
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.VerifyOTP = async (req,res)=>{
    try{
        let email = req.params.email;
        let otp = req.params.otp;
        let result = await OTPModel.find({email:email,otp:otp,status:'0'}).countDocuments()

        if(result === 1){
            await OTPModel.updateOne({email:email,otp:otp}, {email:email,otp:otp,status:'1'}, {upsert:true})
            return res.status(200).json({status:"success", data:"OTP Verification Successfully."})
        }else{
            return res.status(200).json({status:"fail", data:"Invalid OTP!"})
        }
    }catch (e) {

    }
}

exports.ForgetPass = async (req,res)=>{
    try{
        let email = req.params.email;
        let otp = req.params.otp;
        let password = req.params.password;
        let result = await OTPModel.find({email:email,otp:otp,status:'1'}).countDocuments()

        if(result === 1){
            await UserModel.updateOne({email:email},{password:password})
            await OTPModel.updateOne({email:email,otp:otp,status:'1'},{email:email,otp:'0',status:'0'}, {upsert:true})
            return res.status(200).json({status:"success", data:"Password Forgotten Successfully."})
        }else{
            return res.status(200).json({status:"fail", data:"Something Went Wrong!"})
        }
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.SaveProfile = async (req,res)=>{
    try{
        let reqBody = req.body;
        let userID = req.headers.userID;
        let email = req.headers.email;
        reqBody['userID'] = userID;
        reqBody['cus_email'] = email;
        let data = await ProfileModel.updateOne({userID:userID, cus_email:email}, {$set:reqBody}, {upsert:true})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.ReadProfile = async (req,res)=>{
    try{
        let userID = req.headers.userID;
        let email = req.headers.email;
        let data = await ProfileModel.findOne({userID:userID, cus_email:email})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}

exports.RemoveProfile = async (req,res)=>{
    try{
        let userID = req.headers.userID;
        let email = req.headers.email;
        let data = await ProfileModel.deleteOne({userID:userID, cus_email:email})
        return res.status(200).json({status:"success", data:data})
    }catch (e) {
        return res.status(200).json({status:"fail", data:e.toString()})
    }
}







