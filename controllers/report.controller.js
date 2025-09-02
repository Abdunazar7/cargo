const sequelize = require("../config/db");
const { Op, fn, col } = require("sequelize");
const Client = require("../models/client.model");
const Order = require("../models/order.model");
const Operation = require("../models/operation.model");
const Status = require("../models/status.model");

const getClientsByOrderDate = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
      return res.status(400).send({ message: "start_date and end_date are required" });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    end.setHours(23, 59, 59, 999);

    const clients = await Client.findAll({
      include: [
        {
          model: Order,
          where: {
            createdAt: {
              [Op.between]: [start, end],
            },
          },
          attributes: ["id", "sum", "createdAt", "desc"],
        },
      ],
    });

    res.status(200).send(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error while fetching clients by order date" });
  }
};

const getClientsWithMoreThan10OrdersA = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT c.id, c.full_name, c.phone_number, COUNT(o.id) AS order_count
      FROM client c
      JOIN "order" o ON c.id = o."clientId"
      WHERE c.full_name ILIKE 'A%'
      GROUP BY c.id
      HAVING COUNT(o.id) > 10
    `);

    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error while fetching clients" });
  }
};

const getDeliveredOperationsBetweenDates = async (req, res) => {
  try {
    let { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
      return res.status(400).send({ message: "start_date and end_date required" });
    }

    const operations = await Operation.findAll({
      include: [
        {
          model: Status,
          where: { name: "Delivered" },
        },
      ],
      where: {
        operation_date: {
          [Op.between]: [start_date, end_date],
        },
      },
    });

    res.status(200).send(operations);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error while fetching operations" });
  }
};

const getTop5ClientsByOrders = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT c.id,
             c.full_name,
             SUM(o.quantity) AS total_quantity
      FROM client c
      JOIN "order" o ON c.id = o."clientId"
      GROUP BY c.id
      ORDER BY total_quantity DESC
      LIMIT 5;
    `);

    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error while fetching top 5 clients" });
  }
};

const getClientsWithOrdersInTransit = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT DISTINCT c.full_name, c.phone_number
      FROM client c
      JOIN "order" o ON c.id = o."clientId"
      JOIN operation op ON o.id = op."orderId"
      JOIN status s ON op."statusId" = s.id
      WHERE s.name = 'Delivered';
    `);

    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error while fetching clients with in-transit orders" });
  }
};

module.exports = { getClientsByOrderDate, getClientsWithMoreThan10OrdersA, getDeliveredOperationsBetweenDates, getTop5ClientsByOrders, getClientsWithOrdersInTransit };
