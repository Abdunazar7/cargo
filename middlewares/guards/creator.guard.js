const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = async (req, res, next) => {
  try {
    if (!req.admin) {
      return sendErrorResponse(
        { message: "Auth required" },
        res,
        401
      );
    }

    if (!req.admin.is_creator) {
      return sendErrorResponse(
        { message: "Faqat creator adminlar uchun ruxsat berilgan" },
        res,
        403
      );
    }

    next();
  } catch (error) {
    console.log(error);
    sendErrorResponse(error, res, 403);
  }
};
