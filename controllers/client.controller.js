const Client = require("../models/client.model");

const addClient = async (req, res) => {
  try {
    const { full_name, phone_number, email, address, location } = req.body;
    const existingClient = await Client.findOne({ where: { email } });
    if (existingClient) {
      return res.status(409).json({
        message: "Client already exists",
      });
    }
    const newClient = await Client.create({
      full_name,
      phone_number,
      email,
      address,
      location,
    });
    res.status(201).json({
      message: "New client added",
      client: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while adding client",
    });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting clients",
    });
  }
};

const getOneClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }
    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting client",
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClient = await Client.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).json({ message: "Client updated",updatedClient
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while updating client",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });
    if (deleted) res.status(200).send({ message: "Admin deleted" });
    else res.status(404).send({ error: "Admin not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error while deleting client" });
  }
};

module.exports = {
  addClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
};
