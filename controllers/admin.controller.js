const { model } = require("../config/db");
const Admin = require("../models/admin.model");
const Order = require("../models/order.model");

const addAdmin = async (req, res) => {
  try {
    const {
      full_name,
      user_name,
      password,
      phone_number,
      email,
      tg_link,
      token,
      is_creator,
      is_active,
      description,
    } = req.body;
    const candidate = await Admin.findOne({ where: { user_name } });
    if (candidate)
      return res.status(403).send({ message: "Admin already exists" });
    const newAdmin = await Admin.create({
      full_name,
      user_name,
      password,
      phone_number,
      email,
      tg_link,
      token,
      is_creator,
      is_active,
      description,
    });
    res.status(201).send({ message: "New admin added", admin: newAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while adding admin" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      include: [
        {
          model: Order,
          through: {attributes: []}
        }
      ]
    });
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while getting admins" });
  }
};

const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).send({ message: "Admin not found" });
    res.status(200).send(admin);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while getting admin" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ message: "Admin updated", admin });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while updating admin" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Admin.destroy({ where: { id } });
    if (deleted) res.status(200).send({ message: "Admin deleted" });
    else res.status(404).send({ error: "Admin not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while deleting admin" });
  }
};

module.exports = { addAdmin, getAdmins, getOneAdmin, updateAdmin, deleteAdmin };
