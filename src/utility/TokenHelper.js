const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.EncodeToken = (email,userID)=>{
    let KEY = process.env.JWT_SECRET;
    let Expire = {expiresIn: '7d'}
    let Payload = {email:email, userID:userID}
    return jwt.sign(Payload,KEY,Expire)
}

exports.DecodeToken = (token)=>{
    try{
        let KEY = process.env.JWT_SECRET;
        return jwt.verify(token,KEY)
    }catch (e) {
        return null
    }
}