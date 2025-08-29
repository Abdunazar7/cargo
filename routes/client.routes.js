const {
  addClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.post("/", addClient);
router.get("/", getClients);
router.get("/:id", getOneClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
