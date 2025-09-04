const Admin = require("../models/admin.model");
const Order = require("../models/order.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Bunday admin mavjud" }, res, 400);
    }
    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Parol mos emas" }, res, 400);
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newAdmin = await Admin.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New admin added", data: newAdmin });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      include: [{ model: Order, through: { attributes: [] } }],
    });
    res.status(200).send(admins);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.status(200).send(admin);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedAdmin]] = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.status(200).send({ message: "Admin updated", data: updatedAdmin });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Admin.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.status(200).send({ message: "Admin deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
};
