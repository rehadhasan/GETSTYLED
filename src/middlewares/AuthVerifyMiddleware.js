const {DecodeToken} = require("../utility/TokenHelper");

module.exports = (req,res,next)=>{
    let token = req.cookies['token']
    if(!token){
        token = req.headers['token']
    }

    let decoded = DecodeToken(token)

    if(decoded === null){
        return res.status(401).json({status:"fail", data: "Unauthorized"})
    }else{
        let email = decoded['email'];
        let userID = decoded['userID'];
        req.headers.email = email;
        req.headers.userID = userID;
        next()
    }
}