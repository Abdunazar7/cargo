const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = async (req, res, next ) =>{
    try{
        if(req.params.id != req.admin.id){
            return sendErrorResponse(
                {
                    message: "Faqat shaxsiy ma'lumotlarga kirish mumkin"
                },
                res,
                403,
            )
        }
        next()
    }catch(error){
        console.log(error);
        sendErrorResponse(error, res, 403)
    }
}