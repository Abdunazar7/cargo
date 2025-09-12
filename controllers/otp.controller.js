const { sendErrorResponse } = require("../helpers/send.response.errors");
const otpGenerator = require("otp-generator");
const Otp = require("../models/otp.model");
const { encode, decode } = require("../helpers/crypt");
const { addMinutesToDate } = require("../helpers/add_minutes");
const Client = require("../models/client.model");

const newOtp = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = addMinutesToDate(now, 3);
    const newOtpRow = await Otp.create({ otp, expiration_time });

    // SMS, Bot, email

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpRow.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    res.send({
      message: "Otp sended",
      verfication_key: encodedData,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { verfication_key, otp, phone_number } = req.body;
    const currentTime = new Date();
    const decodedData = await decode(verfication_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      return sendErrorResponse(
        { message: "OTP was not sent to this phone number" },
        res,
        400
      );
    }
    const otpRow = await Otp.findByPk(details.otp_id);
    if (!otpRow) {
      return sendErrorResponse({ message: "OTP not found" }, res, 400);
    }

    if (otpRow.verified) {
      return sendErrorResponse({ message: "OTP already verified" }, res, 400);
    }

    if (otpRow.expiration_time > currentTime) {
      return sendErrorResponse({ message: "OTP expired" }, res, 400);
    }

    if (otpRow.otp != otp) {
      return sendErrorResponse({ message: "Invalid OTP" }, res, 400);
    }

    otpRow.otp.verified = true;
    await otpRow.save();
    const clientRow = await Client.findOne({ where: { phone_number } });
    let clientId, isNewClient;
    if (clientRow) {
      clientId = clientRow.id;
      isNewClient = false;
    } else {
      const newClient = await Client.create({ phone_number });
      clientId = newClient.id;
      isNewClient = true;
    }
    res.send({
      message: "Success",
      clientId,
      isNewClient,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = { newOtp, verifyOtp };
