const { sendErrorResponse } = require("../helpers/send.response.errors");
const Admin = require("../models/admin.model");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return sendErrorResponse({ message: "Email yoki password noto'g'ri" }, res, 401);
    }
    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword) {
      return sendErrorResponse({ message: "Email yoki password noto'g'ri" }, res, 401);
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashedRefreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.send({ message: "Admin logged in", accessToken: tokens.accessToken });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse({ message: "Cookie refresh token topilmadi" }, res, 400);
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);
    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    if (!admin) {
      return sendErrorResponse({ message: "Admin not found" }, res, 404);
    }
    admin.refresh_token = null;
    await admin.save();
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout muvaffaqiyatli yakunlandi" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse({ message: "Cookie refresh token topilmadi" }, res, 400);
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);
    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    if (!admin || !admin.refresh_token) {
      return sendErrorResponse({ message: "Admin topilmadi yoki refresh token yo'q" }, res, 401);
    }
    const isValid = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!isValid) {
      return sendErrorResponse({ message: "Refresh token yaroqsiz" }, res, 401);
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashedRefreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.status(200).json({
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
