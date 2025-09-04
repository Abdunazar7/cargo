const { sendErrorResponse } = require("../../helpers/send.response.errors");
const jwtService = require("../../services/jwt.service");

module.exports = (requiredRoles= [])=>{
    return async (req, res , next)=>{
    try{
        req.admin.role
        next()
    }catch(error){
        sendErrorResponse(error, res , 403)
    }
    }
}