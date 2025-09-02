const { model } = require("../config/db");
const Admin = require("../models/admin.model");
const Client = require("../models/client.model");
const CurrencyType = require("../models/currency_type.model");
const Operation = require("../models/operation.model");
const Order = require("../models/order.model");

const addOrder = async (req, res) => {
  try {
    const { product_link, quantity, sum, truck, desc, clientId, currencyTypeId } = req.body;

    const newOrder = await Order.create({
      product_link,
      quantity,
      sum,
      truck,
      desc,
      clientId,
      currencyTypeId
    });

    res.status(201).json({
      message: "New order added",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while adding order",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
        include: [
          {
            model: Admin,
            through: {attributes: []}
          }
        ]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting orders",
    });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id,
        {
        include: [
            {
                model: Client,
                required: false,
                attributes: ["full_name", "email"],
            },
            {
                model: CurrencyType,
                required: false,
                attributes: ["name"],
            }
        ]
    }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting order",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [count, rows] = await Order.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!count) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated",
      order: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while updating order",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: "Order deleted" });
    } else {
      return res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while deleting order" });
  }
};

module.exports = {
  addOrder,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
};

