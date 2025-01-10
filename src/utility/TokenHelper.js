const jwt = require('jsonwebtoken')

exports.EncodeToken = (email,userID)=>{
    let KEY = "ABC-123-XYZ";
    let Expire = {expiresIn: '24h'}
    let Payload = {email:email, userID:userID}
    return jwt.sign(Payload,KEY,Expire)
}

exports.DecodeToken = (token)=>{
    try{
        let KEY = "ABC-123-XYZ";
        return jwt.verify(token,KEY)
    }catch (e) {
        return null
    }
}