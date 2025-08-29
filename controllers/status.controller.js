const Status = require("../models/status.model");

const addStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    const candidate = await Status.findOne({ where: { name } });
    if (candidate)
      return res.status(403).send({ message: "Status already exists" });
    const newStatus = await Status.create({ name, description });
    res.status(201).send({ message: "New status added", status: newStatus });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while adding status" });
  }
};

const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).send(statuses);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while getting statuses" });
  }
};

const getOneStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) return res.status(404).send({ message: "Status not found" });
    res.status(200).send(status);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while getting status" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).send({ message: "Status updated", status });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while updating status" });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Status.destroy({ where: { id } });
    if (deleted) res.status(200).send({ message: "Status deleted" });
    else res.status(404).send({ error: "Status not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while deleting status" });
  }
};

module.exports = {
  addStatus,
  getStatuses,
  getOneStatus,
  updateStatus,
  deleteStatus,
};
