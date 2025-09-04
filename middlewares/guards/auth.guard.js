const { sendErrorResponse } = require("../../helpers/send.response.errors");
const jwtService = require("../../services/jwt.service");

module.exports = async(req, res, next)=>{
    try{

        //GUARD logic
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return sendErrorResponse({message: "Auth header not found"}, res, 401)
        }
        const token = authHeader.split(" ")[1];
        const bearer = authHeader.split(" ")[0];
        if(bearer !== "Bearer" || !token){
            return sendErrorResponse({message: "Token not found"});
        }
        // decoded token
        const verifiedAccessToken = await jwtService.verifyAccessToken(token);
        req.admin = verifiedAccessToken; // self guardda foydalanish uchun

        next()
    }catch(error){
        sendErrorResponse(error, res, 403)
    }
}