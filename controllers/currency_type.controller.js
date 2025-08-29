const CurrencyType = require("../models/currency_type.model");

const addCurrencyType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const candidate = await CurrencyType.findOne({ where: { name } });
    if (candidate)
      return res.status(403).send({ message: "Currency type already exists" });
    const newCurrencyType = await CurrencyType.create({ name, description });
    res.status(201).send({
      message: "New currency type added",
      currencyType: newCurrencyType,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while adding currency type" });
  }
};

const getCurrencyTypes = async (req, res) => {
  try {
    const types = await CurrencyType.findAll();
    res.status(200).send(types);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while getting currency types" });
  }
};

const getOneCurrencyType = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await CurrencyType.findByPk(id);
    if (!type)
      return res.status(404).send({ message: "Currency type not found" });
    res.status(200).send(type);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while getting currency type" });
  }
};

const updateCurrencyType = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await CurrencyType.update(req.body, {
      where: { id },
      returning: true,
    });
    res
      .status(200)
      .send({ message: "Currency type updated", currencyType: type });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while updating currency type" });
  }
};

const deleteCurrencyType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CurrencyType.destroy({ where: { id } });
    if (deleted) res.status(200).send({ message: "Currency type deleted" });
    else res.status(404).send({ error: "Currency type not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while deleting currency type" });
  }
};

module.exports = {
  addCurrencyType,
  getCurrencyTypes,
  getOneCurrencyType,
  updateCurrencyType,
  deleteCurrencyType,
};
