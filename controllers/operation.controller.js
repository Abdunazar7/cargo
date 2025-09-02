const Operation = require("../models/operation.model");

const addOperation = async (req, res) => {
  try {
    const { operation_date, desc, adminId, orderId } = req.body;

    const newOperation = await Operation.create({
      operation_date,
      desc,
      adminId,
      orderId,
    });

    res.status(201).json({
      message: "New operation added",
      operation: newOperation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while adding operation",
    });
  }
};

const getOperations = async (req, res) => {
  try {
    const operations = await Operation.findAll({
    //   include: [
    //     {
    //       model: Client,
    //       required: false,
    //       attributes: ["full_name", "email"],
    //     },
    //     {
    //       model: CurrencyType,
    //       required: false,
    //       attributes: ["name"],
    //     },
    //   ],
    });
    res.status(200).json(operations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting operations",
    });
  }
};

const getOneOperation = async (req, res) => {
  try {
    const { id } = req.params;

    const operation = await Operation.findByPk(id, {
    //   include: [
    //     {
    //       model: Client,
    //       required: false,
    //       attributes: ["full_name", "email"],
    //     },
    //     {
    //       model: CurrencyType,
    //       required: false,
    //       attributes: ["name"],
    //     },
    //   ],
    });

    if (!operation) {
      return res.status(404).json({
        message: "Operation not found",
      });
    }

    res.status(200).json(operation);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting operation",
    });
  }
};

const updateOperation = async (req, res) => {
  try {
    const { id } = req.params;

    const [count, rows] = await Operation.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!count) {
      return res.status(404).json({ message: "Operation not found" });
    }

    res.status(200).json({
      message: "Operation updated",
      operation: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while updating operation",
    });
  }
};

const deleteOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Operation.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: "Operation deleted" });
    } else {
      return res.status(404).json({ error: "Operation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while deleting operation" });
  }
};

module.exports = {
  addOperation,
  getOperations,
  getOneOperation,
  updateOperation,
  deleteOperation,
};
